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
    <Card className="shadow-elegant border-border bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Upcoming Sessions</span>
          </CardTitle>
          <Button variant="outline" size="sm" className="text-primary border-border hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 rounded-xl bg-gradient-section border border-border hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-elegant transition-all duration-300">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{session.subject}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
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
              <div className="text-sm font-medium text-foreground">{session.time}</div>
              <Button 
                size="sm" 
                className="mt-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
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