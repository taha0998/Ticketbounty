import EmailVerification from "@/emails/auth/email-verification";
import { resend } from "@/lib/resend";

export const sendEmailVerification = async (
  username: string,
  email: string,
  verificationCode: string,
) => {
  return await resend.emails.send({
    from: "TicketBounty@resend.dev",
    to: "taha2020tahataha@gmail.com", //testEmail,need domain validation to use email
    subject: "Verification Code",
    react: (
      <EmailVerification
        toName={username}
        verificationCode={verificationCode}
      />
    ),
  });
};
