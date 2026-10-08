/**
 * Production-compatible rate limiter for the contact form API.
 * 
 * Supports:
 * 1. Distributed rate limiting via Upstash Redis REST API when UPSTASH_REDIS_REST_URL and
 *    UPSTASH_REDIS_REST_TOKEN are set (ideal for serverless deployments on Vercel/AWS).
 * 2. High-performance in-memory sliding window with automatic garbage collection for standard Node.js
 *    environments or when Redis credentials are not configured.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

// Clean up expired records every 5 minutes to prevent memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    const tenMinutesAgo = now - 10 * 60 * 1000;
    for (const [key, record] of memoryStore.entries()) {
      const validTimestamps = record.timestamps.filter((ts) => ts > tenMinutesAgo);
      if (validTimestamps.length === 0) {
        memoryStore.delete(key);
      } else {
        memoryStore.set(key, { timestamps: validTimestamps });
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Extracts the best client IP identifier from request headers.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  return "anonymous-client";
}

/**
 * Check if the client request is within rate limits.
 * Default: 5 requests per 10-minute window (600 seconds) per IP.
 */
export async function checkRateLimit(
  clientIp: string,
  limit = 5,
  windowSeconds = 600
): Promise<RateLimitResult> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. Production Distributed Rate Limiter (Upstash Redis REST)
  if (upstashUrl && upstashToken) {
    try {
      const key = `contact_ratelimit:${clientIp}`;
      // Use multi/pipeline command to increment and set expire
      const response = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["TTL", key],
        ]),
      });

      if (response.ok) {
        const results = await response.json();
        const count = results[0]?.result as number;
        let ttl = results[1]?.result as number;

        if (count === 1 || ttl === -1) {
          // Set TTL on the first request
          await fetch(`${upstashUrl}/expire/${key}/${windowSeconds}`, {
            headers: { Authorization: `Bearer ${upstashToken}` },
          });
          ttl = windowSeconds;
        }

        const allowed = count <= limit;
        return {
          allowed,
          limit,
          remaining: Math.max(0, limit - count),
          resetSeconds: ttl > 0 ? ttl : windowSeconds,
        };
      }
    } catch {
      // Fall through to memory store if Redis request fails
    }
  }

  // 2. High-performance In-Memory Sliding Window Rate Limiter
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const record = memoryStore.get(clientIp) || { timestamps: [] };

  // Filter timestamps within current window
  const activeTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= limit) {
    const oldestTimestamp = activeTimestamps[0];
    const resetSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }

  activeTimestamps.push(now);
  memoryStore.set(clientIp, { timestamps: activeTimestamps });

  return {
    allowed: true,
    limit,
    remaining: limit - activeTimestamps.length,
    resetSeconds: windowSeconds,
  };
}
