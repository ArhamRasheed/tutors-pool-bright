import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video } from "lucide-react";

const upcomingSessions = [
  {
    id: 1,
    subject: "Mathematics",
    tutor: "Dr. Smith",
    time: "Today, 3:00 PM",
    duration: "60 min",
    type: "Online",
  },
  {
    id: 2,
    subject: "Physics",
    tutor: "Prof. Johnson",
    time: "Tomorrow, 10:00 AM",
    duration: "90 min",
    type: "Online",
  },
  {
    id: 3,
    subject: "Chemistry",
    tutor: "Dr. Wilson",
    time: "Friday, 2:00 PM",
    duration: "60 min",
    type: "Online",
  },
];

export const TimetableWidget = () => {
  return (
    <Card className="shadow-lg border-sky-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-slate-700">
            <Calendar className="h-5 w-5 text-sky-600" />
            <span>Upcoming Sessions</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="text-sky-600 border-sky-200 hover:bg-sky-50">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-emerald-400 rounded-xl flex items-center justify-center">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700">{session.subject}</h4>
                <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{session.tutor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{session.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-700">{session.time}</div>
              <Button 
                size="sm" 
                className="mt-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600"
              >
                Join
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};