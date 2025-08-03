import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, Clock } from "lucide-react";

const weeklyGoals = [
  {
    id: 1,
    title: "Attend 3 sessions",
    progress: 66,
    current: 2,
    target: 3,
    status: "in-progress",
  },
  {
    id: 2,
    title: "Complete 5 assignments",
    progress: 100,
    current: 5,
    target: 5,
    status: "completed",
  },
  {
    id: 3,
    title: "Study 10 hours",
    progress: 80,
    current: 8,
    target: 10,
    status: "in-progress",
  },
  {
    id: 4,
    title: "Review flashcards daily",
    progress: 85,
    current: 6,
    target: 7,
    status: "in-progress",
  },
];

export const GoalTracker = () => {
  const completedGoals = weeklyGoals.filter(goal => goal.status === "completed").length;
  const totalGoals = weeklyGoals.length;
  
  return (
    <Card className="shadow-lg border-sky-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-slate-700">
            <Target className="h-5 w-5 text-sky-600" />
            <span>Weekly Goals</span>
          </CardTitle>
          <div className="text-sm text-slate-500">
            {completedGoals}/{totalGoals} completed
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-100">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-slate-700">Overall Progress</span>
            <span className="text-2xl font-bold text-sky-600">{Math.round((completedGoals / totalGoals) * 100)}%</span>
          </div>
          <Progress value={(completedGoals / totalGoals) * 100} className="h-3" />
        </div>

        {/* Individual Goals */}
        <div className="space-y-4">
          {weeklyGoals.map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {goal.status === "completed" ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="font-medium text-slate-700">{goal.title}</span>
                </div>
                <span className="text-sm text-slate-500">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <Progress 
                value={goal.progress} 
                className={`h-2 ${goal.status === "completed" ? "bg-emerald-100" : ""}`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};