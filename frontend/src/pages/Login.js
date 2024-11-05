import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) {
      navigate(location.state?.from || '/account');
    }
  }, [user, location.state, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;
    await login(loginForm.email, loginForm.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform perspective-1000">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            {location.state?.message || "Welcome Back"}
          </h2>
          <LoginForm 
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            onSubmit={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;