"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { categories, speakerCategories } from "@/utils/category";
import { Loader2Icon, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Calendar24 from "../../calendar-24";
import { Switch } from "../../ui/switch";
import { TicketModal } from "../modal/ShowTicketModal";
import RichTextEditor from "../rich-text-editor";
import SpeakersForm from "../SpeakersForm";

export default function EventForm({ eventData }) {
  const [isOnline, setIsOnline] = useState(false);
  const [eventDes, setEventDes] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [eventName, setEventName] = useState("");
  const [hostName, setHostName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [zoomLinkUrl, setZoomLikUrl] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [promoImage, setPromoImage] = useState(null);

  const [speakers, setSpeakers] = useState([]);
  const handleSpeakersChange = (updatedSpeakers) => {
    setSpeakers(updatedSpeakers);
  };

  useEffect(() => {
    if (eventData) {
      setEventName(eventData?.eName || "");
      setHostName(eventData?.hostName || "");
      setStartDateTime(eventData?.eStDateAndTime || "");
      setEndDateTime(eventData?.eEndDateAndTime || "");
      setSelectedCategory(eventData?.category || "");
      setEventAddress(eventData?.eAddress || "");
      setEventDes(eventData?.eDes || "");
      setIsOnline(eventData?.isOnline || false);
      setFacebookUrl(eventData?.fbUrl || "");
      setRefundPolicy(eventData?.refindPolicy || "");
      setAcceptTerms(eventData?.tremsAndCon || false);
      setZoomLikUrl(eventData?.zoomLink || "");

      if (eventData?.banner) {
        const bannerUrl = eventData.banner.startsWith("http")
          ? eventData.banner
          : `${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${eventData.banner}`;
        setPreview(bannerUrl);
      } else {
        setPreview(null);
      }

      if (eventData?.speaker) {
        setSpeakerName(eventData.speaker.name || "");
        setSpeakerDetails(eventData.speaker.details || "");
        if (eventData?.speaker?.image) {
          setSpeakerPreview(eventData.speaker.image);
        }
      }
    }
  }, [eventData]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setPromoImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only PNG or JPEG files are allowed.");
    }
  };

  const handleSubmit = async () => {
    const missingFields = [];

    if (!eventName?.trim()) missingFields.push("Event Name");
    if (!hostName?.trim()) missingFields.push("Host Name");
    if (!eventDes?.trim()) missingFields.push("Event Description");
    if (!startDateTime) missingFields.push("Start Date & Time");
    if (!endDateTime) missingFields.push("End Date & Time");
    if (!eventAddress?.trim()) missingFields.push("Event Address");
    if (!promoImage && !eventData?.banner) missingFields.push("Promo Image");

    if (speakerCategories.includes(selectedCategory)) {
      speakers.forEach((sp, idx) => {
        if (!sp.name?.trim()) missingFields.push(`Speaker ${idx + 1} Name`);
        if (!sp.details?.trim())
          missingFields.push(`Speaker ${idx + 1} Details`);
        if (!sp.image && !sp.preview)
          missingFields.push(`Speaker ${idx + 1} Image`);
      });
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill in the following: ${missingFields.join(", ")}`);
      return;
    }

    const formData = new FormData();
    formData.append("eName", eventName);
    formData.append("hostName", hostName);
    formData.append("eStDateAndTime", startDateTime);
    formData.append("eEndDateAndTime", endDateTime);
    formData.append("category", selectedCategory);
    formData.append("eAddress", eventAddress);
    formData.append("eDes", eventDes);
    formData.append("isOnline", isOnline);
    formData.append("fbUrl", facebookUrl);
    formData.append("refindPolicy", refundPolicy);
    formData.append("tremsAndCon", acceptTerms);

    if (promoImage) {
      formData.append("banner", promoImage);
    }

    if (isOnline) {
      formData.append("zoomLink", zoomLinkUrl);
    }

    // 🔹 Speaker data JSON আকারে পাঠানো
    if (speakerCategories.includes(selectedCategory)) {
      const speakerData = speakers.map((sp) => ({
        name: sp.name,
        details: sp.details,
      }));

      formData.append("speakers", JSON.stringify(speakerData));

      speakers.forEach((sp, idx) => {
        if (sp.image) {
          formData.append("speakerImage", sp.image);
          formData.append("speakerIndex", idx);
        }
      });
    }

    try {
      setLoading(true);

      let response;
      if (eventData?.id) {
        response = await axiosPublic.put(
          `/api/events/update/${eventData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axiosPublic.post("/api/events/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response?.data?.success) {
        toast.success("Event saved successfully!");
        router.push(`/event/${response?.data?.event?.id}/ticket`);
        setLoading(false);
      } else {
        toast.error(response?.data.message || "Something went wrong.");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Submission failed.");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-0 sm:p-2 md:p-4 lg:p-6 bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-6">Create Event</h2>

      {/* Basic Details */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col sm:flex-col  justify-between">
            <label className="block mb-2 font-medium md:w-1/5">
              Event Name*
            </label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              placeholder="Event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-col  justify-between">
            <label className="block mb-2 font-medium md:w-1/5">
              Host Name*
            </label>
            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              placeholder="Provide your host name"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {/* Start Date */}
          <div className="p-0 sm:p-4 bg-white rounded-xl sm:shadow sm:border">
            <Calendar24
              eventdate="Event Start Date"
              value={startDateTime}
              onChange={setStartDateTime}
            />
          </div>

          {/* End Date */}
          <div className="p-0 sm:p-4 bg-white rounded-xl sm:shadow sm:border">
            <Calendar24
              eventdate="Event End Date"
              value={endDateTime}
              onChange={setEndDateTime}
            />
          </div>

          {/* Category Select */}
          <div className="p-0 sm:p-4 bg-white rounded-xl sm:shadow sm:border">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <Select
              onValueChange={(value) => setSelectedCategory(value)}
              value={selectedCategory}
              className={"cursor-pointer"}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SpeakersForm
          eventData={eventData}
          speakerCategories={speakerCategories}
          selectedCategory={selectedCategory}
          onSpeakersChange={handleSpeakersChange}
        />

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <label className="block mb-2 font-medium md:w-1/5">
            Event Banner
          </label>
          <div
            className="w-full border-dashed border-2 rounded p-6 text-center mb-4 cursor-pointer flex justify-center items-center flex-col"
            onClick={handleDivClick}
          >
            {preview || eventData?.banner ? (
              <img
                src={
                  preview
                    ? preview
                    : typeof eventData?.banner === "string"
                    ? eventData.banner.startsWith("http")
                      ? eventData.banner
                      : `${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${eventData.banner}`
                    : ""
                }
                alt="Promo Banner Preview"
                className="w-full h-60 object-cover rounded"
              />
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-gray-400" />
                <span>Click to upload.</span>
                <span className="text-sm text-gray-500">
                  Recommended width: 930px; file types: png or jpeg
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col  gap-4  justify-baseline">
          <div className="flex flex-row gap-3 justify-baseline items-center">
            <label className="block mb-2 font-medium">
              Is your event online?
            </label>
            <Switch
              checked={isOnline}
              onCheckedChange={(val) => setIsOnline(val)}
            />
          </div>
          {isOnline && (
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between mt-2">
              <label className="block mb-2 font-medium">Add Zoom Link</label>
              <textarea
                className="w-4/5 border rounded p-2 mb-4"
                placeholder="Enter Zoom meeting link"
                value={zoomLinkUrl}
                onChange={(e) => setZoomLikUrl(e.target.value)}
                rows={2}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between mt-2">
          <label className="block mb-2 font-medium md:w-1/5">
            Event Address
          </label>
          <textarea
            className="w-full border rounded p-2 mb-4"
            placeholder="Enter an address"
            value={eventAddress}
            onChange={(e) => setEventAddress(e.target.value)}
            rows={3}
          />
        </div>
      </section>

      {/* Event Description */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Event Description</h3>
        <RichTextEditor value={eventDes} onChange={setEventDes} />
      </section>

      {/* Extra Information */}
      <section className="mb-8 border-t-2 border-gray-500  ">
        <h3 className="text-lg font-semibold mb-4 mt-4">
          Additional Information
        </h3>

        <label className="block mb-2 font-medium">
          Facebook URL (Optional)
        </label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          placeholder="Facebook event link"
          value={facebookUrl}
          onChange={(e) => setFacebookUrl(e.target.value)}
        />

        <label className="block mb-2 font-medium">
          Refund Policy (Optional)
        </label>
        <select
          className="w-full border rounded p-2 mb-4"
          value={refundPolicy}
          onChange={(e) => setRefundPolicy(e.target.value)}
        >
          <option value="">Select refund policy</option>
          <option value="no-refund">No Refund</option>
          <option value="partial-refund">Partial Refund</option>
          <option value="full-refund">Full Refund</option>
        </select>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            className="mr-2"
          />
          Terms & conditions (Optional)
        </label>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded">
          Save Draft & Exit
        </button>

        {loading ? (
          <Button disabled>
            <Loader2Icon className="animate-spin" />
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-pink-500 hover:bg-pink-400 duration-300 text-white px-6 py-2 rounded"
          >
            {eventData ? "Update" : "Next"}
          </Button>
        )}
      </div>

      {/* Show the Modal */}
      <TicketModal open={showModal} setOpen={setShowModal} />
    </div>
  );
}
