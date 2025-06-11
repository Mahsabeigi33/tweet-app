import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Plus, Edit, X, Send, Loader2, User } from "lucide-react";

interface Props {
  text: string;
  setText: (t: string) => void;
  editingTweetId: string | null;
  onCancelEdit: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  error: string;
}

export default function TweetForm({
  text,
  setText,
  editingTweetId,
  onCancelEdit,
  onSubmit,
  isSubmitting,
  error,
}: Props) {
  const remainingChars = 280 - text.length;

  return (
    <div className="mb-8">
      <div className="bg-white/90 shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          {editingTweetId ? (
            <>
              <Edit className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-lg font-semibold">Edit Tweet</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-lg font-semibold">What's happening?</span>
            </>
          )}
        </div>

        {error && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        <Textarea
          placeholder="Share your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isSubmitting}
          className="min-h-[120px] resize-none"
        />

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <User className="w-4 h-4" />
            Posting as You
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-sm ${
                remainingChars < 0
                  ? "text-red-500"
                  : remainingChars < 20
                  ? "text-amber-500"
                  : "text-gray-500"
              }`}
            >
              {remainingChars}
            </span>
            {editingTweetId && (
              <Button variant="outline" onClick={onCancelEdit} disabled={isSubmitting}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            )}
            <Button
              onClick={onSubmit}
              disabled={isSubmitting || text.trim() === "" || remainingChars < 0}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {editingTweetId ? "Updating..." : "Posting..."}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {editingTweetId ? "Update Tweet" : "Post Tweet"}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
