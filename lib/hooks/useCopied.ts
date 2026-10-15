import * as React from "react";

/**
 * Remembers which field was just copied, so its button can show a tick for a
 * moment.
 *
 * TODO: write `value` to the clipboard once expo-clipboard is installed.
 */
export function useCopied(duration = 1200) {
  const [copied, setCopied] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = React.useCallback(
    (key: string, _value: string) => {
      setCopied(key);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), duration);
    },
    [duration],
  );

  return { copied, copy };
}
