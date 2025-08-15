// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const menuItems = [
//     { name: "Home", href: "#home" },
//     { name: "About", href: "#about" },
//     { name: "Courses", href: "#courses" },
//     { name: "Pages", href: "#pages" },
//     { name: "Contact Us", href: "#contact" }
//   ];

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
//       ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-elegant h-16"
//       : "bg-transparent h-20"
//       }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-full">
//           {/* Logo */}
//           <div className="flex-shrink-0 ">
//             <Link to="/" className="text-3xl font-bold text-white hover:text-white/90 transition-colors drop-shadow-sm">
//               TutorsPool
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-8">
//               {menuItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-xl text-blue-1000 text-foreground hover:text-primary transition-colors duration-300 font-medium"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Desktop Buttons */}
//           <div className="hidden md:flex items-center space-x-4 ">
//             <Link to="/login">
//               <Button variant="ghost" size="sm" className="text-12px text-gray/20 space-y-3">
//                 Log In
//               </Button>
//             </Link>
//             <Link to="/join">
//               <Button variant="hero" size="sm" className="space-y-4">
//                 Join for Free
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
//           <div className="px-2 pt-2 pb-3 space-y-2  sm:px-3">
//             {menuItems.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-300 font-medium"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.name}
//               </a>
//             ))}
//             <div className="flex flex-col space-y-2 px-3 pt-4">
//               <Link to="/login">
//                 <Button variant="outline" size="sm" className="w-full">
//                   Log In
//                 </Button>
//               </Link>
//               <Link to="/join">
//                 <Button variant="hero" size="sm" className="w-full">
//                   Join for Free
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { firebaseUser, profile, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Courses", href: "#courses" },
    { name: "Pages", href: "#pages" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed 
        top-1 left-0 right-0 z-50 
        transition-all duration-300 backdrop-blur-md mx-20 
        rounded-tr-[20px] rounded-bl-[20px]
 ${isScrolled
          ? "bg-background/70 border-b border-border shadow-md"
          : "bg-background/40"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-bold text-white drop-shadow-md"
            >
              TutorsPool
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 font-lato">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-[15px] font-medium text-black rounded-md 
                 transition duration-300 ease-in-out 
                 hover:bg-black hover:text-white hover:shadow-md 
                 backdrop-blur-sm focus:outline-none "
              >
                {item.name}
              </a>
            ))}
          </div>



          {/* Desktop Buttons */}
          <div className="flex items-center gap-4">
            {!firebaseUser ? (
              <>
                <Link
                  to="/login"
                  className="glow-button relative inline-block  rounded-lg px-4 py-2 font-montaga text-white bg-blue-900 overflow-hidden"
                >
                  Log In
                </Link>
                <style>{`
        .glow-button {
          position: relative;
          z-index: 0;
          border-radius: 10px;
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width:fit-content;
        }

        .glow-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          border-radius: 10px;
          background: linear-gradient(45deg, #3b82f6, #60a5fa, #1e40af, #3b82f6);
          background-size: 400%;
          filter: blur(5px);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          animation: glowing 10s linear infinite;
        }

        .glow-button:hover::before {
          opacity: 1;
        }

        @keyframes glowing {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>

                <Link to="/join" className="bg-primary  px-4 py-2 rounded-lg font-montaga join-button">
                  <span className="text-[13px] text-black">Join for Free</span>
                </Link>
                <style >{`.join-button {
    position: relative;
    display: inline-block;
    padding: 4 2;
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    background: rgba(255, 255, 255, 0.1); /* translucent glass effect */
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    backdrop-filter: blur(10px); /* glass blur effect */
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4),
                0 0 20px rgba(0, 255, 255, 0.2),
                0 0 40px rgba(0, 255, 255, 0.1);
}

.join-button::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, #00fff0, #00bfff, #aeff00ff, #ff0055);
    animation: rotate 4s linear infinite;
    z-index: 0;
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.join-button span {
    position: relative;
    z-index: 1;
}

.join-button:hover {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.6),
                0 0 40px rgba(0, 255, 255, 0.4),
                0 0 80px rgba(0, 255, 255, 0.2);
    transform: scale(1.05);
}
`}</style>
              </>
            ) : (
              <>
                {profile?.role === "student" && (
                  <Link to={`/student/${firebaseUser.uid}`} className="text-primary">Student Dashboard</Link>
                )}
                {profile?.role === "tutor" && (
                  <Link to={`/tutor/${firebaseUser.uid}`} className="text-primary">Tutor Dashboard</Link>
                )}
                {profile?.role === "admin" && (
                  <Link to="/admin" className="text-primary">Admin Panel</Link>
                )}
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/80 backdrop-blur-lg border-t border-border">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full text-white">
                  Log In
                </Button>
              </Link>
              <Link to="/join">
                <Button variant="default" className="w-full bg-primary text-white hover:bg-primary/90">
                  Join for Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
