const styles = {
  pending:
    "bg-yellow-100 text-yellow-700",

  confirmed:
    "bg-blue-100 text-blue-700",

  in_progress:
    "bg-purple-100 text-purple-700",

  completed:
    "bg-green-100 text-green-700",

  cancelled:
    "bg-red-100 text-red-700",

  active:
    "bg-green-100 text-green-700",

  inactive:
    "bg-red-100 text-red-700",
};

const labels = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  active: "Active",
  inactive: "Inactive",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

export default StatusBadge;