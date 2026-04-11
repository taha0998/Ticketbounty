import { format } from "date-fns";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucidePen,
  LucideTrash,
} from "lucide-react";
import { SubmitButton } from "@/components/form/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";
import { OrganizationSwitchButton } from "./OrganizationSwitchButton";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some(
    (organization) => organization.membershipByUser.isActive,
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead>Members</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => {
            const isActive = org.membershipByUser.isActive;

            const switchButton = (
              <OrganizationSwitchButton
                organizationId={org.id}
                trigger={
                  <SubmitButton
                    icon={<LucideArrowLeftRight />}
                    label={
                      !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                    }
                    variant={
                      !hasActive
                        ? "secondary"
                        : isActive
                          ? "default"
                          : "outline"
                    }
                  />
                }
              />
            );

            const detailButton = (
              <Button variant={"outline"} size={"icon"}>
                <LucideArrowUpRightFromSquare className="w-4 h-4" />
              </Button>
            );

            const editButton = (
              <Button variant={"outline"} size={"icon"}>
                <LucidePen className="w-4 h-4" />
              </Button>
            );

            const deleteButton = (
              <Button variant={"destructive"} size={"icon"}>
                <LucideTrash className="w-4 h-4" />
              </Button>
            );

            const buttons = (
              <>
                {switchButton}
                {detailButton}
                {editButton}
                {deleteButton}
              </>
            );

            return (
              <TableRow key={org.id}>
                <TableCell>{org.id}</TableCell>
                <TableCell>{org.name}</TableCell>
                <TableCell>
                  {format(org.membershipByUser.joinedAt, "yyyy-MM-dd, HH:mm")}
                </TableCell>
                <TableCell>{org._count.membership}</TableCell>
                <TableCell className="flex justify-end gap-x-2">
                  {buttons}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export { OrganizationList };
