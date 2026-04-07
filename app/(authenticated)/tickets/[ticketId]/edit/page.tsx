import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import CardCompact from "@/components/CardCompact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/isOwner";
import { TicketUpsertForm } from "@/features/ticket/components/TicketUpsertForm";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath, ticketPath } from "@/lib/paths";

type TicketUpdateProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketUpdatePage = async ({ params }: TicketUpdateProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);
  const { user } = await getAuth();

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "tickets", href: homePath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "edit" },
        ]}
      />
      <Separator />
      <div className="flex flex-1 flex-col justify-center items-center">
        <CardCompact
          className="w-full max-w-105  animate-fade-in-top"
          title="Edit Ticket"
          description="Edit an existing ticket"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};
export default TicketUpdatePage;
