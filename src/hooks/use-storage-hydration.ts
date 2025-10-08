import { useEffect, useState } from "react";
import { useAppPreferencesStore } from "../store/preferences";

export function useStorageHydration() {
  const hydrated = useAppPreferencesStore((s) => s.hydrated);
  const [ready, setReady] = useState(hydrated);

  useEffect(() => {
    if (hydrated) setReady(true);
  }, [hydrated]);

  return { isHydrated: ready };
}
