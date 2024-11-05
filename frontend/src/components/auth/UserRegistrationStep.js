import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const UserRegistrationStep = ({ onComplete }) => {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (userForm.password !== userForm.password2) {
        throw new Error("Passwords do not match");
      }

      // Call your user registration API here
      // For now, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("User registration successful!");
      onComplete();
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <Input
            required
            value={userForm.first_name}
            onChange={(e) => setUserForm({ ...userForm, first_name: e.target.value })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <Input
            required
            value={userForm.last_name}
            onChange={(e) => setUserForm({ ...userForm, last_name: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <Input
          type="email"
          required
          value={userForm.email}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <Input
          type="tel"
          required
          value={userForm.phone_number}
          onChange={(e) => setUserForm({ ...userForm, phone_number: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <Input
          required
          value={userForm.address}
          onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <Input
          type="password"
          required
          value={userForm.password}
          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password
        </label>
        <Input
          type="password"
          required
          value={userForm.password2}
          onChange={(e) => setUserForm({ ...userForm, password2: e.target.value })}
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Register User Account"
        )}
      </Button>
    </form>
  );
};

export default UserRegistrationStep;