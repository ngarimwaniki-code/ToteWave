import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfileInfo = ({ profile }) => {
  const fields = [
    { label: "Email", value: profile?.email, icon: "📧", category: "Contact" },
    { label: "First Name", value: profile?.first_name, icon: "👤", category: "Personal" },
    { label: "Last Name", value: profile?.last_name, icon: "👤", category: "Personal" },
    { label: "Phone Number", value: profile?.phone_number, icon: "📱", category: "Contact" },
    { label: "Address", value: profile?.address, icon: "🏠", category: "Contact" },
    { 
      label: "Verification Status", 
      value: profile?.is_verified ? "Verified" : "Not Verified",
      icon: "✅",
      status: profile?.is_verified ? "verified" : "pending",
      category: "Security"
    },
  ];

  const groupedFields = fields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedFields).map(([category, categoryFields]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center space-x-2">
            <span>{category}</span>
            <div className="h-px flex-1 bg-gray-200 ml-4"></div>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {categoryFields.map(({ label, value, icon, status }) => (
              <div 
                key={label} 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50/80 to-white/90 hover:from-white hover:to-gray-50/80 transition-all duration-300 p-6 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{icon}</span>
                    <label className="text-sm font-medium text-gray-500">{label}</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-base font-medium text-gray-900">
                      {value || "Not provided"}
                    </div>
                    {status && (
                      <Badge variant={status === "verified" ? "success" : "warning"}>
                        {status}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileInfo;