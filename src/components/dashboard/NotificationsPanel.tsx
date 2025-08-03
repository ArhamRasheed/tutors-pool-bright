import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, MessageCircle, FileText, Clock } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "session",
    icon: Calendar,
    title: "Math session reminder",
    message: "Your session with Dr. Smith starts in 30 minutes",
    time: "30 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "message",
    icon: MessageCircle,
    title: "New message from tutor",
    message: "Prof. Johnson sent you practice problems",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    type: "assignment",
    icon: FileText,
    title: "Assignment due soon",
    message: "Chemistry lab report due tomorrow",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 4,
    type: "achievement",
    icon: Bell,
    title: "New achievement unlocked",
    message: "Completed 10 consecutive sessions!",
    time: "1 day ago",
    unread: false,
  },
];

const getNotificationColor = (type: string, unread: boolean) => {
  const baseColor = {
    session: "sky",
    message: "emerald",
    assignment: "amber",
    achievement: "purple",
  }[type] || "slate";
  
  return unread ? `${baseColor}-500` : `${baseColor}-400`;
};

export const NotificationsPanel = () => {
  const unreadCount = notifications.filter(n => n.unread).length;
  
  return (
    <Card className="shadow-lg border-sky-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-slate-700">
            <Bell className="h-5 w-5 text-sky-600" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm" className="text-sky-600 border-sky-200 hover:bg-sky-50">
            Mark all read
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => {
          const IconComponent = notification.icon;
          const iconColor = getNotificationColor(notification.type, notification.unread);
          
          return (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer ${
                notification.unread 
                  ? "bg-gradient-to-r from-sky-50 to-emerald-50 border-sky-200" 
                  : "bg-white border-slate-100 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-${iconColor}/10 flex-shrink-0`}>
                  <IconComponent className={`h-4 w-4 text-${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${notification.unread ? "text-slate-700" : "text-slate-600"}`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{notification.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};