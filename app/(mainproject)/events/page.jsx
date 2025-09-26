import FilteredEvents from "@/components/mainComponents/events/FilteredEvents";

const page = () => {
  return (
    <div>
      <h1>All Events</h1>
      <div className="my-2">
        <FilteredEvents />
      </div>
    </div>
  );
};

export default page;
