import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/company";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export type NotificationPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendNotificationEmail(
  payload: NotificationPayload
): Promise<{ sent: boolean; error?: string }> {
  const transport = getTransport();
  const to = process.env.CONTACT_NOTIFICATION_TO || COMPANY.email;
  const from = process.env.SMTP_FROM || `FaizZab Website <${COMPANY.email}>`;

  if (!transport) {
    return { sent: false, error: "SMTP is not configured" };
  }

  try {
    await transport.sendMail({
      from,
      to,
      subject: payload.subject,
      text: payload.text,
      replyTo: payload.replyTo,
    });
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email send failed";
    return { sent: false, error: message };
  }
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<{ sent: boolean; error?: string }> {
  const transport = getTransport();
  const from = process.env.SMTP_FROM || `FaizZab Website <${COMPANY.email}>`;

  if (!transport) {
    return { sent: false, error: "SMTP is not configured" };
  }

  try {
    await transport.sendMail({
      from,
      to,
      subject: "FaizZab Admin password reset",
      text: [
        "A password reset was requested for your FaizZab Admin account.",
        "",
        `Reset link (valid for a limited time): ${resetUrl}`,
        "",
        "If you did not request this, you can ignore this email.",
        "",
        COMPANY.legalName,
      ].join("\n"),
    });
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email send failed";
    return { sent: false, error: message };
  }
}
