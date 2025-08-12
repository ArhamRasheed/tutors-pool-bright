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
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "sonner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { XCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { CountryStateCitySelector } from "@/components/CountryStateCitySelector";
import { error } from "console";
import { boolean, number } from "zod";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { userInfo } from "os";



const JoinFree = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student");

  // const location = useLocation();
  // const message = location.state?.message;
  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "Additional Mathematics",
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

              {<TabsContent value="tutor" className="space-y-6 mt-6">
                <TutorForm
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  setShowConfirmPassword={setShowConfirmPassword}
                  courses={subjects}
                  grades={grades}
                />
              </TabsContent>}
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
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [instituteType, setInstituteType] = useState(""); // "School" or "College"
  const handleSubjectToggle = (subject: string, isChecked: boolean) => {
    const updatedSubjects = isChecked
      ? [...selectedSubjects, subject]
      : selectedSubjects.filter((s) => s !== subject);

    // Update UI state
    setSelectedSubjects(updatedSubjects);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      subject: updatedSubjects,
    }));
  };
  const requiredFields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
    { key: "confirmPassword", label: "Confirm Password" },
    { key: "subject", label: "subject(s)" },
    { key: "instituteType", label: "Institute Type" },
    { key: "instituteName", label: "Institute Name" },
    { key: "country", label: "Country" },
    { key: "city", label: "City" },
    { key: "state", label: "State" }
  ];


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    subject: [],
    agreed: false,
    instituteType: "",
    instituteName: "",
    country: "",
    state: "",
    city: ""
  });
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    for (const { key, label } of requiredFields) {
      if (!formData[key]) {
        toast.custom((t) => (
          <ToastError t={t} title={`Missing ${label}`} message={`Please enter ${label}.`} />
        ), { duration: 3000 });
        return;
      }
    }
    if (!formData.agreed) {
      alert("You must agree to Terms and Privacy Policy.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      toast.custom((t) => (
        <ToastError t={t} title="Incorrect Password" message="Please choose longer password" />
      ), { duration: 3000 });
      return;
    }

    const { success, error, id } = await submitUser(formData, "student");
    if (success) {
      alert("Student account created successfully.");
      // Optional: Redirect or clear form
      if (id) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        navigate(`/student/${id}`);
      }
      else {
        console.log("Id not found!");
      }
    } else {
      alert("Failed to create account. " + error.message);
    }
  };

  const handleSignUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "students", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        toast.custom((t) => (
          <ToastError t={t} title={`Existing Account Found`} message={`Please Log in.`} />
        ), { duration: 3000 });
        return;
      }

      // First-time signup — create Firestore doc
      const [firstName, ...rest] = (user.displayName || "").split(" ");
      const lastName = rest.join(" ");

      await setDoc(userDocRef, {
        uid: user.uid,
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        grade: "",
        subject: [],
        agreed: true,
        instituteType: "",
        instituteName: "",
        country: "",
        state: "",
        city: "",
        role: "student",
        createdAt: serverTimestamp(),
        streak: 0
      });
      navigate(`/student/${user.uid}`);
    }
    catch (error) {
      console.error("Google sign-in error:", error);
      alert("Failed to sign in with Google. " + error.message);
    }
  };

  const submitUser = async (data: any, userType: "student" | "tutor") => {

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const docRef = await setDoc(doc(db, userType + "s", user.uid), {
        ...data,
        createdAt: serverTimestamp(),
        role: userType,
        uid: user.uid,
        streak: 0,
      });
      return { success: true, error: false, id: user.uid };
    }
    catch (error) {
      console.error("Error submitting user:", error);
      return { success: false, error, id: null };
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input id="firstName" placeholder="First name" className="pl-10" value={formData.firstName}
              onChange={e => handleChange("firstName", e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Last name" value={formData.lastName}
            onChange={e => handleChange("lastName", e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" placeholder="your@email.com" className="pl-10" value={formData.email}
            onChange={e => handleChange("email", e.target.value)} required />
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
            {grades.map((grade: string) => (
              <SelectItem key={grade} value={grade.toLocaleUpperCase()}>{grade}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {/* Step 1: Select School or College */}
        <div className="space-y-2">
          <Label htmlFor="institute-type">Select Institute Type</Label>
          <Select onValueChange={(value) => {
            setInstituteType(value);
            handleChange("instituteType", value);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Select School or College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="School">School</SelectItem>
              <SelectItem value="College">College</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Step 2: Input for School/College Name */}
        {instituteType && (
          <div className="space-y-2">
            <Label htmlFor="institute-name">
              {instituteType} Name
            </Label>
            <Input
              id="institute-name"
              type="text"
              placeholder={`Enter your ${instituteType.toLowerCase()} name`}
              onChange={(e) => handleChange("instituteName", e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjects">Subjects of Interest</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between text-black"
            >
              {selectedSubjects.length > 0
                ? selectedSubjects.join(', ')
                : "Select subjects you want to learn"}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-[--radix-popover-trigger-width] max-h-64 overflow-y-auto p-2 space-y-1"
            align="start"
          >
            {subjects.map((subject) => {
              const id = `subject-${subject}`;
              const isChecked = selectedSubjects.includes(subject);
              return (
                <div
                  key={id}
                  className={`flex items-center border rounded-md px-3 py-2 cursor-pointer transition-colors ${isChecked
                    ? "bg-muted border-primary"
                    : "hover:bg-accent"
                    }`}
                  onClick={() => handleSubjectToggle(subject, !isChecked)}
                >
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={() => { }}
                    className="mr-2 pointer-events-none"
                  />
                  <label
                    htmlFor={id}
                    className={`text-sm font-medium leading-none ${isChecked ? "!text-black-600" : "text-black"
                      }`}
                  >
                    {subject}
                  </label>
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
      </div>

      <CountryStateCitySelector formData={formData} setFormData={setFormData} />


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

      <Button variant="outline" size="lg" className="w-full" onClick={handleSignUpWithGoogle}>
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </Button>
    </>
  );
};

const TutorForm = ({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, courses, grades }: any) => {

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  //const [achievements, setAcievements] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    experience: undefined as number,
    grade: "",
    agreed: false,
    courses: [],
    country: "",
    state: "",
    city: "",
    zipCode: "",
    achievements: [],
    hasAchievement: false
  });

  const navigate = useNavigate();

  const handleAchievementChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      achievements: [value]
    }));
  }
  const handleCoursesToggle = (course: string, isChecked: boolean) => {
    const updatedCourses = isChecked
      ? [...selectedCourses, course]
      : selectedCourses.filter((s) => s !== course);

    // Update UI state
    setSelectedCourses(updatedCourses);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      courses: updatedCourses,
    }));
  };

  const handleChange = (field: string, value: any) => {
    if (field === "experience") {
      const numericValue = Number(value);
      if (numericValue > 50) { value = parseInt(String(numericValue)[0]) }

    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.agreed) {
      alert("You must agree to Terms and Privacy Policy.");
      return;
    }

    const requiredFields = [
      { key: "firstName", label: "First Name" },
      { key: "lastName", label: "Last Name" },
      { key: "email", label: "Email" },
      { key: "password", label: "Password" },
      { key: "confirmPassword", label: "Confirm Password" },
      { key: "qualification", label: "Qualification" },
      { key: "experience", label: "Teaching Experience" },
      { key: "courses", label: "courses" },
      { key: "grade", label: "Grade Level Preference" }
    ];

    for (const { key, label } of requiredFields) {
      if (!formData[key]) {
        toast.custom((t) => (
          <ToastError t={t} title={`Missing ${label}`} message={`Please enter ${label}.`} />
        ), { duration: 3000 });
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      toast.custom((t) => (
        <ToastError t={t} title="Passwords do not match" message="Please make sure both passwords are the same." />
      ), { duration: 3000 });
      return;
    }

    if (formData.password.length < 8) {
      toast.custom((t) => (
        <ToastError t={t} title="Weak Password" message="Password must be at least 8 characters." />
      ), { duration: 3000 });
      return;
    }

    const { success, error, id } = await submitUser(formData, "tutor");
    if (success) {
      alert("Tutor application submitted successfully.");
      if (id) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        navigate(`/tutor/${id}/view`);
      }
    } else {
      alert("Failed to submit tutor application. " + error.message);
    }
  };
  const submitUser = async (data: any, userType: "student" | "tutor") => {

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const docRef = await setDoc(doc(db, userType + "s", user.uid), {
        ...data,
        createdAt: serverTimestamp(),
        role: userType,
        uid: user.uid,
        status: "pending",
        responseTime: 0,
        bio: `This is ${data.firstName} ${data.lastName}, Achieved Exellence in ${data.courses.join(', ')}.`,
        sessionPrice: 0,
        rating: 0,
        totalReviews: 0,
        availability: 'Available'

      });
      return { success: true, error: false, id: user.uid };
    }
    catch (error) {
      console.error("Error submitting user:", error);
      return { success: false, error, id: null };
    }
  };


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
            <Input id="firstName" placeholder="First name" className="pl-10"
              value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Last name"
            value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="email" type="email" placeholder="your@email.com" className="pl-10"
            value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
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
              value={formData.password} onChange={(e) => handleChange("password", e.target.value)}
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
              value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)}
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
        <Input id="qualification" placeholder="e.g. Masters in Mathematics"
          value={formData.qualification} onChange={(e) => handleChange("qualification", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Teaching Experience (Years)</Label>
        <Input id="experience" type="number" placeholder="e.g. 5" min={0} max={50}
          value={formData.experience} onChange={(e) => handleChange("experience", e.target.value)} />
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="specialization">Subject Specialization</Label>
        <Select onValueChange={value => handleChange("specialization", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your main subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject: string) => (
              <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <div className="space-y-2">
        <Label htmlFor="courses">Courses</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between text-black"
            >
              {selectedCourses.length > 0
                ? selectedCourses.join(', ')
                : "Please select at least one course you teach"}
            </Button>
          </PopoverTrigger>


          <PopoverContent
            className="w-[--radix-popover-trigger-width] max-h-64 overflow-y-auto p-2 space-y-1"
            align="start"
          >
            {courses.map((course) => {
              const id = `course-${course}`;
              const isChecked = selectedCourses.includes(course);
              return (
                <div
                  key={id}
                  className={`flex items-center border rounded-md px-3 py-2 cursor-pointer transition-colors ${isChecked
                    ? "bg-muted border-primary"
                    : "hover:bg-accent"
                    }`}
                  onClick={() => handleCoursesToggle(course, !isChecked)}
                >
                  <Checkbox
                    id={id}
                    checked={isChecked}
                    onCheckedChange={() => { }}
                    className="mr-2 pointer-events-none"
                  />
                  <label
                    htmlFor={id}
                    className={`text-sm font-medium leading-none ${isChecked ? "!text-black-600" : "text-black"
                      }`}
                  >
                    {course}
                  </label>
                </div>
              );
            })}
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gradeLevel">Grade Level Preference</Label>
        <Select onValueChange={value => handleChange("grade", value)}>
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
      <div className="space-y-2">
        <Label htmlFor="hasAchievement">Any Notable Achievement?</Label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasAchievement"
              value="yes"
              checked={formData.hasAchievement === true}
              onChange={() => handleChange("hasAchievement", true)}
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="hasAchievement"
              value="no"
              checked={formData.hasAchievement === false}
              onChange={() => handleChange("hasAchievement", false)}
            />
            No
          </label>
        </div>

        {formData.hasAchievement === true && (
          <>
            <Input
              id="achievement"
              type="text"
              placeholder="e.g. Won National Science Olympiad"
              value={formData.achievements[0] || ""}
              onChange={(e) => handleAchievementChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              You can add more in the dashboard section later.
            </p>
          </>
        )}
      </div>

      <CountryStateCitySelector formData={formData} setFormData={setFormData} />

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={formData.agreed} onCheckedChange={(checked) => handleChange("agreed", checked)} />
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

      <Button variant="hero" size="lg" className="w-full" onClick={handleSubmit}>
        Submit Tutor Application
      </Button>
    </>
  );
};
const ToastError = ({ t, title, message }) => (
  <div
    className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-start justify-between gap-4 w-full max-w-sm font-medium font-sans"
    onClick={() => toast.dismiss(t)}
  >
    <div className="flex items-start gap-3">
      {/* <svg className="w-7 h-7 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />
      </svg> */}
      <XCircle size={32} strokeWidth={2.5} className="text-white/80 hover:text-white cursor-pointer transition" onClick={() => toast.dismiss(t)} />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{message}</p>
        <div className="mt-2 h-1 w-full bg-white/30 rounded overflow-hidden">
          <div className="h-full bg-white animate-[toastProgress_3s_linear_forwards]" />
        </div>
      </div>
    </div>

    {/* <XCircle color="red" size={24} onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-100"/> */}
    {/* <button onClick={() => toast.dismiss(t)} className="text-white hover:text-gray-100">✕</button> */}
  </div>
);

export { JoinFree, ToastError };