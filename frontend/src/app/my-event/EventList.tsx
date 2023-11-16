import { Event } from "@/types";
import EventComponent from "./EventItem";

export default function TicketListComponent({
    eventList,
}: {
  eventList: Event[];
}) {
  return (
    <div className="row mg-t-40">
      {eventList.map((event, index) => {
        return (
          <EventComponent
            key={index}
            event={event}
          ></EventComponent>
        );
      })}
    </div>
  );
}
