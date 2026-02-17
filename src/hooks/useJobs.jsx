import { useState, useEffect } from "react";
import { fetchJobs } from "../services/jobsService";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [jobsState, setJobsState] = useState({ status: "loading", message: "Cargando posiciones..." });

  useEffect(() => {
    fetchJobs()
      .then((data) => {
        setJobs(data);
        setJobsState({ status: "success", message: `${data.length} posiciones encontradas` });
      })
      .catch((err) => {
        setJobsState({ status: "error", message: err.message });
      });
  }, []);

  return { jobs, jobsState };
}