import { BriefcaseBusiness } from "lucide-react";
import JobCard from "./JobCard";
import StatusBadge from "./StatusBadge";

function JobSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 animate-pulse flex flex-col gap-4 h-52">
      <div className="w-9 h-9 bg-slate-700 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-2.5 w-16 bg-slate-700 rounded" />
        <div className="h-4 w-full bg-slate-600 rounded" />
      </div>
      <div className="h-9 w-full bg-slate-700 rounded-xl" />
    </div>
  );
}

export default function JobsList({ jobs, jobsState, candidate }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-violet-900/60 border border-violet-700 flex items-center justify-center text-violet-300 text-xs font-bold">
            <BriefcaseBusiness size={14} />
          </span>
          <h2 className="text-base font-semibold text-slate-200">Posiciones disponibles</h2>
        </div>
        {jobsState.message && <StatusBadge status={jobsState.status} message={jobsState.message} />}
      </div>

      {jobsState.status === "loading" && (
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <JobSkeleton key={i} />)}
        </div>
      )}

      {jobsState.status === "error" && (
        <div className="rounded-2xl border border-red-800/50 bg-red-950/30 p-5 text-red-300 text-sm">
          Error al cargar posiciones: {jobsState.message}
        </div>
      )}

      {jobs.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} candidate={candidate} />
          ))}
        </div>
      )}
    </section>
  );
}