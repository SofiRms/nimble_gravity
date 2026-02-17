export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;

  const sanitizedEmail = email.trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  return emailRegex.test(sanitizedEmail);
}