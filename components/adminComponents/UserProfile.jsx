"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { MapPinPlusInside, NotebookPen, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import EditProfileModal from "../mainComponents/profile/EditProfileModal";

const UserProfile = ({ creator, profile }) => {
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
    events: 0,
  });


  const { user } = useAuth();

  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        if (user?.id) {
          const res = await axiosPublic.get(
            `${process.env.NEXT_PUBLIC_BASE_URI}/api/follow/following`
          );
          const followingList = res.data?.following || [];
          const isFollowingUser = followingList.some(
            (u) => u.id === creator?.id
          );
          setIsFollowing(isFollowingUser);
        }
      } catch (err) {
        console.error("Follow status error:", err.message);
      }
    };

    fetchFollowStatus();
  }, [user?.id, creator?.id]); // still need creator?.id to match in `.some()`

  // 2️⃣ Get follow count - Only depends on creator?.id
  useEffect(() => {
    const fetchFollowCounts = async () => {
      try {
        if (creator?.id) {
          const countRes = await axiosPublic.get(
            `${process.env.NEXT_PUBLIC_BASE_URI}/api/follow/count/${creator.id}`
          );
          setFollowCounts({
            followers: countRes.data?.followers || 0,
            following: countRes.data?.following || 0,
            events: countRes.data?.events || 0,
          });
        }
      } catch (err) {
        console.error("Follow count error:", err.message);
      }
    };

    fetchFollowCounts();
  }, [creator?.id]);

  // ✅ Toggle follow/unfollow
  const handleToggleFollow = async () => {
    try {
      setLoading(true);

      if (user) {
        if (isFollowing) {
          // unfollow
          await axiosPublic.delete(
            `${process.env.NEXT_PUBLIC_BASE_URI}/api/follow/unfollow/${creator.id}`
          );
          setIsFollowing(false);
          setFollowCounts((prev) => ({
            ...prev,
            followers: prev.followers - 1,
          }));
        } else {
          // follow
          await axiosPublic.post(
            `${process.env.NEXT_PUBLIC_BASE_URI}/api/follow/follow/${creator.id}`,
            {}
          );
          setIsFollowing(true);
          setFollowCounts((prev) => ({
            ...prev,
            followers: prev.followers + 1,
          }));
        }
      } else {
        toast.error("Please Login Before!");
      }
    } catch (error) {
      toast.error("You cannot follow yourself.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="col-span-1 bg-gradient-to-br from-green-100 via-blue-100 to-white">
        <CardContent className="p-3">
          <div className="flex flex-col gap-2">
            {/* Avatar + counts */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
                {creator?.image ? (
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_BASE_URI}${creator.image}`}
                    src={
                      creator.image.startsWith("http")
                        ? creator.image
                        : `${process.env.NEXT_PUBLIC_BASE_URI}${creator.image}`
                    }
                    width={96}
                    height={96}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-blue-500 w-full h-full rounded-full flex items-center justify-center font-bold text-white">
                    {creator?.name?.split(" ")[0]?.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex gap-4 items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="font-semibold text-sm sm:text-lg">
                    {followCounts.events}
                  </h1>
                  <h1 className="font-semibold text-sm sm:text-lg">Events</h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="font-semibold text-sm sm:text-lg">
                    {followCounts.followers}
                  </h1>
                  <h1 className="font-semibold text-sm sm:text-lg">
                    Followers
                  </h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h1 className="font-semibold text-sm sm:text-lg">
                    {followCounts.following}
                  </h1>
                  <h1 className="font-semibold text-sm sm:text-lg">
                    Following
                  </h1>
                </div>
              </div>
            </div>

            {/* Name + Bio */}
            <div>
              <div className="flex flex-row gap-2 items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">{creator?.name}</h2>
                {profile && (
                  <Pencil
                    onClick={() => setShowProfileEditModal(true)}
                    className="cursor-pointer hover:text-gray-400"
                  />
                )}
              </div>

              <div className="flex items-start justify-start gap-2 font-light my-1">
                <NotebookPen className="font-light" />
                {creator?.bio || "No bio found"}
              </div>
              <div className="flex items-center gap-2 font-light">
                <MapPinPlusInside className="font-light" />
                {creator?.address || "No address found"}
              </div>
            </div>
          </div>

          {/* Button */}
          {profile ? (
            <Link href="/create-event">
              <Button className="mt-4 w-full bg-gradient-to-r from-green-400 via-blue-400 to-green-400 text-white hover:from-green-300 hover:via-blue-300 hover:to-green-300 transition-all duration-300 cursor-pointer">
                Create Your Event
              </Button>
            </Link>
          ) : (
            <Button
              className={`mt-4 w-full text-white transition-all duration-300 ${
                isFollowing
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-gradient-to-r from-green-400 via-blue-400 to-green-400 hover:from-green-300 hover:via-blue-300 hover:to-green-300"
              }`}
              onClick={handleToggleFollow}
              disabled={loading}
            >
              {loading ? "Processing..." : isFollowing ? "Following" : "Follow"}
            </Button>
          )}

          <div className="mt-6 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs text-gray-500 mb-1">Full Name</p>
              <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                {creator?.name || "Not provided"}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Email Address</p>
              <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                {creator?.email || "Not provided"}
              </div>
            </div>
            {profile && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Gender</p>
                <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                  {creator?.gender || "Not provided"}
                </div>
              </div>
            )}
            {profile && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Facebook</p>
                <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                  {creator?.facebook || "Not provided"}
                </div>
              </div>
            )}
            {profile && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Profession</p>
                <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                  {creator?.profession || "Not provided"}
                </div>
              </div>
            )}

            {profile && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Website</p>
                <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                  {creator?.website || "Not provided"}
                </div>
              </div>
            )}

            {profile && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                  {creator?.phone || "Not provided"}
                </div>
              </div>
            )}
            {profile && (
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <div className="w-full bg-slate-50 text-gray-800 px-4 py-2 rounded-md border border-slate-200">
                  {creator?.address || "Not provided"}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <EditProfileModal
        open={showProfileEditModal}
        setOpen={setShowProfileEditModal}
        data={creator}
      />
    </>
  );
};

export default UserProfile;
