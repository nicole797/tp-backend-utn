import transporter from "../config/emailConfig";
import createTemplate from "../templates/emailTemplate";

export const sendEmail = async (subject: string, emailUser: string, message: string) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Servicio de email no configurado");
  }

  const info = await transporter.sendMail({
    from: `"Tienda UTN" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // a quién notificás
    subject,
    html: createTemplate(emailUser, message),
  });

  return info;
};
