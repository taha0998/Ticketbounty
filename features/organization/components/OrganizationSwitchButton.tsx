"use client";
import { useActionState } from "react";
import { Form } from "@/components/form/Form";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/toActinoState";
import { switchOrganization } from "../actions/switch-organization";

type OrganizationSwitchButtonProps = {
  organizationId: string;
  trigger: React.ReactNode;
};

const OrganizationSwitchButton = ({
  organizationId,
  trigger,
}: OrganizationSwitchButtonProps) => {
  const [actionState, action] = useActionState(
    switchOrganization.bind(null, organizationId),
    EMPTY_ACTION_STATE,
  );

  return (
    <Form action={action} actionState={actionState}>
      {trigger}
    </Form>
  );
};
export { OrganizationSwitchButton };
