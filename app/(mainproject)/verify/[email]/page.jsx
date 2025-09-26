"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { verifyUserAPI } from "@/service/projectService/auth.service";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
 const { email: encodedEmail } = useParams();
 const email = decodeURIComponent(encodedEmail);

  const router = useRouter();
  const { fetchUser } = useAuth();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    console.log("email otp ==>", email, enteredOtp);

    try {
      setLoading(true);

      const data = await verifyUserAPI({email,otp:enteredOtp})

      if (data.success) {
        toast.success("OTP Verified Successfully!");
        await fetchUser();
        router.push("/");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[95vh] bg-blue-100">
      <div className="flex bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl h-[70vh] w-full">
        {/* Left Side */}
        <div className="flex-1 flex justify-center items-center bg-blue-50 p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
            alt="OTP Illustration"
            className="w-72 h-72"
          />
        </div>

        {/* Right Side */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            OTP Verification
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter OTP Code sent to <strong>{email}</strong>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <div className="text-sm text-gray-500">
              Didn’t receive OTP?{" "}
              <button
                type="button"
                className="text-blue-600 font-medium hover:underline"
              >
                Resend Code
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Proceed"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
