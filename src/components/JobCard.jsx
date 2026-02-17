import { useState, useCallback } from "react";
import { applyToJob } from "../services/jobsService";
import { isValidGithubUrl } from "../utils/github-url";
import StatusBadge from "./StatusBadge";
import { BriefcaseBusiness, CheckCircle2, Send, Loader2 } from "lucide-react";

export default function JobCard({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [state, setState] = useState({ status: "idle", message: "" });

  const handleSubmit = useCallback(async () => {
    if (!candidate) {
      setState({ status: "error", message: "Primero verificá tu candidatura." });
      return;
    }
    if (!isValidGithubUrl(repoUrl)) {
      setState({ status: "error", message: "Ingresá una URL de GitHub válida." });
      return;
    }

    setState({ status: "loading", message: "Enviando postulación..." });
    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl,
      });
      setState({ status: "success", message: "¡Postulación enviada!" });
    } catch (err) {
      setState({ status: "error", message: err.message });
    }
  }, [repoUrl, candidate, job.id]);

  const isSuccess = state.status === "success";
  const isLoading = state.status === "loading";

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-64
        ${isSuccess
          ? "border-emerald-700 bg-gradient-to-br from-emerald-950/60 to-slate-900"
          : "border-slate-700 bg-gradient-to-br from-slate-800/60 to-slate-900 hover:border-slate-500"
        }`}
    >
      <div
        className={`h-0.5 w-full shrink-0 transition-all duration-500
          ${isSuccess
            ? "bg-emerald-500"
            : "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100"
          }`}
      />

      <div className="flex flex-col flex-1 p-4 gap-3 min-h-0">
        <div className="flex items-start gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-slate-700/60 flex items-center justify-center text-slate-400 shrink-0">
            <BriefcaseBusiness size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-mono text-slate-500 mb-0.5 truncate">ID: {job.id}</p>
            <h3 className="text-sm font-semibold text-slate-100 leading-snug line-clamp-2">{job.title}</h3>
          </div>
        </div>

        {/* Repo input */}
        <input
          type="url"
          value={repoUrl}
          onChange={(e) => {
            setRepoUrl(e.target.value);
            if (state.status !== "idle") setState({ status: "idle", message: "" });
          }}
          onKeyDown={(e) => e.key === "Enter" && !isLoading && !isSuccess && handleSubmit()}
          placeholder="https://github.com/usuario/repo"
          disabled={isLoading || isSuccess}
          className={`w-full px-3 py-2 rounded-xl text-xs font-mono outline-none transition-all duration-200
            bg-slate-950/70 border text-slate-200 placeholder-slate-600
            ${isSuccess
              ? "border-emerald-800 opacity-60 cursor-not-allowed"
              : "border-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            }`}
        />

        <div className="flex flex-col gap-2 mt-auto shrink-0">
          {state.message && (
            <StatusBadge status={state.status} message={state.message} />
          )}
          <button
            onClick={handleSubmit}
            disabled={isLoading || isSuccess}
            className={`w-full py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5
              ${isSuccess
                ? "bg-emerald-800/60 text-emerald-300 cursor-default"
                : isLoading
                  ? "bg-slate-700 text-slate-400 cursor-wait"
                  : "bg-violet-600 hover:bg-violet-500 active:scale-95 text-white shadow-lg shadow-violet-900/40 cursor-pointer"
              }`}
          >
            {isSuccess ? (
              <><CheckCircle2 size={14} /> Enviado</>
            ) : isLoading ? (
              <><Loader2 size={14} className="animate-spin" /> Enviando…</>
            ) : (
              <><Send size={14} /> Submit</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}