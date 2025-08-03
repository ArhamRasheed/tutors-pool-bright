import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { TimetableWidget } from "@/components/dashboard/TimetableWidget";
import { PerformanceAnalytics } from "@/components/dashboard/PerformanceAnalytics";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { NotificationsPanel } from "@/components/dashboard/NotificationsPanel";
import { AchievementsBoard } from "@/components/dashboard/AchievementsBoard";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <WelcomeBanner />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <TimetableWidget />
                <PerformanceAnalytics />
              </div>
              
              <div className="space-y-6">
                <GoalTracker />
                <NotificationsPanel />
              </div>
            </div>
            
            <AchievementsBoard />
            <DashboardFooter />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;