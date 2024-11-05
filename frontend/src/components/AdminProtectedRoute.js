import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { webAuthnService } from "@/services/webAuthnService";
import { useToast } from "@/hooks/use-toast";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!user?.isAdmin) {
        setIsVerified(false);
        setIsLoading(false);
        return;
      }

      try {
        await webAuthnService.verifyAdminStatus();
        setIsVerified(true);
      } catch (error) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page",
          variant: "destructive",
        });
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isVerified ? children : <Navigate to="/" replace />;
};

export default AdminProtectedRoute;