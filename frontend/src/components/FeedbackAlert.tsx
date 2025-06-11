import { Alert, AlertDescription } from "@/components/ui/alert";

export function FeedbackAlert({
  type,
  message,
}: {
  type: "error" | "success";
  message: string;
}) {
  const color = type === "error" ? "red" : "green";

  return (
    <Alert className={`border-${color}-200 bg-${color}-50`}>
      <AlertDescription className={`text-${color}-700`}>
        {message}
      </AlertDescription>
    </Alert>
  );
}
