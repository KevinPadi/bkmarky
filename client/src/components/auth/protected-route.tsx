import { Navigate, Outlet } from "react-router";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin size-10" />
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
