import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const AdminDetailsStep = ({ onSubmit, isLoading }) => {
  const [adminForm, setAdminForm] = useState({
    organization: "",
    position: "",
    admin_code: "",
    device_name: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(adminForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization
        </label>
        <Input
          required
          value={adminForm.organization}
          onChange={(e) =>
            setAdminForm({ ...adminForm, organization: e.target.value })
          }
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Position
        </label>
        <Input
          required
          value={adminForm.position}
          onChange={(e) =>
            setAdminForm({ ...adminForm, position: e.target.value })
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Admin Code
        </label>
        <Input
          type="password"
          required
          value={adminForm.admin_code}
          onChange={(e) =>
            setAdminForm({ ...adminForm, admin_code: e.target.value })
          }
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Device Name
        </label>
        <Input
          required
          value={adminForm.device_name}
          onChange={(e) =>
            setAdminForm({ ...adminForm, device_name: e.target.value })
          }
          placeholder="e.g. Work Laptop"
          className="w-full"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );
};

export default AdminDetailsStep;