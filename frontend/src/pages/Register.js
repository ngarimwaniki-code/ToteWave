import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import RegisterForm from "@/components/auth/AdminRegistration";

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: ""
  });

  useEffect(() => {
    if (user) {
      navigate('/account');
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.email || !registerForm.password) return;
    await register(registerForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform perspective-1000">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Create Your Account
          </h2>
          <RegisterForm 
            registerForm={registerForm}
            setRegisterForm={setRegisterForm}
            onSubmit={handleRegister}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
