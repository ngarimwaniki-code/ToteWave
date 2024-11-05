import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { webAuthnService } from "@/services/webAuthnService";
import { Steps } from "@/components/ui/steps";
import UserRegistrationStep from "./UserRegistrationStep";
import AdminDetailsStep from "./AdminDetailsStep";
import SuccessStep from "./SuccessStep";

const steps = [
  { title: "User Registration", description: "Create your user account" },
  { title: "Basic Info", description: "Enter your admin details" },
  { title: "Device Registration", description: "Register your security device" },
  { title: "Email Verification", description: "Verify your email" },
  { title: "Admin Verification", description: "Verify admin status" }
];

const AdminRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserRegistrationComplete = () => {
    setCurrentStep(1);
  };

  const handleAdminRegistration = async (adminForm) => {
    setIsLoading(true);
    
    try {
      // Step 1: Register WebAuthn
      const regResult = await webAuthnService.registerWebAuthn();
      await webAuthnService.verifyWebAuthnRegistration({
        ...regResult,
        device_name: adminForm.device_name
      });
      
      setCurrentStep(2);
      toast.success("Device registered successfully!");

      // Step 2: Verify admin status
      await webAuthnService.verifyAdminStatus();
      setCurrentStep(3);
      toast.success("Admin status verified!");

      // Step 3: Request email verification
      await webAuthnService.resendVerificationEmail();
      setCurrentStep(4);
      toast.success("Verification email sent!");
      
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Steps currentStep={currentStep} steps={steps} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {currentStep === 0 && (
            <UserRegistrationStep onComplete={handleUserRegistrationComplete} />
          )}

          {currentStep === 1 && (
            <AdminDetailsStep 
              onSubmit={handleAdminRegistration}
              isLoading={isLoading}
            />
          )}

          {currentStep > 1 && (
            <SuccessStep
              title={`${steps[currentStep].title} Complete!`}
              description={
                currentStep === 4
                  ? "You can now access admin features!"
                  : "Please proceed with the next step."
              }
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AdminRegistration;