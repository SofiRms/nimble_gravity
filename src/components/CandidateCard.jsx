import StatusBadge from "./StatusBadge";

export default function CandidateCard({ candidate }) {
  return (
    <div className="rounded-2xl border border-emerald-800/60 bg-gradient-to-br from-emerald-950/40 to-slate-900 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-300 text-base">
          {candidate.firstName?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">
            {candidate.firstName} {candidate.lastName}
          </p>
          <p className="text-xs text-slate-400">{candidate.email}</p>
        </div>
        <StatusBadge status="success" message="Candidato verificado" />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {[
          ["UUID", candidate.uuid],
          ["Candidate ID", candidate.candidateId],
          ["Application ID", candidate.applicationId],
        ].map(([label, value]) => (
          <div key={label} className="col-span-2 flex gap-2 items-start">
            <span className="text-slate-500 shrink-0 w-24">{label}</span>
            <span className="text-emerald-400 break-all">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}