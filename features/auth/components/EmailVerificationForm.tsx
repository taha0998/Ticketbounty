"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { Input } from "@/components/ui/input";
import { emailVerification } from "../actions/email-verification";

const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(
    emailVerification,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="code"
        placeholder="Code"
        defaultValue={actionState.payload?.get("code") as string}
      />
      <FieldError actionState={actionState} name="code" />
      <SubmitButton label="Verify Email" />
    </Form>
  );
};

export { EmailVerificationForm };
