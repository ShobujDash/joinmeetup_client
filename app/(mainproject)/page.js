import EventCategories from "@/components/mainComponents/home/EventCategories";
import Hero from "@/components/mainComponents/home/Hero";
import MeetupInvite from "@/components/mainComponents/home/MeetupInvite";
import PopularCities from "@/components/mainComponents/home/PopularCities";
import Upcomming from "@/components/mainComponents/home/Upcomming";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto ">
      <Hero />
      <Upcomming />
      <EventCategories />
      <MeetupInvite />
      <PopularCities />
    </div>
  );
}
