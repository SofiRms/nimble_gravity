import { useState } from "react";
import { useJobs } from "./hooks/useJobs";
import { Users } from "lucide-react";
import CandidateForm from "./components/CandidateForm";
import JobsList from "./components/JobsList";

export default function App() {
  const [candidate, setCandidate] = useState(null);
  const { jobs, jobsState } = useJobs();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'DM Mono', 'Fira Code', monospace" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-900/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-fuchsia-900/15 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12 space-y-10">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-700/50 bg-violet-950/40 text-violet-300 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Nimble Gravity · Bot Filter Challenge
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Job Application Portal
          </h1>
          <p className="text-slate-400 text-sm">
            Complete los pasos para enviar su postulación.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-violet-900/60 border border-violet-700 flex items-center justify-center text-violet-300 text-xs font-bold">
              <Users size={14} />
            </span>
            <h2 className="text-base font-semibold text-slate-200">Verificar candidato</h2>
          </div>
          <CandidateForm onCandidateLoaded={setCandidate} />
        </section>

        {/* Job listings */}
        <JobsList jobs={jobs} jobsState={jobsState} candidate={candidate} />

        {/* Footer */}
        <footer className="pt-4 border-t border-slate-800 text-center text-xs text-slate-600">
          Nimble Gravity · Junior Fullstack Developer Challenge · 2026
        </footer>
      </div>
    </div>
  );
}