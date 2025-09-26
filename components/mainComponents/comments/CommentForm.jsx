"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import CommentList from "./CommentList";

const CommentForm = ({ eventId }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleCommentSubmit = async () => {
    if (!message.trim()) {
      return toast.error("Comment cannot be empty!");
    }

    try {
      setLoading(true);
      const res = await axiosPublic.post(`/api/comment/create`, {
        eventId,
        message,
      });

      if (res.data?.success) {
        toast.success("Comment posted!");
        setMessage("");
        setRefreshKey((prev) => prev + 1); 
      } else {
        toast.error("Failed to post comment.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-xl mt-4">
      <h2 className="text-lg font-semibold text-gray-500 mb-2">
        Add your comments.
      </h2>
      <Textarea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your comment..."
        className="mb-3"
      />
      {message.trim() && (
        <Button
          onClick={handleCommentSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      )}

      <CommentList eventId={eventId} refreshTrigger={refreshKey} />
    </div>
  );
};

export default CommentForm;
