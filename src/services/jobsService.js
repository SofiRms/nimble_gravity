import {BASE_URL} from "../config/api";

export async function fetchJobs() {
  const res = await fetch(`${BASE_URL}/api/jobs/get-list`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);
  return data;
}

export async function applyToJob({ uuid, jobId, candidateId, applicationId, repoUrl }) {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uuid, jobId, candidateId, applicationId, repoUrl }),
  });
  const data = await res.json();
   if (res.status === 404) {
    throw new Error("Lo sentimos, no has sido seleccionado como candidato para esta posición");
  }
  if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);
  return data;
}