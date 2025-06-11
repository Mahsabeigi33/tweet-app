import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import TweetForm from "@/components/TweetForm";
import TweetList from "@/components/TweetList";
import { Tweet } from "@/types"; 
import { LogOut, MessageSquare, User, Globe,UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [editingTweetId, setEditingTweetId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "user">("user"); 

  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

///query for user tweets
const {data:userTweets=[],isLoading:userTweetsLoading} = useQuery<Tweet[]>({
    queryKey: ["tweets", "user",currentUser.id],
    queryFn: async () => (await api.get(`/tweets/user/${currentUser.id}`)).data,
    enabled: viewMode === "user" && !!currentUser.id,
  });

  // Query for all tweets
  const { data: allTweets = [], isLoading: isLoadingAllTweets } = useQuery<Tweet[]>({
    queryKey: ["tweets","all"],
    // If viewMode is "user", fetch user-specific tweets, otherwise fetch all tweets
    queryFn: async () => (await api.get("/tweets")).data,
    enabled: viewMode === "all",
  });
  const tweets = viewMode === "user" ? userTweets : allTweets;
  const isLoading = viewMode === "user" ? userTweetsLoading : isLoadingAllTweets;

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
      queryClient.invalidateQueries({ queryKey: ["tweets","user"] });
      queryClient.invalidateQueries({queryKey: ["tweets","all"] });
      setText("");
      setEditingTweetId(null);
    },
    onSettled: () => setIsSubmitting(false),
  });

  const handleSubmit = () => {
    if (text.trim().length === 0) return setError("Tweet cannot be empty");
    if (text.length > 140) return setError("Tweet must be 140 characters or less");
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
      queryClient.invalidateQueries({queryKey:["tweets"]});
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
  const handleViewModeChange = (mode :"all" | "user")=>{
    setViewMode(mode);
    setText("");
    setEditingTweetId(null);
    setError("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-gray-600">Welcome {currentUser.email || "Guest"}</span>
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
              <span className="text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
            <h1 className="text-xl font-bold text-blue-700">TweetApp</h1>
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
         {/* View Mode Toggle */}
         <div className="mb-6 flex items-center justify-center space-x-1 bg-white rounded-lg p-1 shadow-sm border">
          <Button
            variant={viewMode === "user" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleViewModeChange("user")}
            className="flex items-center space-x-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>My Tweets</span>
          </Button>
          <Button
            variant={viewMode === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleViewModeChange("all")}
            className="flex items-center space-x-2"
          >
            <Globe className="w-4 h-4" />
            <span>All Tweets</span>
          </Button>
        </div>

        <TweetList
          tweets={tweets}
          isLoading={isLoading}
          onEdit={startEdit}
          onDelete={deleteTweet}
          formatDate={formatDate}
          currentUserId={currentUser.id} 
          showActionButton ={viewMode === "user"} 
        />
      </div>
    </div>
  );
}
