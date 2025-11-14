import { z } from "zod";

export const joinMissionSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(50, "Name is longer than expected"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  customRole: z.string().optional(),
  background: z.string().min(1, "Background is required"),
  motivation: z.string().min(1, "Motivation is required"),
  portfolio: z.string().optional(),
  resume: z
    .custom<File | null>()
    .refine((file) => file instanceof File, "Resume is required")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => ["application/pdf", "application/msword"].includes(file.type),
      "Only PDF and DOC files are allowed"
    ),
});

export type JoinMissionInput = z.infer<typeof joinMissionSchema>;
