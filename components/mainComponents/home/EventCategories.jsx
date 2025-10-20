"use client"; // Lucide icons client-side লাগে

import {
  Airplay,
  Users,
  Music,
  HeartPulse,
  Laptop,
  Palette,
  Dice6,
  Microscope,
  Presentation,
  GraduationCap,
  Mic,
  Cake,
  Trophy,
  Mail,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";

const categories = [
  { title: "Scientific Conference", icon: Microscope, color: "text-red-600" },
  { title: "Workshops", icon: Presentation, color: "text-indigo-600" },
  { title: "Seminar", icon: GraduationCap, color: "text-gray-700" },
  { title: "English Speaking Practice", icon: Mic, color: "text-blue-700" },
  { title: "Birthday Celebration", icon: Cake, color: "text-pink-500" },
  { title: "Sports", icon: Trophy, color: "text-green-500" },
  { title: "General Invitation", icon: Mail, color: "text-orange-600" },
  {
    title: "Marriage Ceremony",
    icon: HeartHandshake,
    color: "text-purple-500",
  },
  { title: "Travel & Adventure", icon: Airplay, color: "text-green-600" },
  { title: "Social & Networking", icon: Users, color: "text-pink-600" },
  { title: "Music & Hobbies", icon: Music, color: "text-yellow-500" },
  { title: "Health & Fitness", icon: HeartPulse, color: "text-teal-600" },
  {
    title: "Technology & Innovation",
    icon: Laptop,
    color: "text-purple-600",
  },
  { title: "Art & Culture", icon: Palette, color: "text-orange-500" },
  { title: "Games & Entertainment", icon: Dice6, color: "text-blue-600" },
];

export default function EventCategories() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 px-4 md:px-10 relative">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Explore Top Event Categories
      </h2>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 
                   rounded-full bg-gray-100/80 backdrop-blur-sm p-3 
                   shadow-md hover:bg-gray-200 transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 
                   rounded-full bg-gray-100/80 backdrop-blur-sm p-3 
                   shadow-md hover:bg-gray-200 transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          if (!Icon) return null;
          return (
            <div
              key={index}
              className="min-w-[160px] flex flex-col items-center justify-center bg-white rounded-xl p-4 shadow hover:shadow-lg transition "
            >
              <Icon className={`w-8 h-8 mb-2 ${cat.color}`} />
              <p className="text-sm md:text-base text-center font-medium text-gray-800">
                {cat.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
