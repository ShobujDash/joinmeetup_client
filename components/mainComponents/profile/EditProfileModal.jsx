"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { updateProfile } from "@/lib/Auth/updateProfileApi";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";

const EditProfileModal = ({ open, setOpen, data }) => {
  const { user } = useAuth();
  const userRole = user?.role;

  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profession: "",
    website: "",
    facebook: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        dob: data.dob || "",
        gender: data.gender || "",
        profession: data.profession || "",
        website: data.website || "",
        facebook: data.facebook || "",
        address: data.address || "",
        bio: data.bio || "",
      });
    }
  }, [data]);
  const [loading, setLoading] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // will send later in FormData
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);
    form.append("gender", formData.gender);
    form.append("profession", formData.profession);
    form.append("website", formData.website);
    form.append("facebook", formData.facebook);
    form.append("address", formData.address);
    form.append("bio", formData.bio);

    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    try {
      const res = await updateProfile(form);
      toast.success(res?.message);
      setOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false); // ✅ loading end
    }
  };

  const getImageSrc = () => {
    if (profileImage) {
      return URL.createObjectURL(profileImage);
    }
    if (data?.image) {
      return `${process.env.NEXT_PUBLIC_BASE_URI}${data.image}`;
    }
    return "https://via.placeholder.com/150x150.png?text=Profile";
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen} className={"px-2 md:px-0"}>
      <DialogContent className="max-w-[425px] md:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
          <DialogDescription>Update your basic information</DialogDescription>
        </DialogHeader>
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300">
            <img
              src={getImageSrc()}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
            <ImageIcon className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        {/* Profile Edit Form */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="profession">Profession</Label>
            <Input
              id="profession"
              value={formData.profession}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
            />
          </div>

          <hr />
          <div>
            {userRole === "admin" && (
              <div className="space-y-4 mt-2">
                <h3 className="text-lg font-semibold">Admin Controls</h3>
                <p className="text-sm text-muted-foreground">
                  Super Admin can assign route-based permissions to this user.
                </p>

                <div className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="users" />
                    <label
                      htmlFor="users"
                      className="text-sm font-medium leading-none"
                    >
                      Users Access
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="events" />
                    <label
                      htmlFor="events"
                      className="text-sm font-medium leading-none"
                    >
                      Event Access
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="tickets" />
                    <label
                      htmlFor="tickets"
                      className="text-sm font-medium leading-none"
                    >
                      Ticket Access
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="registration" />
                    <label
                      htmlFor="registration"
                      className="text-sm font-medium leading-none"
                    >
                      Registration Access
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="logo" />
                    <label
                      htmlFor="logo"
                      className="text-sm font-medium leading-none"
                    >
                      Logo Access
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hero" />
                    <label
                      htmlFor="hero"
                      className="text-sm font-medium leading-none"
                    >
                      Hero Access
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="brand" />
                    <label
                      htmlFor="brand"
                      className="text-sm font-medium leading-none"
                    >
                      Brand Access
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end md:col-span-2">
            <div className="flex justify-end md:col-span-2">
              {loading ? (
                <Button disabled className="w-full">
                  <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
                  Saving...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
