import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const ClientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female"]),
  primaryManicurist: z.string().min(2, "Select your manicurist"),
  comment: z.string().optional(),
});

export const AppointmentFormValidation = z.object({
  primaryManicurist: z.string().min(2, "Select your manicurist"),
  schedule: z.coerce.date(),
  note: z.string().optional(),
  cancelReason: z.string().optional(),
});

export const CreateAppointmentSchema = z.object({
  primaryManicurist: z.string().min(2, "Select your manicurist"),
  schedule: z.coerce.date(),
  note: z.string().optional(),
  cancelReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryManicurist: z.string().min(2, "Select your manicurist"),
  schedule: z.coerce.date(),
  note: z.string().optional(),
  cancelReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryManicurist: z.string().min(2, "Select at least one doctor"),
  schedule: z.coerce.date(),
  note: z.string().optional(),
  cancelReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}