import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Target, 
  Bell,
  GraduationCap
} from "lucide-react";

const navigationItems = [
  { name: "Home", icon: Home, href: "/student/dashboard", active: true },
  { name: "Timetable", icon: Calendar, href: "/student/timetable" },
  { name: "Analytics", icon: BarChart3, href: "/student/analytics" },
  { name: "Goals", icon: Target, href: "/student/goals" },
  { name: "Notifications", icon: Bell, href: "/student/notifications" },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-b from-white/90 to-sky-50/90 backdrop-blur-xl border-r border-sky-100 hidden lg:block">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-sky-100">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              TutorsPool
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/student/dashboard" && location.pathname === "/student");
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-sky-100 to-emerald-100 text-sky-700 shadow-sm border border-sky-200"
                      : "text-slate-600 hover:bg-white/50 hover:text-sky-600"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    isActive ? "text-sky-600" : "text-slate-500"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-6 border-t border-sky-100">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-white/50 to-sky-50/50">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">SJ</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Sarah Johnson</p>
              <p className="text-xs text-slate-500">AS Level Student</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};