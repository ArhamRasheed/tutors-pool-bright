import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Flame, BookOpen, Target } from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "Perfect Attendance",
    description: "Attended all sessions this month",
    icon: Trophy,
    earned: true,
    date: "December 2024",
    color: "amber",
  },
  {
    id: 2,
    title: "Study Streak",
    description: "10 consecutive days of learning",
    icon: Flame,
    earned: true,
    date: "November 2024",
    color: "orange",
  },
  {
    id: 3,
    title: "A* Student",
    description: "Achieved A* in 3 subjects",
    icon: Star,
    earned: true,
    date: "October 2024",
    color: "purple",
  },
  {
    id: 4,
    title: "Goal Crusher",
    description: "Completed 5 weekly goals",
    icon: Target,
    earned: true,
    date: "October 2024",
    color: "emerald",
  },
  {
    id: 5,
    title: "Bookworm",
    description: "Read 20 learning materials",
    icon: BookOpen,
    earned: false,
    progress: 15,
    total: 20,
    color: "sky",
  },
  {
    id: 6,
    title: "Elite Learner",
    description: "Complete 50 total sessions",
    icon: Award,
    earned: false,
    progress: 42,
    total: 50,
    color: "rose",
  },
];

const leaderboard = [
  { rank: 1, name: "Emma Thompson", points: 2850, avatar: "ET" },
  { rank: 2, name: "Sarah Johnson", points: 2720, avatar: "SJ", isMe: true },
  { rank: 3, name: "Michael Chen", points: 2650, avatar: "MC" },
  { rank: 4, name: "Olivia Davis", points: 2580, avatar: "OD" },
  { rank: 5, name: "James Wilson", points: 2420, avatar: "JW" },
];

export const AchievementsBoard = () => {
  const earnedAchievements = achievements.filter(a => a.earned);
  
  return (
    <Card className="shadow-elegant border-border bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <Award className="h-5 w-5 text-primary" />
          <span>Achievements & Leaderboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Achievements Grid */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span>Your Achievements ({earnedAchievements.length}/{achievements.length})</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-md group ${
                    achievement.earned
                      ? `bg-gradient-section border-border shadow-sm`
                      : "bg-muted/30 border-border opacity-60"
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className={`inline-flex p-3 rounded-full transition-all duration-300 group-hover:shadow-glow ${
                      achievement.earned 
                        ? `bg-gradient-primary shadow-glow` 
                        : "bg-muted"
                    }`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{achievement.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {achievement.date}
                        </Badge>
                      ) : (
                        <div className="mt-2">
                          <div className="text-xs text-slate-500">
                            {achievement.progress}/{achievement.total}
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                            <div 
                              className={`bg-${achievement.color}-400 h-1 rounded-full`}
                              style={{ width: `${((achievement.progress || 0) / (achievement.total || 1)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Star className="h-4 w-4 text-purple-500" />
            <span>Weekly Leaderboard</span>
          </h3>
          <div className="space-y-2">
            {leaderboard.map((student) => (
              <div
                key={student.rank}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 hover:shadow-md ${
                  student.isMe
                    ? "bg-gradient-section border-border shadow-sm"
                    : "bg-card/30 border-border hover:bg-card/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    student.rank === 1 ? "bg-amber-400 text-white" :
                    student.rank === 2 ? "bg-slate-300 text-slate-700" :
                    student.rank === 3 ? "bg-amber-600 text-white" :
                    "bg-slate-200 text-slate-600"
                  }`}>
                    {student.rank}
                  </div>
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-white font-semibold text-xs">{student.avatar}</span>
                  </div>
                  <div>
                    <span className={`font-medium ${student.isMe ? "text-primary" : "text-foreground"}`}>
                      {student.name} {student.isMe && "(You)"}
                    </span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-muted-foreground">
                  {student.points.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};