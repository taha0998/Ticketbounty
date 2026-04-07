import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import CardCompact from "@/components/CardCompact";
import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";
import { getAuth } from "@/features/auth/actions/get-auth";
import { TicketList } from "@/features/ticket/components/TicketList";
import { TicketUpsertForm } from "@/features/ticket/components/TicketUpsertForm";
import { searchParamsCache } from "@/features/ticket/SearchParams";

type TicketsProps = {
  searchParams: Promise<SearchParams>;
};

const TicketsPage = async ({ searchParams }: TicketsProps) => {
  const { user } = await getAuth();
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My tickets" description="All my tickets at one place" />
      <CardCompact
        className="w-full max-w-105 self-center"
        title="Create Ticket"
        description="A new ticket will be created"
        content={<TicketUpsertForm />}
      />
      <Suspense fallback={<Spinner />}>
        <TicketList
          userId={user?.id}
          searchParams={searchParamsCache.parse(searchParams)}
        />
      </Suspense>
    </div>
  );
};
export default TicketsPage;
