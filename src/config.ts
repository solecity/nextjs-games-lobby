export const getURL = () =>
  typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : window.location.origin;
