"use client";

import {
  Chicago,
  Miami,
  Nashville,
  NewYork,
  SanFras,
} from "@/public/assets/assets";
import Image from "next/image";

// Cities data
const cities = [
  { name: "New York", image: NewYork },
  { name: "San Francisco", image: SanFras },
  { name: "Chicago", image: Chicago },
  { name: "Nashville", image: Nashville },
  { name: "Miami", image: Miami },
];

export default function PopularCities() {
  return (
    <section className="py-10 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Popular cities on Meetup
      </h2>
      <p className="text-gray-600 mb-6">
        Looking for fun things to do near you? See what Meetup organizers are
        planning in cities around the country.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {cities.map((city, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-lg">
              <Image
                src={city.image}
                alt={city.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="mt-3 text-center font-medium text-gray-800">
              {city.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
