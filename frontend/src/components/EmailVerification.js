import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MailWarning, Loader2 } from "lucide-react";

export const EmailVerification = ({ email, onResendVerification }) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const handleResendEmail = async () => {
    if (resendCount >= 3) {
      return;
    }

    setIsResending(true);
    try {
      await onResendVerification();
      setResendCount(prev => prev + 1);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto verification-card">
      <CardHeader>
        <div className="verification-icon">
          <MailWarning className="w-full h-full text-yellow-500" />
        </div>
        <CardTitle className="text-center">Verify Your Email</CardTitle>
        <CardDescription className="text-center">
          We've sent a verification link to {email}. Please check your inbox and click the link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or click below to resend.
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          onClick={handleResendEmail} 
          disabled={isResending || resendCount >= 3}
          className="w-full"
        >
          {isResending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Resend Verification Email'
          )}
        </Button>
        <div className="text-xs text-center text-muted-foreground">
          {resendCount > 0 && `Resent ${resendCount}/3 times`}
        </div>
      </CardFooter>
    </Card>
  );
};