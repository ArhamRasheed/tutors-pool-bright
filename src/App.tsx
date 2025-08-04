import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index.tsx";
import EnhancedIndex from "./pages/EnhancedIndex.tsx";
import Login from "./pages/Login.tsx";
import JoinFree from "./pages/JoinFree.tsx";
import StudentProfile from "./pages/Student/StudentProfile.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import TutorProfile from "./pages/Tutor/TutorProfile.tsx";
import TutorProfile_pov from "./pages/Student/TutorProfile_pov.tsx"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner  position="top-right" richColors={true} closeButton theme="light"/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnhancedIndex />} />
            <Route path="/original" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<JoinFree />} />
            <Route path="/student/:uid" element={<StudentProfile />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/tutor/tutorid" element={<TutorProfile_pov />} />
            <Route path="/tutor" element={<TutorProfile />} />
            <Route path="*" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;