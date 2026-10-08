/**
 * Utility functions for sanitizing and validating contact form inputs.
 */

/**
 * Escapes characters that have special meaning in HTML to prevent XSS in HTML email templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Strips carriage returns and newlines from strings used in email headers
 * to prevent SMTP header injection attacks (CRLF injection).
 */
export function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

/**
 * Basic RFC 5322 compliant email validator regex.
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  // Also guard against CRLF in email string
  if (/[\r\n]/.test(trimmed)) return false;
  return EMAIL_REGEX.test(trimmed);
}
