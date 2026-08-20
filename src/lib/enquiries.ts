import type { LeadType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { sendNotificationEmail } from "@/lib/email/mailer";
import { COMPANY } from "@/lib/company";

export type EnquiryInput = {
  leadType: LeadType;
  name: string;
  email: string;
  company?: string;
  jobTitle?: string;
  telephone?: string;
  country?: string;
  industry?: string;
  organizationSize?: string;
  subject?: string;
  message?: string;
  courseInterest?: string;
  areasOfInterest?: string;
  currentStatus?: string;
  reason?: string;
  targetTimeframe?: string;
  privacyAccepted: boolean;
  honeypotHit?: boolean;
  ipAddress?: string;
  userAgent?: string;
};

function emptyToNull(v?: string): string | null {
  if (!v || !v.trim()) return null;
  return v.trim();
}

export async function createEnquiry(input: EnquiryInput) {
  const data: Prisma.EnquiryCreateInput = {
    leadType: input.leadType,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    company: emptyToNull(input.company),
    jobTitle: emptyToNull(input.jobTitle),
    telephone: emptyToNull(input.telephone),
    country: emptyToNull(input.country),
    industry: emptyToNull(input.industry),
    organizationSize: emptyToNull(input.organizationSize),
    subject: emptyToNull(input.subject),
    message: emptyToNull(input.message),
    courseInterest: emptyToNull(input.courseInterest),
    areasOfInterest: emptyToNull(input.areasOfInterest),
    currentStatus: emptyToNull(input.currentStatus),
    reason: emptyToNull(input.reason),
    targetTimeframe: emptyToNull(input.targetTimeframe),
    privacyAccepted: input.privacyAccepted,
    honeypotHit: Boolean(input.honeypotHit),
    ipAddress: input.ipAddress?.slice(0, 64),
    userAgent: input.userAgent?.slice(0, 512),
  };

  const enquiry = await prisma.enquiry.create({ data });

  const lines = [
    `New ${input.leadType} enquiry received via ${COMPANY.domain}`,
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    enquiry.company ? `Company: ${enquiry.company}` : null,
    enquiry.jobTitle ? `Job title: ${enquiry.jobTitle}` : null,
    enquiry.telephone ? `Telephone: ${enquiry.telephone}` : null,
    enquiry.country ? `Country: ${enquiry.country}` : null,
    enquiry.industry ? `Industry: ${enquiry.industry}` : null,
    enquiry.organizationSize ? `Organization size: ${enquiry.organizationSize}` : null,
    enquiry.subject ? `Subject: ${enquiry.subject}` : null,
    enquiry.courseInterest ? `Course interest: ${enquiry.courseInterest}` : null,
    enquiry.areasOfInterest ? `Areas of interest: ${enquiry.areasOfInterest}` : null,
    enquiry.currentStatus ? `Current ISO/GRC status: ${enquiry.currentStatus}` : null,
    enquiry.reason ? `Reason: ${enquiry.reason}` : null,
    enquiry.targetTimeframe ? `Target timeframe: ${enquiry.targetTimeframe}` : null,
    enquiry.message ? `Message: ${enquiry.message}` : null,
    "",
    `Enquiry ID: ${enquiry.id}`,
    `Legal entity: ${COMPANY.legalName}`,
  ].filter(Boolean) as string[];

  const mail = await sendNotificationEmail({
    subject: `[FaizZab] ${input.leadType} enquiry from ${enquiry.name}`,
    text: lines.join("\n"),
    replyTo: enquiry.email,
  });

  if (mail.sent) {
    await prisma.enquiry.update({
      where: { id: enquiry.id },
      data: { emailNotified: true },
    });
  }

  return { enquiry, emailNotified: mail.sent, emailError: mail.error };
}
