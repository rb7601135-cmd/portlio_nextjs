import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml, sanitizeHeader, isValidEmail } from "@/lib/emailSanitizer";
import { getClientIp, checkRateLimit } from "@/lib/rateLimit";

/**
 * Validates if SMTP credentials are fully provided and not default template placeholders.
 */
function isSmtpConfigured(): boolean {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) return false;
  if (
    user === "your-email@gmail.com" ||
    user === "example@gmail.com" ||
    pass === "your-16-character-google-app-password" ||
    pass.length < 8
  ) {
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  try {
    // 1. Rate Limiting Check (Production-ready sliding window / distributed KV)
    const rateLimit = await checkRateLimit(clientIp, 5, 600); // 5 requests per 10 minutes per IP
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many messages sent. Please wait a few minutes before trying again or reach out directly via email.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
          },
        }
      );
    }

    // 2. Parse request JSON body safely
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot, botField } = body;

    // 3. Spam Honeypot Protection: Bots that fill hidden honeypot fields get silently dropped
    if (honeypot || botField) {
      console.warn(`[Contact Form API] Bot submission prevented from IP: ${clientIp}`);
      // Return 200 so bots assume submission succeeded without attempting alternative vectors
      return NextResponse.json(
        {
          success: true,
          message: "Thank you! Your message has been sent successfully.",
        },
        { status: 200 }
      );
    }

    // 4. Server-Side Input Validation and Sanitization
    // Full Name
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please provide your name (at least 2 characters)." },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must not exceed 100 characters." },
        { status: 400 }
      );
    }
    const cleanName = sanitizeHeader(name);

    // Email Address
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address (e.g., name@example.com)." },
        { status: 400 }
      );
    }
    const cleanEmail = sanitizeHeader(email);

    // Subject (Optional)
    let cleanSubject = "New Portfolio Inquiry";
    if (subject && typeof subject === "string" && subject.trim().length > 0) {
      if (subject.trim().length > 150) {
        return NextResponse.json(
          { error: "Subject must not exceed 150 characters." },
          { status: 400 }
        );
      }
      cleanSubject = sanitizeHeader(subject);
    } else {
      cleanSubject = `Inquiry from ${cleanName}`;
    }

    // Message (Required)
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please include a message (at least 5 characters)." },
        { status: 400 }
      );
    }
    if (message.trim().length > 5000) {
      return NextResponse.json(
        { error: "Message must not exceed 5,000 characters." },
        { status: 400 }
      );
    }
    const cleanMessage = message.trim();

    // 5. Verify SMTP Configuration
    if (!isSmtpConfigured()) {
      console.warn(
        "[Contact Form API] Gmail SMTP credentials (SMTP_USER, SMTP_PASS) are not configured or set to placeholder values in .env.local."
      );
      return NextResponse.json(
        {
          error:
            "The email delivery service is currently being configured. Please reach out directly to the email address shown on the portfolio.",
        },
        { status: 503 }
      );
    }

    const smtpUser = process.env.SMTP_USER!.trim();
    const smtpPass = process.env.SMTP_PASS!.trim();
    const contactEmail = process.env.CONTACT_EMAIL?.trim() || smtpUser;

    // 6. Configure Nodemailer with Gmail SMTP (Port 587 with TLS)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Port 587 uses STARTTLS
      requireTLS: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // 7. Compose Email Bodies
    const submissionDate = new Date().toUTCString();
    const escapedName = escapeHtml(cleanName);
    const escapedEmail = escapeHtml(cleanEmail);
    const escapedSubject = escapeHtml(cleanSubject);
    const escapedMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

    // Plain text alternative
    const textContent = `
NEW PORTFOLIO CONTACT FORM SUBMISSION
============================================================
From:        ${cleanName} <${cleanEmail}>
Subject:     ${cleanSubject}
Date:        ${submissionDate}
Client IP:   ${clientIp}

MESSAGE:
------------------------------------------------------------
${cleanMessage}
============================================================
Reply directly to this email to respond to ${cleanName} (${cleanEmail}).
`.trim();

    // Branded responsive HTML email matching portfolio aesthetic
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:24px;background-color:#070709;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f5f5f0;line-height:1.6;">
  <div style="max-width:620px;margin:0 auto;background-color:#0c0e12;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);">
    
    <!-- Header Banner -->
    <div style="background-color:#11141a;padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between;">
      <div>
        <span style="display:inline-block;font-size:11px;font-family:monospace;letter-spacing:1.5px;text-transform:uppercase;color:#ccff00;margin-bottom:4px;">
          // INCOMING PORTFOLIO INQUIRY
        </span>
        <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;text-transform:uppercase;letter-spacing:0.5px;">
          ${escapedSubject}
        </h1>
      </div>
    </div>

    <!-- Sender Metadata -->
    <div style="padding:24px 28px;background-color:#0e1117;border-bottom:1px solid rgba(255,255,255,0.06);">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:6px 0;color:#8a8f98;width:110px;font-family:monospace;font-size:12px;text-transform:uppercase;">From</td>
          <td style="padding:6px 0;color:#ffffff;font-weight:600;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#8a8f98;font-family:monospace;font-size:12px;text-transform:uppercase;">Email</td>
          <td style="padding:6px 0;">
            <a href="mailto:${escapedEmail}" style="color:#ccff00;text-decoration:none;font-weight:500;">
              ${escapedEmail}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#8a8f98;font-family:monospace;font-size:12px;text-transform:uppercase;">Subject</td>
          <td style="padding:6px 0;color:#d1d5db;">${escapedSubject}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#8a8f98;font-family:monospace;font-size:12px;text-transform:uppercase;">Received</td>
          <td style="padding:6px 0;color:#9ca3af;font-size:12px;font-family:monospace;">${submissionDate}</td>
        </tr>
      </table>
    </div>

    <!-- Message Body -->
    <div style="padding:28px;">
      <div style="font-size:11px;font-family:monospace;text-transform:uppercase;color:#8a8f98;letter-spacing:1px;margin-bottom:12px;">
        MESSAGE CONTENT
      </div>
      <div style="background-color:#070709;border:1px solid rgba(255,255,255,0.08);border-left:3px solid #ccff00;border-radius:10px;padding:20px;color:#e5e7eb;font-size:15px;line-height:1.7;white-space:pre-wrap;word-break:break-word;">
