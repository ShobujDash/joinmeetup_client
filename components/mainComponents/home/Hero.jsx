import { Button } from "@/components/ui/button";
import { HeroImage } from "@/public/assets/assets";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto h-[80vh]  flex items-center p-4 lg:p-0">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-1/2">
          <h1 className="font-bold text-3xl lg:text-4xl text-black dark:text-white py-3 ">
            Connectly — Where interests turn into connections
          </h1>
          <p className="text-md font-normal text-gray-800 py-2">
            Explore your passions with people who share them—whether it’s
            hiking, reading, networking, or learning something new. Thousands
            connect on Meetup every day. Be part of it.
          </p>
          <Button className="bg-[#008FA3] hover:bg-[#7fdce9] duration-300 my-4">
            Join MeetUpBD
          </Button>
        </div>
        <div className="w-full md:w-1/2 border">
          <Image src={HeroImage} alt="Hero Image" width={400} height={200} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
