"use client";

import { useRouter } from "next/navigation";

export default function PaymentFail() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-8">
      <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Failed!</h1>
      <p className="text-lg mb-2">Sorry, your payment was not successful.</p>

      <button
        onClick={() => router.push("/")}
        className="mt-4 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Go to Home
      </button>
    </main>
  );
}
