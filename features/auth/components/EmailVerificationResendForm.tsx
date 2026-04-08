"use client";
import { useActionState } from "react";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { emailVerificationResend } from "../actions/email-verification-resend";

const EmailVerificationResendForm = () => {
  const [actionState, action] = useActionState(
    emailVerificationResend,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton label="Resend Code" variant="ghost" />
    </Form>
  );
};

export { EmailVerificationResendForm };
