import { Inbox } from "lucide-react";

const EmptyState = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white py-16">
      <Inbox
        size={48}
        className="text-neutral-400"
      />

      <h3 className="mt-4 text-lg font-semibold text-neutral-900">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-center text-neutral-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;