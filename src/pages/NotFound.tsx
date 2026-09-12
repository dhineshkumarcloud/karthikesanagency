import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found | Karthikesan Agencies"
        description="The page you requested could not be found. Visit Karthikesan Agencies for FMCG distribution in Karaikal and TR Pattinam."
        noindex
      />
      <main className="flex min-h-screen items-center justify-center bg-muted">
        <article className="text-center px-4">
          <h1 className="mb-4 text-4xl font-bold">404 — Page Not Found</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <Link to="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </Link>
        </article>
      </main>
    </>
  );
};

export default NotFound;
