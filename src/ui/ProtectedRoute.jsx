import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { useUser } from "@/features/authentication/useUser";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isFetching, user } = useUser();

  useEffect(
    function () {
      if (!user && !isLoading && !isFetching) {
        navigate("/login");
      }
    },
    [isLoading, isFetching, user, navigate],
  );

  if (isLoading || isFetching) {
    return (
      <div className="page bg-slate-50">
        <section className="mx-auto my-0 max-w-6xl px-4 py-5">
          <div className="flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        </section>
      </div>
    );
  }

  if (user) return children;
}

export default ProtectedRoute;
