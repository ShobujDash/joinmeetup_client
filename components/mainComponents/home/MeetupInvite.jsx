import { MeetUpInvite } from "@/public/assets/assets";
import Image from "next/image";

export default function MeetupInvite() {
  return (
    <section className="bg-gray-50 rounded-2xl p-6 md:p-10 flex flex-col-reverse md:flex-row items-center gap-6 md:gap-10">
      {/* Left - Text */}
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Join Meetup
        </h2>
        <p className="mt-3 text-gray-700 text-sm md:text-base">
          People use Meetup to meet new people, learn new things, find support,
          get out of their comfort zones, and pursue their passions, together.
          Membership is free.
        </p>
        <button className="mt-5 px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition">
          Sign up
        </button>
      </div>

      {/* Right - Image */}
      <div className="flex-1 w-full max-w-sm">
        <Image
          src={MeetUpInvite}
          alt="Meetup Illustration"
          width={500}
          height={300}
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}
