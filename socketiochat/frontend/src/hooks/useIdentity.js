export function useIdentity() {
  const idFromSession = sessionStorage.getItem('id');
  if (idFromSession) return idFromSession;

  const id = crypto.randomUUID();
  sessionStorage.setItem('id', id);
  return id;
}
