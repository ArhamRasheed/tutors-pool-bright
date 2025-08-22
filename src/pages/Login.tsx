import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, Info, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { auth, provider, db } from "../lib/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";
import { ToastError } from "./JoinFree.js";
import { useAuth } from "@/contexts/AuthContext.js";
import '../styles/Login.module.css';// Import your custom styles
import styles from '../styles/Login.module.css';
import { set } from "date-fns";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [forgot_password, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const { profile, loading: auth_loading, isAuthenticated, isStudent, isTutor } = useAuth();

  useEffect(() => {
    if (!auth_loading && isAuthenticated) {
      if (isStudent) {
        navigate(`/student/${profile?.data.uid}`);
      }
      else if (isTutor) {
        navigate(`/tutor/${profile?.data.uid}`);
      }

    }
  }, [profile, auth_loading, navigate]);
  const [loginType, setLoginType] = useState("student");
  const [accountNotFound, setAccountNotFound] = useState(false);
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //console.log(user)
      const userRef = doc(db, `${loginType}s`, user.uid); // user document
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.custom((t) => (
          <ToastError t={t} title={`Existing Account NOT Found`} message={`Please sign up.`} />
        ), { duration: 3000 });
        navigate("/join")
        setAccountNotFound(true);
        return false;
      }

      // console.log("Signed in user:", user);
      // Optionally redirect to /dashboard
      navigate(`/${loginType}/${user.uid}`);
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
    }
    finally {
      return true;
    }
  };
  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      toast.custom((t) => (
        <ToastError t={t} title="Missing Credentials" message="Please enter your Email and Password." />
      ), { duration: 3000 });
      return false;
    }

    try {
      // const user_email_query = query(collection(db, `${loginType}s`), where("email", "==", email));
      // const user_snap = await getDocs(user_email_query);
      // if (user_snap.empty) {
      //   toast.custom((t) => (
      //     <ToastError t={t} title="Account Not Found" message="Your account does not exist in our system. Please sign up." />
      //   ), { duration: 3000 });
      //   setAccountNotFound(true);
      //   return false;
      // }
      // console.log("User found:", user_snap.docs[0].data());
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userRef = doc(db, `${loginType}s`, user.uid); // user document
      const userSnap = await getDoc(userRef);


      navigate(`/${loginType}/${userSnap.data().uid}`);
      return true;


    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.custom((t) => (
        <ToastError t={t} title="Invalid Credentials" message="Email or password is incorrect." />
      ), { duration: 3000 });


      return false;
    }
  };
  const handlePassReset = async () => {
    if (!email) {
      toast.custom((t) => (
        <ToastError t={t} title="Missing Email" message="Please enter your registered Email." />
      ), { duration: 3000 });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully. Please check your inbox including spam folder.");
      setForgotPassword(false);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.custom((t) => (
        <ToastError t={t} title="Error" message="Failed to send password reset email." />
      ), { duration: 3000 });
    }
  };
  if (auth_loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
  return (
    <>
      {accountNotFound && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm text-center space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">Join Free!</h2>
            <p className="text-sm text-gray-600">
              You will be redirected to the registration page to create a new account.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => navigate("/join")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Join Now
              </button>
              <button
                onClick={() => setAccountNotFound(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}
      {forgot_password && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Modal Container */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <button
              onClick={() => setForgotPassword(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
              <X className="h-10 w-10 text-red-500 hover:opacity-40" />
            </button>
            {/* Disclaimer */}
            <p className="flex items-start text-sm text-gray-600 mb-4 font-bold">
              <Info className="h-10 w-10 text-red-500 mt-0.5 mr-2" />
              Enter your registered Email. You will receive a Password reset link if the Email is associated with an Account.
            </p>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="font-lato bg-gray-100 pl-10 outline-none focus:ring-0  text-blue-800"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              ></Input>
              <Button type="button" variant="ghost" size="icon" className="w-full mt-4 border border-rounded-lg bg-cyan-300 font-lato hover:bg-red-500" onClick={handlePassReset}>Proceed with the given Email
              </Button>
            </div>

          </div>
        </div>
      )}

      <div className={`min-h-screen flex items-center justify-center p-4 ${styles["div"]}`}>
        <div className="w-full max-w-md">
          {/* <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
          </div> */}

          <Card className={`shadow-elegant border-border/50 backdrop-blur-sm ${styles["glass"]}`}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white font-poppins"><strong>Welcome Back</strong> - Sign In</CardTitle>
              <CardDescription className="text-center font-chela text-lg text-white">
                Choose your account type to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Type Toggle */}
              <Tabs value={loginType} onValueChange={setLoginType} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student" className={`font-lato text-2x1 tracking-wider font-bold`}>Student</TabsTrigger>
                  <TabsTrigger value="tutor" className={`font-lato text-2x1 tracking-wider font-bold`}>Tutor</TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4 mt-6">
                  <LoginForm
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    handleLogin={handleLogin}
                    handleGoogleLogin={handleGoogleLogin}
                    loginType={loginType}
                    setAccountNotFound={setAccountNotFound}
                    setForgotPassword={setForgotPassword}
                  />
                </TabsContent>

                <TabsContent value="tutor" className={`space-y-4 mt-6`}>
                  <LoginForm showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    handleLogin={handleLogin}
                    handleGoogleLogin={handleGoogleLogin}
                    loginType={loginType}
                    setAccountNotFound={setAccountNotFound}
                    setForgotPassword={setForgotPassword}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

const LoginForm = ({ showPassword, setShowPassword, handleGoogleLogin, handleLogin, loginType, setAccountNotFound, setForgotPassword }: {
  showPassword: boolean;
  handleGoogleLogin: () => Promise<boolean>;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  setShowPassword: (show: boolean) => void;
  loginType: string
  setAccountNotFound: (value: boolean) => void;
  setForgotPassword: (value: boolean) => void;

}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email" className={`font-poppins tracking-wide ${styles["login-label"]}`}>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="font-lato bg-gray-100 pl-10 outline-none focus:ring-0  text-blue-800"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className={`font-poppins ${styles["login-label"]}`}>Password</Label>
          <a onClick={
            () => {
              setForgotPassword(true);
              console.log("Forgot password clicked");
            }

          } className="text-sm text-white hover:underline hover:text-primary">
            Forgot password?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="font-lato bg-gray-100 pl-10 outline-none focus:ring-0  text-blue-800 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between mt-4">
        <Button
          variant="hero"
          size="lg"
          className={`w-full font-poppins ${styles["sign-in"]} tracking-wide`}
          onClick={() => {
            setAccountNotFound(true);
          }}>
          Register
        </Button>
        <Button
          variant="hero"
          size="lg"
          className={`w-full font-poppins ${styles["button2"]}`}
          onClick={() => {
            handleLogin(email, password)
          }}>
          Sign In
        </Button>
      </div>
      <>
        <button
          className={`
                ${styles["fancy"]} 
                w-full 
                transition-opacity
                ${loginType === "student" ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
          onClick={() => {
            console.log("Google button clicked");
            handleGoogleLogin();
          }}
        >
          <span className={styles["top-key"]}></span>

          <span className={styles["text"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.7 1.22 9.19 3.6l6.83-6.83C35.9 2.9 30.47.5 24 .5 14.82.5 6.93 6.35 3.69 14.09l7.98 6.2C13.48 13.94 18.3 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.57-.14-3.08-.39-4.5H24v9h12.7c-.55 2.9-2.17 5.37-4.63 7.03l7.14 5.54C43.96 37.85 46.5 31.61 46.5 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M11.67 28.29c-.68-2.02-1.07-4.18-1.07-6.29s.39-4.27 1.07-6.29l-7.98-6.2C1.86 13.48.5 18.55.5 24s1.36 10.52 3.69 14.49l7.98-6.2z"
              />
              <path
                fill="#34A853"
                d="M24 47.5c6.47 0 11.9-2.13 15.87-5.8l-7.14-5.54c-2.04 1.38-4.65 2.21-8.73 2.21-5.7 0-10.52-4.44-12.33-10.39l-7.98 6.2C6.93 41.65 14.82 47.5 24 47.5z"
              />
            </svg>
            Sign in with Google
          </span>

          <span className={styles["bottom-key-1"]}></span>
          <span className={styles["bottom-key-2"]}></span>
        </button>




        {/* <Button
            variant="outline"
            size="lg"
            className="w-full fancy"
            onClick={() => {
              console.log("Google button clicked");
              handleGoogleLogin();
            }}>
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text">Sign in with Google</span>
          </Button> */}
      </>
    </>
  );
};

export default Login;