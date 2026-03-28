import EmailPasswordRest from "@/emails/password/email-password-reset";
import { resend } from "@/lib/resend";

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordRestLink: string,
) => {
  return await resend.emails.send({
    from: "TicketBounty@resend.dev",
    to: email,
    subject: "Password Rest from TicketBounty",
    react: <EmailPasswordRest toName={username} url={passwordRestLink} />,
  });
};
