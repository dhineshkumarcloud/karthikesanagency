import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl">Page not found</p>
        <Link to="/" className="underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
