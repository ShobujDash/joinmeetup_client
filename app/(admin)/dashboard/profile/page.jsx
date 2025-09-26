"use client";

import UserProfile from "@/components/adminComponents/UserProfile";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  const userDetails = {
    ...user,
  };

  return (
    <main className="flex-1 p-4">
      <UserProfile creator={userDetails} profile={true} />
    </main>
  );
}
