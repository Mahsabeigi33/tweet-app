import { Tweet } from "../types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  tweet: Tweet;
  onEdit: (tweet: Tweet) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export default function TweetCard({ tweet, onEdit, onDelete, formatDate }: Props) {
  return (
    <div className="bg-white/90 p-6 shadow-md rounded-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-900">You</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatDate(tweet.createdAt)}</span>
              {tweet.createdAt !== tweet.updatedAt && (
                <Badge variant="outline" className="text-xs">
                  Edited
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" onClick={() => onEdit(tweet)} className="h-8 px-2">
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={() => onDelete(tweet._id)} className="h-8 px-2">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <p className="mt-4 text-gray-900 whitespace-pre-wrap">{tweet.text}</p>
    </div>
  );
}
