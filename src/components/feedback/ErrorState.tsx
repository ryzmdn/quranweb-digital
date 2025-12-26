import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: Readonly<ErrorStateProps>) => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-center">
      <p className="text-red-600 mb-4">{error}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  </div>
);

ErrorState.displayName = "ErrorState";
