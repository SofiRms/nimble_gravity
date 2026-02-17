import { isValidEmail } from "../utils/email-regex";
import {BASE_URL} from "../config/api";

export async function fetchCandidate(email) {
  if (!isValidEmail(email)) {
    throw new Error("El email ingresado no tiene un formato válido");
  }
  const res = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  );
  const data = await res.json();
    if (res.status === 404) {
    throw new Error("No se encontró un candidato con ese mail");
  }
  if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);
  return data;
}