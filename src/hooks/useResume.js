import { useEffect, useState } from "react";
import { api } from "../api.js";
import { profile } from "../data/portfolio.js";

export function useResume() {
  const [resumeUrl, setResumeUrl] = useState(profile.resumeUrl);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const meta = await api.getResume();
        if (!cancelled && meta && meta.exists) {
          setResumeUrl(api.resumeFileUrl());
        }
      } catch {
        /* backend offline - keep static resume.pdf */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return resumeUrl;
}
