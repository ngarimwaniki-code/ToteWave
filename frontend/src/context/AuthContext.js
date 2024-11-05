import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/authService';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const checkEmailVerification = async () => {
    try {
      const status = await authService.checkEmailVerificationStatus();
      return status.results?.[0]?.is_verified ?? false;
    } catch (error) {
      console.error('Failed to check email verification status:', error);
      return false;
    }
  };

  const checkAdminStatus = async (userData) => {
    try {
      if (userData?.isAdmin) {
        await authService.verifyAdminStatus();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to verify admin status:', error);
      return false;
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          const isValid = await authService.verifyToken(storedUser.access);
          if (!isValid) {
            try {
              await authService.refreshToken(storedUser.refresh);
              const isAdmin = await checkAdminStatus(storedUser);
              setUser({ ...storedUser, isAdmin });
              await checkEmailVerification();
            } catch {
              handleLogout();
            }
          } else {
            const isAdmin = await checkAdminStatus(storedUser);
            setUser({ ...storedUser, isAdmin });
            await checkEmailVerification();
          }
        }
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
    const interval = setInterval(verifyAuth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    queryClient.clear();
    navigate('/login');
  };

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: !!user,
  });

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
      toast.success('Profile updated successfully');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const resendVerificationEmailMutation = useMutation({
    mutationFn: authService.resendVerificationEmail,
    onSuccess: () => {
      toast.success('Verification email sent successfully');
    },
    onError: () => {
      toast.error('Failed to send verification email');
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: () => {
      toast.success('Email verified successfully');
      queryClient.invalidateQueries(['profile']);
    },
    onError: () => {
      toast.error('Failed to verify email');
    },
  });

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const isAdmin = await checkAdminStatus(data);
      setUser({ ...data, isAdmin });

      const isVerified = await checkEmailVerification();
      if (!isVerified) {
        toast.info('Please verify your email address');
        navigate('/verify-email', { replace: true });
      } else {
        toast.success('Successfully logged in!');
        navigate('/profile', { replace: true });
      }

      return true;
    } catch {
      toast.error('Login failed');
      return false;
    }
  };
  
  const register = async (userData) => {
    try {
      await authService.register(userData);
      toast.success('Registration successful! Please check your email for verification.');
      navigate('/login');
      return true;
    } catch {
      toast.error('Registration failed');
      return false;
    }
  };

  const value = {
    user,
    login,
    logout: handleLogout,
    register,
    loading,
    profile,
    profileLoading,
    updateProfile: updateProfileMutation.mutate,
    resendVerificationEmail: resendVerificationEmailMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    checkEmailVerification,
    isAdmin: user?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;