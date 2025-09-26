import EventDetails from "@/components/mainComponents/event/EventDetails";
import { getSingleEventAPI } from "@/service/projectService/event.service";

const page = async ({ params }) => {
  const { eventId } = await params;
  const event = await getSingleEventAPI(eventId);
  return <EventDetails event={event} />;
};

export default page;
