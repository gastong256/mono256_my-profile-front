"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils/cn";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "compact" | "flexible";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: (errorCode?: string) => boolean | void;
  "timeout-callback"?: () => void;
};

type TurnstileApi = {
  render: (
    container: HTMLElement | string,
    options: TurnstileRenderOptions
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_ID = "cloudflare-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let turnstileScriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstileScript(): Promise<TurnstileApi> {
  if (typeof window === "undefined") {
    return Promise.reject(
      new Error("Turnstile requires a browser environment.")
    );
  }

  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(
      TURNSTILE_SCRIPT_ID
    ) as HTMLScriptElement | null;

    function resolveIfReady() {
      if (window.turnstile) {
        resolve(window.turnstile);
        return true;
      }

      return false;
    }

    if (existingScript) {
      if (resolveIfReady()) {
        return;
      }

      existingScript.addEventListener("load", resolveIfReady, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load the Turnstile script.")),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (!resolveIfReady()) {
        reject(new Error("Turnstile script loaded without exposing the API."));
      }
    };
    script.onerror = () =>
      reject(new Error("Failed to load the Turnstile script."));
    document.head.appendChild(script);
  });

  return turnstileScriptPromise;
}

export type TurnstileWidgetHandle = {
  reset: () => void;
};

type TurnstileWidgetProps = {
  siteKey: string;
  className?: string;
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: (errorCode?: string) => void;
};

export const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  TurnstileWidgetProps
>(function TurnstileWidget(
  { siteKey, className, onVerify, onExpire, onError },
  ref
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const verifyRef = useRef(onVerify);
  const expireRef = useRef(onExpire);
  const errorRef = useRef(onError);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    expireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    errorRef.current = onError;
  }, [onError]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (!window.turnstile || !widgetIdRef.current) {
        return;
      }

      window.turnstile.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    let isMounted = true;

    async function mountWidget() {
      if (!containerRef.current) {
        return;
      }

      setIsLoading(true);

      try {
        const turnstile = await loadTurnstileScript();

        if (!isMounted || !containerRef.current || widgetIdRef.current) {
          return;
        }

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "auto",
          size: "flexible",
          callback(token) {
            verifyRef.current(token);
          },
          "expired-callback"() {
            expireRef.current();
          },
          "timeout-callback"() {
            expireRef.current();
          },
          "error-callback"(errorCode) {
            errorRef.current(errorCode);
            return true;
          },
        });
      } catch (error) {
        if (isMounted) {
          const errorCode =
            error instanceof Error ? error.message : "turnstile_load_failed";
          errorRef.current(errorCode);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void mountWidget();

    return () => {
      isMounted = false;

      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return (
    <div
      className={cn(
        "min-h-[78px] rounded-md border border-border/70 bg-background/20 p-3",
        className
      )}
    >
      <div ref={containerRef} />
      {isLoading ? (
        <p className="text-xs text-foreground/60">Loading security check...</p>
      ) : null}
    </div>
  );
});
