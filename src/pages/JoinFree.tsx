import { useState } from "react";
import { User, Mail, Lock, BookOpen, GraduationCap, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";


const JoinFree = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student");
  
  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "Economics", "English Literature", "Computer Science", "History"
  ];

  const grades = [
    "O Level", "A Level", "Both O & A Level"
  ];

  return (
    <div className="min-h-screen bg-gradient-section py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Join TutorsPool</h1>
          <p className="text-lg text-muted-foreground">Start your learning journey today</p>
        </div>

        <Card className="shadow-elegant border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
            <CardDescription className="text-center">
              Choose how you want to use TutorsPool
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Type Selection */}
            <Tabs value={accountType} onValueChange={setAccountType} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="tutor" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Tutor
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="space-y-6 mt-6">
                <StudentForm 
                  showPassword={showPassword} 
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  subjects={subjects}
                  grades={grades}
                />
              </TabsContent>
              
              {/* <TabsContent value="tutor" className="space-y-6 mt-6">
                <TutorForm 
                  showPassword={showPassword} 
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  subjects={subjects}
                  grades={grades}
                />
              </TabsContent> */}
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const StudentForm = ({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, subjects, grades }: any) => {
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    subject: "",
    agreed: false
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.agreed) {
      alert("You must agree to Terms and Privacy Policy.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { success, error } = await submitUser(formData, "student");
    if (success) {
      alert("Student account created successfully.");
      // Optional: Redirect or clear form
    } else {
      alert("Failed to create account. " + error.message);
    }
  };


  const submitUser = async (data: any, userType: "student" | "tutor") => {
    try {
      const docRef = await addDoc(collection(db, userType + "s"), {
        ...data,
        createdAt: serverTimestamp(),
        role: userType,
      });
      return { success: true, id: docRef.id };
      } 
    catch (error) {
      console.error("Error submitting user:", error);
      return { success: false, error };
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="firstName" placeholder="First name" className="pl-10"  value={formData.firstName}
                onChange={e => handleChange("firstName", e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Last name"  value={formData.lastName}
                onChange={e => handleChange("lastName", e.target.value)}/>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" placeholder="your@email.com" className="pl-10" value={formData.email}
            onChange={e => handleChange("email", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={e => handleChange("password", e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={e => handleChange("confirmPassword", e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="grade">Current Grade Level</Label>
        <Select onValueChange={value => handleChange("grade", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your grade level" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade.toLowerCase()}>{grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjects">Subjects of Interest</Label>
        <Select onValueChange={value => handleChange("subject", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select subjects you want to learn" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject: string) => (
              <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
        id="terms" 
        checked={formData.agreed} 
        onCheckedChange={(checked) => handleChange("agreed", checked === true)} 
        />
        <label htmlFor="terms"
          className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
        I agree to the{" "}
        <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}and{" "}
        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>


      <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit}>
        Create Student Account
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button variant="outline" size="lg" className="w-full">
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </Button>
    </>
  );
};

/*const TutorForm = ({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, subjects, grades }: any) => {
  return (
    <>
      <div className="bg-accent/50 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-accent-foreground mb-2">Tutor Application</h3>
        <p className="text-sm text-muted-foreground">
          As a tutor, your profile will be reviewed before approval. Please provide accurate information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="firstName" placeholder="First name" className="pl-10" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Last name" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" placeholder="your@email.com" className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualification">Highest Qualification</Label>
        <Input id="qualification" placeholder="e.g. Masters in Mathematics" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Teaching Experience (Years)</Label>
        <Input id="experience" type="number" placeholder="e.g. 5" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialization">Subject Specialization</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your main subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject: string) => (
              <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gradeLevel">Grade Level Preference</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select grade levels you teach" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade.toLowerCase()}>{grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </label>
      </div>

      <Button variant="hero" size="lg" className="w-full">
        Submit Tutor Application
      </Button>
    </>
  );
};*/
export default JoinFree;