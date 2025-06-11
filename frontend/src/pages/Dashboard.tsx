// Dashboard.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import TweetForm from "@/components/TweetForm";
import TweetList from "@/components/TweetList";
import { Tweet } from "../types/tweet"; 
import { LogOut, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [editingTweetId, setEditingTweetId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const { data: tweets = [], isLoading } = useQuery<Tweet[]>({
    queryKey: ["tweets"],
    queryFn: async () => (await api.get("/tweets")).data,
  });

  const tweetMutation = useMutation({
    mutationFn: async () => {
      setIsSubmitting(true);
      if (editingTweetId) {
        await api.put(`/tweets/${editingTweetId}`, { text });
      } else {
        await api.post("/tweets", { text });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets"]);
      setText("");
      setEditingTweetId(null);
    },
    onSettled: () => setIsSubmitting(false),
  });

  const handleSubmit = () => {
    if (text.trim().length === 0) return setError("Tweet cannot be empty");
    if (text.length > 280) return setError("Tweet must be 280 characters or less");
    setError("");
    tweetMutation.mutate();
  };

  const startEdit = (tweet: Tweet) => {
    setText(tweet.text);
    setEditingTweetId(tweet._id);
  };

  const cancelEdit = () => {
    setText("");
    setEditingTweetId(null);
  };

  const deleteTweet = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(`/tweets/${id}`);
      queryClient.invalidateQueries(["tweets"]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const handleSignout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/signin"; 
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  }
 
  // Calculate remaining characters
    const remainingChars = 280 - text.length;


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-600">Welcome</span>
            <div className="flex-grow" />
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignout}
              className="h-8 px-3 text-gray-600 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2 text-red-500" />
              Sign Out
            </Button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-lg font-semibold text-gray-900">TweetApp</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <TweetForm
          text={text}
          setText={setText}
          editingTweetId={editingTweetId}
          onCancelEdit={cancelEdit}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={error}
        />
        <TweetList
          tweets={tweets}
          isLoading={isLoading}
          onEdit={startEdit}
          onDelete={deleteTweet}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}
