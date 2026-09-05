import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("يرجى إدخال بريد إلكتروني صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "الاسم مطلوب"),
    lastName: z.string().min(1, "اللقب مطلوب"),
    email: z.string().min(1, "البريد الإلكتروني مطلوب").email("يرجى إدخال بريد إلكتروني صالح"),
    password: z.string().min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل"),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
    acceptTerms: z.literal(true, {
      message: "يجب الموافقة على شروط الاستخدام وسياسة الخصوصية",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .length(5, "يجب إدخال الرمز المكون من 5 أرقام")
    .regex(/^\d+$/, "الرمز يجب أن يتكون من أرقام فقط"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
