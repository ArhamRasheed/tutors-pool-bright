import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TutorDashboard from "./pages/Tutor/TutorDashboard.tsx";  
import TutorProfile from "./pages/Tutor/TutorProfile.tsx";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index.tsx";
import EnhancedIndex from "./pages/EnhancedIndex.tsx";
import Login from "./pages/Login.tsx";
import JoinFree from "./pages/JoinFree.tsx";
<<<<<<< HEAD
=======
import StudentProfile from "./pages/StudentProfile.tsx";
import StudentDashboard from "./pages/StudentDashboard.tsx";
import TutorProfile from "./pages/TutorProfile.tsx";

import NotFound from "./pages/NotFound.tsx";
import StudentProfile from "./pages/Student/StudentProfile.tsx";
import StudentDashboard from "./pages/Student/StudentDashboard.tsx";
import Flashcards from "./pages/Flashcards.tsx";
import Chat from "./pages/Chat.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    // <ThemeProvider>
    //   <TooltipProvider>
    //     <Toaster /> 
    //     <Sonner />
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/" element={<Index />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path=  "/join" element={<JoinFree />} />
    //         <Route path="/student" element={<StudentProfile />} />
    //         <Route path="/student/dashboard" element={<StudentDashboard />} />
    //         <Route path="/flashcards" element={<Flashcards />} />
    //         <Route path="/chats" element={<Chat />} />
    //         {/* <Route path="/tutor-profile" element={<TutorProfile/> */}
    //         {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </BrowserRouter>
    //   </TooltipProvider>
    // </ThemeProvider>

    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EnhancedIndex />} />
          <Route path="/original" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<JoinFree />} />
          <Route path="/student" element={<StudentProfile />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/tutor/:tutorId" element={<TutorProfile />} />
          <Route path="/tutorprofile" element={<TutorProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>

  </QueryClientProvider>
);

export default App; 