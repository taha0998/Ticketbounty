import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";

const OrganizationList = async () => {
  const organizations = await getOrganizationsByUser();

  return (
    <div>
      <Table>
        <TableHeader></TableHeader>
      </Table>
      {organizations.map((org) => (
        <div key={org.id}>
          <div>Name: {org.name}</div>
          <div>
            Joined At:{" "}
            {format(org.membershipByUser.joinedAt, "yyyy-MM-dd, HH:mm")}
          </div>
          <div>Members: {org._count.membership}</div>
        </div>
      ))}
    </div>
  );
};
export { OrganizationList };
