import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/shared/navbar/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import EmailVerificationPending from "./pages/EmailVerificationPending";

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {navItems.map(({ to, page, protected: isProtected, adminOnly }) => (
                <Route
                  key={to}
                  path={to}
                  element={
                    isProtected ? (
                      <ProtectedRoute adminOnly={adminOnly}>{page}</ProtectedRoute>
                    ) : (
                      page
                    )
                  }
                />
              ))}
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/verify-email" element={<EmailVerificationPending />} />
              <Route path="/profile" element={<Profile />} /> 
            </Routes>
          </Suspense>
        </main>
      </div>
    </TooltipProvider>
  </AuthProvider>
);

export default App;