${escapedMessage}
      </div>

      <!-- Quick Reply Prompt -->
      <div style="margin-top:24px;padding:16px;background-color:rgba(204,255,0,0.06);border:1px solid rgba(204,255,0,0.2);border-radius:10px;text-align:center;">
        <span style="font-size:13px;color:#ccff00;font-weight:500;">
          💡 Click "Reply" in your email client to respond directly to <strong>${escapedName}</strong> (${escapedEmail}).
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 28px;background-color:#070709;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#6b7280;display:flex;justify-content:space-between;align-items:center;">
      <span>Sent via Portfolio Contact Engine</span>
      <span>Port: 587 (TLS)</span>
    </div>
  </div>
</body>
</html>
`.trim();

    // 8. Dispatch Email via Nodemailer
    await transporter.sendMail({
      from: `"${cleanName} (Portfolio)" <${smtpUser}>`,
      to: contactEmail,
      replyTo: cleanEmail,
      subject: `Portfolio Contact: ${cleanSubject}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully. I will get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Avoid logging passwords or private message contents
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Contact Form API] Delivery failure from ${clientIp}:`, errorMessage);

    // Never leak SMTP credentials or raw internal stack traces to the visitor
    return NextResponse.json(
      {
        error:
          "Unable to send message due to a server error. Please try again later or contact me directly via email.",
      },
      { status: 500 }
    );
  }
}
