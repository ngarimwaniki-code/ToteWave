import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck, XCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState("loading");
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setVerificationStatus("success");
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    if (token) {
      verify();
    }
  }, [token, verifyEmail]);

  const renderContent = () => {
    switch (verificationStatus) {
      case "loading":
        return (
          <>
            <div className="verification-icon pulse-animation">
              <Loader2 className="w-full h-full text-primary animate-spin" />
            </div>
            <CardTitle className="text-center">Verifying Your Email</CardTitle>
            <CardDescription className="text-center">
              Please wait while we verify your email address...
            </CardDescription>
          </>
        );
      case "success":
        return (
          <>
            <div className="verification-icon">
              <MailCheck className="w-full h-full text-green-500" />
            </div>
            <CardTitle className="text-center">Email Verified!</CardTitle>
            <CardDescription className="text-center">
              Your email has been successfully verified. You can now access all features of your account.
            </CardDescription>
          </>
        );
      case "error":
        return (
          <>
            <div className="verification-icon">
              <XCircle className="w-full h-full text-destructive" />
            </div>
            <CardTitle className="text-center">Verification Failed</CardTitle>
            <CardDescription className="text-center">
              The verification link is invalid or has expired. Please request a new verification email.
            </CardDescription>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md verification-card">
        <CardHeader>{renderContent()}</CardHeader>
        <CardContent className="flex justify-center">
          {verificationStatus !== "loading" && (
            <Button onClick={() => navigate("/")} className="mt-4">
              Return to Homepage
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;