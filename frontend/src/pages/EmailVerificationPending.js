import { EmailVerification } from "@/components/EmailVerification";
import { useAuth } from "@/context/AuthContext";

const EmailVerificationPending = () => {
  const { user, resendVerificationEmail } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <EmailVerification 
        email={user.email} 
        onResendVerification={() => resendVerificationEmail({ email: user.email })}
      />
    </div>
  );
};

export default EmailVerificationPending;