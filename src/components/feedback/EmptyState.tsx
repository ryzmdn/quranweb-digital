/**
 * Empty state component
 */
interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "No results found",
  description = "Try adjusting your search criteria",
}: Readonly<EmptyStateProps>) => (
  <div className="flex justify-center items-center min-h-96">
    <div className="text-center">
      <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
        {title}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">{description}</p>
    </div>
  </div>
);

EmptyState.displayName = "EmptyState";
