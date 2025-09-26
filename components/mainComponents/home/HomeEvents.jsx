"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import SingleEvent from "./SingleEvent";

const HomeEvents = ({ events, allEvents }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4">
        {events.map((event) => (
          <SingleEvent key={event.id} event={event} />
        ))}
      </div>

      {!allEvents && (
        <div className="flex items-center justify-center">
          <Link href="/events">
            <Button variant="outline" className="text-[#00798A] cursor-pointer">
              See all events
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeEvents;
