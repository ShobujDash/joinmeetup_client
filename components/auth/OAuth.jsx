"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { app } from "@/utils/firebase";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function OAuth() {
  const { setUser } = useAuth();
  const auth = getAuth(app);
  const router = useRouter();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      const { data } = await axiosPublic.post("/api/auth/google", {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });

      if (data?.success) {
        toast.success("Login Successfull.");
        sessionStorage.setItem("login", "1");
        setUser(data?.user);

        if (data?.user?.isAdmin) {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Please Try Again");
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      variant="outline"
      className={"bg-[#4954E7] text-white hover:bg-[#2d3aeb] hover:text-white duration-300"}
    >
      <IconBrandGoogleFilled className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default OAuth;
