"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { useState } from "react";
import { toast } from "sonner";

export function PublishAlertModal({
  open,
  setOpen,
  eventId,
  onPublishSuccess,
  publish,
}) {
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!eventId) return toast.error("Event ID missing");
    try {
      setLoading(true);

      const { data } = await axiosPublic.get(`/api/ticket/${eventId}`);
      if (data?.success) {
        const res = await axiosPublic.put(`/api/events/publish/${eventId}`, {
          isPublish: publish,
        });
        if (res?.data?.success) {
          toast.success(
            publish ? "Event published successfully!" : "Event unpublished."
          );
          setOpen(false);
          onPublishSuccess?.(eventId, publish);
        }
      } else {
          toast.error(
              "Please add at least one ticket before publishing this event."
          );
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        publish ? "Failed to publish event." : "Failed to unpublish event."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {publish ? "Make Event Public?" : "Unpublish Event?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {publish
              ? "Once public, everyone can view your event."
              : "Unpublished events will be hidden from users."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePublish} disabled={loading}>
            {loading
              ? publish
                ? "Publishing..."
                : "Unpublishing..."
              : publish
              ? "Yes, Publish"
              : "Yes, Unpublish"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
