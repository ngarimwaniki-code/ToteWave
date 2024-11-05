import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileEdit from "@/components/profile/ProfileEdit";
import DeviceVerification from "@/components/profile/DeviceVerification";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { user, profile, profileLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const isAdmin = profile?.role === "admin";

  if (profileLoading) {
    return (
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl space-y-8">
          <Skeleton className="h-12 w-[250px] mx-auto" />
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 min-h-screen py-8 lg:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
            <svg
              className="w-10 h-10 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Welcome back, {profile?.first_name || user?.email}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your profile settings and preferences in one place. Keep your information up to date for a better experience.
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="overflow-hidden border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <div className="border-b border-gray-100 bg-white/80 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
                className="hover:bg-gray-100 rounded-full w-10 h-10"
              >
                {isEditing ? (
                  <svg
                    className="h-5 w-5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81145 17.7747C4.42092 18.1652 4.42092 18.7984 4.81145 19.1889C5.20197 19.5794 5.83514 19.5794 6.22566 19.1889L12.0004 13.4141L17.7752 19.1889C18.1657 19.5794 18.7989 19.5794 19.1894 19.1889C19.5799 18.7984 19.5799 18.1652 19.1894 17.7747L13.4146 11.9999L19.1894 6.22517C19.5799 5.83465 19.5799 5.20148 19.1894 4.81096C18.7989 4.42044 18.1657 4.42044 17.7752 4.81096L12.0004 10.5857L6.22566 4.81096Z"
                      fill="currentColor"
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
                      d="M16.862 4.487L18.549 2.799C19.132 2.216 20.064 2.216 20.646 2.799L21.201 3.354C21.784 3.937 21.784 4.869 21.201 5.452L19.514 7.139M16.862 4.487L4.146 17.203C3.959 17.39 3.854 17.646 3.854 17.913V20.146C3.854 20.696 4.304 21.146 4.854 21.146H7.087C7.354 21.146 7.61 21.041 7.797 20.854L20.513 8.138M16.862 4.487L20.513 8.138"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Button>
            </div>
            <CardContent className="p-6 bg-white/60">
              {isEditing ? (
                <ProfileEdit profile={profile} />
              ) : (
                <ProfileInfo profile={profile} />
              )}
            </CardContent>
          </Card>

          {isAdmin && (
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <DeviceVerification />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};


export default Profile;