export const LoadingState = () => (
  <div className="flex justify-center items-center min-h-screen bg-transparent">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4" />
      <p className="text-gray-500">Loading Surah...</p>
    </div>
  </div>
);

LoadingState.displayName = "LoadingState";
