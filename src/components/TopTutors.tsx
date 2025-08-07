import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TutorProfileCard, { TutorProfile } from "@/components/TutorProfileCard";
import Ahsan from "../assets/Top Tutors/Ahsan.jpg"
import bilal from "../assets/Top Tutors/bilal.jpg"
import Uzair from "../assets/Top Tutors/Uzair.jpg"

const TopTutors = () => {
  const { ref, isVisible } = useScrollAnimation();
  const tutors: TutorProfile[] = [
    {
      id: "1",
      name: "Bilal Shakil",
      subject: "Mathematics",
      gradeLevel: "O-Level / A-Level",
      bio: "He is the founder of TutorsPool, with over 8 years of experience teaching O Level Additional Mathematics. He holds a degree in Mechanical Engineering from NED University and is passionate about delivering quality education through personalized online tutoring.",
      rating: 4.9,
      image: bilal,
      location: "Karachi, Pakistan",
      experience: 8,
      // isVerified: true,
      languages: ["English", "Urdu"],
      topics: ["Algebra", "Calculus", "Physics", "Trigonometry"],
      linkedinUrl: "https://www.linkedin.com/in/bilal-shakil-622668287/"
    },
    {
      id: "2",
      name: "Uzair Syed",
      subject: "Computer Science",
      gradeLevel: "O-Level / A-Level",
      bio: "He is a Senior Tutor at TutorsPool with an MS in Computer Science. He specializes in O and A Level subjects, focusing on making complex concepts accessible and helping students achieve academic success.",
      rating: 4.8,
      image: Uzair,
      location: "Lahore, Pakistan",
      experience: 10,
      //isVerified: true,
      languages: ["English", "Mandarin"],
      topics: ["Organic Chemistry", "Biology", "Biochemistry"],
      linkedinUrl: "https://www.linkedin.com/in/uzairmsyed/"
    },
    {
      id: "3",
      name: "Ahsan Alam",
      subject: "English & Literature",
      gradeLevel: "IELTS / PTE / OET",
      bio: "He is a language expert at TutorsPool, specializing in IELTS, PTE, OET, and other English proficiency tests. He also teaches Business English, Public Speaking, and ESP, focusing on both exam success and practical communication skills",
      rating: 4.9,
      image: Ahsan,
      location: "Islamabad, Pakistan",
      experience: 6,
      // isVerified: true,
      languages: ["English"],
      topics: ["Literature", "Creative Writing", "Grammar", "Essay Writing"],
      linkedinUrl: "N/A"
    }
  ];


  return (
    <section ref={ref} className="py-20 bg-gradient-section">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Top Tutors
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from the best educators with proven track records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor, index) => (
            <TutorProfileCard
              key={tutor.id}
              tutor={tutor}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopTutors;


// import { useEffect, useState } from "react";
// import { useScrollAnimation } from "@/hooks/useScrollAnimation";
// import TutorProfileCard, { TutorProfile } from "@/components/TutorProfileCard";
// import { db } from "@/lib/firebase"; // ensure correct path
// import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const TopTutors = () => {
//   const { ref, isVisible } = useScrollAnimation();
//   const [tutors, setTutors] = useState<TutorProfile[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTopTutors = async () => {
//       try {
//         const q = query(
//           collection(db, "tutors"),
//           orderBy("rating", "desc"),
//           limit(3)
//         );
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         })) as TutorProfile[];
//         setTutors(data);
//       } catch (error) {
//         console.error("Error fetching tutors:", error);
//       }
//     };
//     fetchTopTutors();
//   }, []);

//   return (
//     <section ref={ref} className="py-20 bg-gradient-section">
//       <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
//             Our Top Tutors
//           </h2>
//           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
//             Learn from the best educators with proven track records
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {tutors.map((tutor, index) => (
//             <div
//               key={tutor.id}
//               onClick={() => navigate(`/tutor/${tutor.id}`)}
//               className="cursor-pointer animate-fade-in"
//               style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
//             >
//               <TutorProfileCard tutor={tutor} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopTutors;
