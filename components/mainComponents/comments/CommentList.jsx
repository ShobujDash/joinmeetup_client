"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CommentList = ({ eventId, refreshTrigger }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setdeleteLoading] = useState(false);
  const { user } = useAuth();

  const fetchComments = async () => {
    try {
      const res = await axiosPublic.get(`/api/comment/event/${eventId}`);
      setComments(res.data?.comments || []);
    } catch (err) {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      setdeleteLoading(true);
      const res = await axiosPublic.delete(`/api/comment/${commentId}`);
      if (res.data?.success) {
        toast.success("Comment deleted");
        setComments((prev) => prev.filter((c) => c.id !== commentId));
        setdeleteLoading(false);
      } else {
        toast.error("Failed to delete comment");
        setdeleteLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting comment");
      setdeleteLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId, refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">No comments yet.</div>
    );
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      {comments.map((comment) => (
        <Card key={comment.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar className="py-0">
                <AvatarImage
                  src={
                    comment.user?.image
                      ? comment.user.image.startsWith("http")
                        ? comment.user.image
                        : comment.user.image.startsWith("/uploads")
                        ? `${process.env.NEXT_PUBLIC_BASE_URI}${comment.user.image}`
                        : `${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${comment.user.image}`
                      : undefined
                  }
                  alt={comment.user?.name || "User"}
                  className="w-8 h-8"
                />
                <AvatarFallback className="w-8 h-8 bg-blue-400 text-white font-bold py-0">
                  {comment.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-sm py-0 my-0 text-gray-800">
                  {comment.user?.name || "Anonymous"}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {comment?.user?.email === user?.email && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  {deleteLoading ? (
                    <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
          <p className=" text-sm text-gray-700">{comment.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
