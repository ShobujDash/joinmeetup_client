import React from 'react'
import HomeEvents from './HomeEvents';
import { fetchEvents } from '@/lib/Events/getEventsFromHome';
import Link from 'next/link';

const Upcomming = async() => {

  const events = await fetchEvents(4);

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-0">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="font-bold text-2xl text-gray-900 mb-2">
            Upcoming events
          </h1>
        </div>
        <div className="hidden md:block">
          <Link href="/events" className="text-lg font-semibold text-[#00798A] cursor-pointer">
            See all events
          </Link>
        </div>
      </div>

      <HomeEvents events={events} />
    </div>
  );
}

export default Upcomming