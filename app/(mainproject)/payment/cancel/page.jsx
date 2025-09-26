"use client";

import { useRouter } from "next/navigation";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-8">
      <h1 className="text-4xl font-bold text-yellow-700 mb-4">
        Payment Cancelled
      </h1>
      <p className="text-lg mb-2">You cancelled the payment process.</p>

      <button
        onClick={() => router.push("/")}
        className="mt-4 px-6 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
      >
        Go to Home
      </button>
    </main>
  );
}
