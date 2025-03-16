import * as z from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir'),
  email: z.string()
    .email('Geçerli bir email adresi giriniz')
    .min(5, 'Email adresi çok kısa')
    .max(100, 'Email adresi çok uzun'),
  message: z.string()
    .min(10, 'Mesaj en az 10 karakter olmalıdır')
    .max(1000, 'Mesaj en fazla 1000 karakter olabilir')
});

export type ContactFormData = z.infer<typeof contactSchema>;
