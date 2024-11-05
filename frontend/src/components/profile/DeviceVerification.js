import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { webAuthnService } from "@/services/webAuthnService";
import { useAuth } from "@/context/AuthContext";

const DeviceVerification = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const devices = [
    { type: "Mobile", status: "Verified", lastUsed: "2 hours ago" },
    { type: "Desktop", status: "Pending", lastUsed: "Just now" },
  ];

  const handleRegisterDevice = async () => {
    setIsRegistering(true);
    try {
      // Start WebAuthn registration
      const registrationData = await webAuthnService.registerWebAuthn({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone_number: profile.phone_number,
        address: profile.address,
        is_verified: profile.is_verified,
      });

      // Verify the registration
      await webAuthnService.verifyWebAuthnRegistration(registrationData);

      toast({
        title: "Success",
        description: "Device registered successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to register device",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <svg
            className="h-6 w-6 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Device Verification</h3>
          <p className="text-sm text-gray-500">Manage your trusted devices</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {devices.map((device) => (
          <div 
            key={device.type}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-white/90 hover:from-white hover:to-gray-50/80 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {device.type === "Mobile" ? (
                  <svg
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5"
                      y="2"
                      width="14"
                      height="20"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{device.type}</p>
                <p className="text-sm text-gray-500">Last used: {device.lastUsed}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`h-2.5 w-2.5 rounded-full ${
                device.status === "Verified" ? "bg-green-500" : "bg-yellow-500"
              }`} />
              <span className={`text-sm font-medium ${
                device.status === "Verified" ? "text-green-600" : "text-yellow-600"
              }`}>
                {device.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Verify your devices to enhance account security and manage access across different platforms.
        </p>
        
        <Button 
          variant="outline" 
          className="w-full h-12 text-base font-medium rounded-xl border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-200"
          onClick={handleRegisterDevice}
          disabled={isRegistering}
        >
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {isRegistering ? "Registering..." : "Register New Device"}
        </Button>
      </div>
    </div>
  );
};

export default DeviceVerification;