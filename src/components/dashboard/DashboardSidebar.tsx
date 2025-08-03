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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card/90 backdrop-blur-xl border-r border-border shadow-elegant hidden lg:block">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
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
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-md",
                    isActive
                      ? "bg-gradient-primary text-white shadow-glow border border-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    isActive ? "text-white" : "text-muted-foreground"
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
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <span className="text-white font-semibold text-sm">SJ</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
              <p className="text-xs text-muted-foreground">AS Level Student</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};