import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function Router({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(() => {
    const initial = window.location.pathname;

    // Default redirect if root
    if (initial === "/") {
      window.history.replaceState({}, "", "/about");
      return "/about";
    }

    return initial;
  });

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
    }
  };

  useEffect(() => {
    const onPopState = () => {
      let path = window.location.pathname;

      // Catch-all fallback to /about
      if (!["/about", "/projects", "/thoughts"].includes(path)) {
        window.history.replaceState({}, "", "/about");
        path = "/about";
      }

      setCurrentPath(path);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a Router");
  }
  return context;
}

export function Route({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const { currentPath } = useRouter();
  return currentPath === path ? <>{children}</> : null;
}
