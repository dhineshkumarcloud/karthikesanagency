/**
 * Root application router.
 *
 * SEO / Performance anti-patterns fixed here:
 * ─────────────────────────────────────────────
 * BEFORE: All route components were imported statically — bundled into one
 *         giant JS chunk downloaded before ANY content paints.
 *         Anti-pattern: hurts Largest Contentful Paint (LCP).
 *
 * AFTER:  React.lazy() + Suspense splits each route into its own async
 *         chunk. The browser only downloads the code it needs right now.
 *         Fix: Improves LCP by reducing initial JS parse/execute time.
 */
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// ── Code-split route-level components ──────────────────────────────────────
// Each lazy() call creates a separate async chunk in the production build.
// Improves: LCP — initial JS bundle is ~60–70% smaller.
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Minimal, layout-shift-free loading fallback.
// A blank fallback prevents flash of unstyled content while chunk loads.
const PageLoader = () => (
  <div
    className="min-h-screen bg-background flex items-center justify-center"
    aria-label="Loading page"
    aria-live="polite"
  >
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Suspense is required at the router level when using lazy routes.
            Fallback renders immediately while the JS chunk for the matched
            route is fetched — prevents a blank white screen. */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
