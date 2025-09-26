"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FilterSidebar() {
  const { selectedOption, setSelectedOption } = useAuth();

  const sortOptions = [
    "Scientific Conference",
    "Workshops",
    "Seminar",
    "English Speaking Practice",
    "Travel & Adventure",
    "Social & Networking",
    "Music & Hobbies",
    "Health & Fitness",
    "Technology & Innovation",
    "Art & Culture",
    "Games & Entertainment",
    "Birthday Celebration",
    "Sports",
    "General Invitation",
    "Marriage Ceremony",
  ];

  const handleReset = () => {
    setSelectedOption(null);
  };

  return (
    <div className="w-full max-w-sm rounded-none">
      <div className="space-y-6 p-4">
        {/* Delivery Type Toggle */}
        <div className="flex w-full rounded-full overflow-hidden border border-blue-300">
          <Button
            variant="ghost"
            className=" w-full bg-blue-800 text-white hover:bg-blue-600 hover:text-gray-200 duration-300"
          >
            Filter Events
          </Button>
        </div>

        {/* Sort By Options */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Sort by</p>
          {sortOptions.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name="sort"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>


  
        {/* Dropdown Sections (Dummy) */}
        <div className="border-t pt-4 space-y-4">
          {["Price Range"].map((label) => (
            <div
              key={label}
              className="flex justify-between items-center cursor-pointer"
            >
              <span className="text-sm font-medium">{label}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-2 pt-2">
          <Button
            variant="outline"
            className="w-1/2  hover:bg-slate-300 duration-300 cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button className="w-1/2 bg-blue-800 hover:bg-blue-600 duration-300 cursor-pointer">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
