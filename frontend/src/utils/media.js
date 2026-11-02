const MEDIA_BASE = import.meta.env.VITE_MEDIA_URL || "";   // CRA: process.env.REACT_APP_MEDIA_URL

export function mediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;  // already full URL
  return `${MEDIA_BASE}${path.startsWith("/") ? path : "/" + path}`;
}