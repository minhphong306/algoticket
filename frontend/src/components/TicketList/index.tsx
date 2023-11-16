import { Ticket } from "@/types";
import TicketComponent from "../Ticket";

export default function TicketListComponent({
  ticketsList,
  isCurrentProfile,
  isCheckin,
}: {
  isCurrentProfile?: boolean;
  isCheckin?: boolean;
  ticketsList: Ticket[];
}) {
  return (
    <div className="row mg-t-40">
      {ticketsList.map((ticket, index) => {
        return (
          <TicketComponent
            isCurrentProfile={isCurrentProfile}
            key={index}
            ticket={ticket}
            isCheckin={isCheckin}
          ></TicketComponent>
        );
      })}
    </div>
  );
}
