"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { Input } from "@/components/ui/input";
import { passwordChange } from "../actions/password-change";

const PasswordChangeForm = () => {
  const [actionState, action] = useActionState(
    passwordChange,
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Input
        name="password"
        placeholder="Password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError name="password" actionState={actionState} />

      <SubmitButton label="Send Email" />
    </Form>
  );
};

export { PasswordChangeForm };
