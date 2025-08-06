import { Star, MapPin, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export interface TutorProfile {
  id: string;
  name: string;
  subject: string;
  gradeLevel: string;
  bio: string;
  rating: number;
  image: string;
  location: string;
  experience: number;
  isVerified?: boolean;
  languages?: string[];
  topics?: string[];
  linkedinUrl?: string;
}

interface TutorProfileCardProps {
  tutor: TutorProfile;
  className?: string;
  style?: React.CSSProperties;
}

const TutorProfileCard = ({ tutor, className = "", style }: TutorProfileCardProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/tutor/${tutor.id}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3.5 w-3.5 ${
          index < Math.floor(rating) 
            ? "text-yellow-400 fill-yellow-400" 
            : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  return (
    <Card
      className={`group cursor-pointer overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-border/50 bg-gradient-to-br from-card to-card/50 ${className}`}
      style={style}
      onClick={handleViewProfile}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar with Verified Badge */}
          <div className="relative">
            <Avatar className="w-20 h-20 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <AvatarImage src={tutor.image} alt={tutor.name} className="object-cover" />
              <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-primary-foreground">
                {tutor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {tutor.isVerified && (
              <Badge 
                variant="default" 
                className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-1"
              >
                ✓ Verified
              </Badge>
            )}
          </div>

          {/* Name and Subject */}
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {tutor.name}
            </h3>
            <p className="text-primary font-medium text-sm">{tutor.subject}</p>
            <p className="text-muted-foreground text-xs">{tutor.gradeLevel}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(tutor.rating)}
            </div>
            <span className="text-sm font-medium text-foreground">{tutor.rating}</span>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {tutor.bio}
          </p>

          {/* Location and Experience */}
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{tutor.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{tutor.experience}+ years</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorProfileCard;