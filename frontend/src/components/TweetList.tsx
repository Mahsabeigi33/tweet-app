import TweetCard from "./TweetCard";
import { Tweet } from "../types";
import { Card } from "@/components/ui/card";
import { Loader2, MessageSquare } from "lucide-react";

interface Props {
  tweets: Tweet[];
  isLoading: boolean;
  onEdit: (tweet: Tweet) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export default function TweetList({ tweets, isLoading, onEdit, onDelete, formatDate }: Props) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading tweets...</span>
      </div>
    );
  }

  if (tweets.length === 0) {
    return (
      <Card className="p-12 text-center bg-white/50">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tweets yet</h3>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <TweetCard
          key={tweet._id}
          tweet={tweet}
          onEdit={onEdit}
          onDelete={onDelete}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
}
