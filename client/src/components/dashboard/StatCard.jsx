const StatCard = ({
  title,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-neutral-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-neutral-900">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;