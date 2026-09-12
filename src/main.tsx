/**
 * Application entry point.
 * Wraps the app with HelmetProvider (react-helmet-async) to enable
 * dynamic <head> management across all route components.
 *
 * Improves: Crawlability — each page's title, meta, and canonical are
 * updated reactively so search engine bots see correct signals.
 */
import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
