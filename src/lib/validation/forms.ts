import { z } from "zod";

const honeypot = z.string().max(0).optional().or(z.literal(""));

export const privacySchema = z.literal(true, {
  errorMap: () => ({ message: "You must acknowledge the privacy notice." }),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  telephone: z.string().trim().max(50).optional().or(z.literal("")),
  subject: z.string().trim().min(2).max(300),
  message: z.string().trim().min(10).max(5000),
  privacyAccepted: privacySchema,
  website: honeypot, // honeypot
});

export const consultationFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  telephone: z.string().trim().max(50).optional().or(z.literal("")),
  serviceInterest: z.string().trim().min(2).max(300),
  message: z.string().trim().min(10).max(5000),
  privacyAccepted: privacySchema,
  website: honeypot,
});

export const readinessFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(2).max(200),
  jobTitle: z.string().trim().min(2).max(200),
  telephone: z.string().trim().max(50).optional().or(z.literal("")),
  country: z.string().trim().min(2).max(100),
  industry: z.string().trim().min(2).max(150),
  organizationSize: z.string().trim().min(1).max(100),
  currentStatus: z.string().trim().min(2).max(200),
  reason: z.string().trim().min(10).max(5000),
  targetTimeframe: z.string().trim().min(1).max(100),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  privacyAccepted: privacySchema,
  website: honeypot,
});

export const academyFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  jobTitle: z.string().trim().max(200).optional().or(z.literal("")),
  courseInterest: z.string().trim().min(2).max(300),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  privacyAccepted: privacySchema,
  website: honeypot,
});

export const toolkitFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  privacyAccepted: privacySchema,
  website: honeypot,
});

export const grcPlatformFormSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(2).max(200),
  jobTitle: z.string().trim().max(200).optional().or(z.literal("")),
  organizationSize: z.string().trim().max(100).optional().or(z.literal("")),
  areasOfInterest: z.string().trim().min(2).max(2000),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  privacyAccepted: privacySchema,
  website: honeypot,
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(200),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1).max(200),
    newPassword: z.string().min(12).max(200),
    confirmPassword: z.string().min(12).max(200),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().max(255),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(20).max(200),
    newPassword: z.string().min(12).max(200),
    confirmPassword: z.string().min(12).max(200),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
