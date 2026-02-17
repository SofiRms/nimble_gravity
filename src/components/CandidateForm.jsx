import { useState, useCallback } from "react";
import { fetchCandidate } from "../services/candidateService";
import { isValidEmail } from "../utils/email-regex";
import CandidateCard from "./CandidateCard";
import StatusBadge from "./StatusBadge";

export default function CandidateForm({ onCandidateLoaded }) {
  const [email, setEmail] = useState("");
  const [candidate, setCandidate] = useState(null);
  const [emailState, setEmailState] = useState({ status: "idle", message: "" });

  const handleVerify = useCallback(async () => {
    if (!isValidEmail(email)) {
      setEmailState({ status: "error", message: "Ingresá un email válido." });
      return;
    }
    setEmailState({ status: "loading", message: "Buscando candidato..." });
    try {
      const data = await fetchCandidate(email);
      setCandidate(data);
      setEmailState({ status: "success", message: "Candidato encontrado." });
      onCandidateLoaded?.(data);
    } catch (err) {
      setCandidate(null);
      onCandidateLoaded?.(null);
      setEmailState({ status: "error", message: err.message });
    }
  }, [email, onCandidateLoaded]);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800/40 p-5 space-y-4">

      {/* Email row */}
      <div className="space-y-2">
        <div className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            placeholder="tu@email.com"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-mono outline-none transition-all duration-200
              bg-slate-950/70 border border-slate-600 text-slate-200 placeholder-slate-600
              focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
          <button
            onClick={handleVerify}
            disabled={emailState.status === "loading"}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
              bg-violet-600 hover:bg-violet-500 active:scale-95 text-white
              shadow-lg shadow-violet-900/40 disabled:opacity-50 disabled:cursor-wait cursor-pointer"
          >
            {emailState.status === "loading" ? "..." : "Verificar"}
          </button>
        </div>

        {emailState.message && (
          <StatusBadge status={emailState.status} message={emailState.message} />
        )}
      </div>

      {candidate && <CandidateCard candidate={candidate} />}
    </div>
  );
}