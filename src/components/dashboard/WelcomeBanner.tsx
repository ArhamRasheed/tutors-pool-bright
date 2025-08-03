import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, TrendingUp, Clock } from "lucide-react";

export const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-hero border-0 shadow-glow hover:shadow-elegant transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-white">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Welcome back, Sarah! 🌟
            </h1>
            <p className="text-white/90 text-lg mb-4">
              Ready to continue your learning journey? You're doing amazing!
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300">
                <TrendingUp className="h-4 w-4 mr-1" />
                85% Average Grade
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300">
                <Clock className="h-4 w-4 mr-1" />
                12 Hours This Week
              </Badge>
            </div>
          </div>
          
          <div className="text-center lg:text-right animate-float">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-3 animate-glow">
              <Flame className="h-10 w-10 text-orange-300" />
            </div>
            <div className="text-3xl font-bold">12</div>
            <div className="text-sky-100">Day Streak</div>
            <p className="text-sm text-white/80 mt-1">Keep it up!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};