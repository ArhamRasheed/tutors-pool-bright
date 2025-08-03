import { Heart } from "lucide-react";

export const DashboardFooter = () => {
  return (
    <footer className="text-center py-8 border-t border-sky-100 mt-12">
      <div className="text-sm text-slate-500">
        <p>&copy; 2024 TutorsPool. All rights reserved.</p>
        <p className="flex items-center justify-center space-x-1 mt-2">
          <span>Built with</span>
          <Heart className="h-4 w-4 text-red-400 fill-current" />
          <span>by TutorsPool</span>
        </p>
      </div>
    </footer>
  );
};