import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save } from "lucide-react";

const ProfileEdit = ({ profile }) => {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone_number: profile?.phone_number || "",
    address: profile?.address || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">First Name</label>
          <Input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            maxLength={150}
            className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12 shadow-sm hover:shadow transition-shadow"
            placeholder="Enter your first name"
          />
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Last Name</label>
          <Input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            maxLength={150}
            className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12 shadow-sm hover:shadow transition-shadow"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Phone Number</label>
        <Input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          maxLength={15}
          className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12 shadow-sm hover:shadow transition-shadow"
          placeholder="Enter your phone number"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Address</label>
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-12 shadow-sm hover:shadow transition-shadow"
          placeholder="Enter your address"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-base font-medium rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Save className="w-5 h-5 mr-2" />
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileEdit;