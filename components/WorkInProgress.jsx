"use client";

import { Loader2, HardHat, Lightbulb, Clock3 } from "lucide-react";

export default function WorkInProgressMessage({ payment }) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-yellow-50">
      <div className="flex items-center gap-3 rounded-xl border border-yellow-400 bg-white px-6 py-4 text-yellow-800 shadow-lg">
        <HardHat className="w-6 h-6 text-yellow-600 animate-bounce" />
        <span className="font-semibold text-base">
          {payment === "payment" ? (
            <div className="w-full flex items-center justify-center">
              <div className="bg-blue-100 text-blue-800 px-6 py-4 rounded-xl shadow-md flex flex-col items-center gap-2 animate-pulse">
                <Lightbulb className="w-8 h-8 text-blue-600 animate-bounce" />
                <p className="font-semibold text-lg text-center">
                  কাজের সূচনা এখনো হয়নি 🛠️,
                  <br />
                  ডেভেলপার প্ল্যানিং নিয়ে ব্যস্ত 🤔🗺️
                </p>
                <Clock3 className="w-5 h-5 animate-spin text-blue-600" />
              </div>
            </div>
          ) : (
            <p>Backend এর API বানানো শেষ ✅, Frontend এর কাজ চলছে...</p>
          )}
        </span>
        <Loader2 className="w-5 h-5 animate-spin text-yellow-500" />
      </div>
    </div>
  );
}
