import { HomeIcon, FileTextIcon, BarChart2Icon, ShieldIcon, UsersIcon, BriefcaseIcon, BookOpenIcon, GlobeIcon } from "lucide-react"

export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    title: "Claims",
    to: "/claims",
    icon: <FileTextIcon className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    to: "/analytics",
    icon: <BarChart2Icon className="h-4 w-4" />,
  },
  {
    title: "Risk Management",
    to: "/risk-management",
    icon: <ShieldIcon className="h-4 w-4" />,
  },
  {
    title: "Customers",
    to: "/customers",
    icon: <UsersIcon className="h-4 w-4" />,
  },
  {
    title: "Policies",
    to: "/policies",
    icon: <BriefcaseIcon className="h-4 w-4" />,
  },
  {
    title: "Training",
    to: "/training",
    icon: <BookOpenIcon className="h-4 w-4" />,
  },
  {
    title: "Compliance",
    to: "/compliance",
    icon: <GlobeIcon className="h-4 w-4" />,
  },
]