"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/FieldError";
import { Form } from "@/components/form/Form";
import { SubmitButton } from "@/components/form/SubmitButton";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { Input } from "@/components/ui/input";
import { passwordRest } from "../actions/password-rest";

type PasswordRestFormProps = {
  tokenId: string;
};

const PasswordRestForm = ({ tokenId }: PasswordRestFormProps) => {
  const [actionState, action] = useActionState(
    passwordRest.bind(null, tokenId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form actionState={actionState} action={action}>
      <Input
        name="password"
        placeholder="password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError name="password" actionState={actionState} />

      <Input
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError name="confirmPassword" actionState={actionState} />

      <SubmitButton label="Rest Password" />
    </Form>
  );
};
export { PasswordRestForm };
