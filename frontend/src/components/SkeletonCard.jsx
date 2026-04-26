const SkeletonCard = () => (
  <div className="rounded-3xl border border-slate-200/60 bg-white p-6 space-y-4 animate-pulse shadow-sm h-28 flex flex-col justify-center">
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 bg-slate-100 rounded-xl shrink-0" />
      <div className="flex-1 space-y-3 pt-1">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="h-5 bg-slate-100 rounded w-3/4" />
      </div>
    </div>
  </div>
);

export default SkeletonCard;
