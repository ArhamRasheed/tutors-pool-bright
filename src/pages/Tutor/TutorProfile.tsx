import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Edit, Save, X, Camera, User, BookOpen, GraduationCap, Calendar, Award, ShieldCheck, Plus, Trash2, Book } from 'lucide-react';
import myimage from '../../assets/images.jpg';

// Validation schema
const tutorProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(500, 'Bio must not exceed 500 characters'),
  subjectsTaught: z.array(z.string()).min(1, 'Please select at least one subject'),
  coursesTaught: z.array(z.string()).optional(),
  gradeLevel: z.enum(['O-Level', 'A-Level'], { message: 'Please select a grade level' }),
  qualifications: z.string().min(10, 'Please provide your qualifications'),
  certifications: z.array(z.string()).optional(),
  yearsExperience: z.number().min(0, 'Years of experience must be a positive number').max(50, 'Please enter a valid number'),
  availability: z.string().optional(),
});

type TutorProfileFormData = z.infer<typeof tutorProfileSchema>;

interface TutorProfileProps {
  initialData?: Partial<TutorProfileFormData>;
  onSave?: (data: TutorProfileFormData) => Promise<void>;
  isLoading?: boolean;
}

export const TutorProfile: React.FC<TutorProfileProps> = ({
  initialData = {},
  onSave,
  isLoading = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(myimage);
  const [newCertification, setNewCertification] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const { toast } = useToast();

  const form = useForm<TutorProfileFormData>({
    resolver: zodResolver(tutorProfileSchema),
    defaultValues: {
      fullName: initialData.fullName || '',
      email: initialData.email || '',
      bio: initialData.bio || '',
      subjectsTaught: initialData.subjectsTaught || [],
      coursesTaught: initialData.coursesTaught || [],
      gradeLevel: initialData.gradeLevel || undefined,
      qualifications: initialData.qualifications || '',
      certifications: initialData.certifications || [],
      yearsExperience: initialData.yearsExperience || 0,
      availability: initialData.availability || '',
    },
  });

  // Calculate profile completion percentage
  const calculateCompletionPercentage = (): number => {
    const formValues = form.getValues();
    const requiredFields = ['fullName', 'email', 'bio', 'gradeLevel', 'qualifications'];
    const completedFields = requiredFields.filter(field => {
      const value = formValues[field as keyof TutorProfileFormData];
      return value && value.toString().trim() !== '';
    });
    
    const hasSubjects = formValues.subjectsTaught && formValues.subjectsTaught.length > 0;
    const hasExperience = formValues.yearsExperience > 0;
    const hasCertifications = formValues.certifications && formValues.certifications.length > 0;
    
    const totalFields = requiredFields.length + 3; // +3 for subjects, experience, and certifications
    const completedCount = completedFields.length + (hasSubjects ? 1 : 0) + (hasExperience ? 1 : 0) + (hasCertifications ? 1 : 0);
    
    return Math.round((completedCount / totalFields) * 100);
  };

  const completionPercentage = calculateCompletionPercentage();

  const handleSave = async (data: TutorProfileFormData) => {
    try {
      if (onSave) {
        await onSave(data);
      }
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper functions for managing certifications
  const addCertification = () => {
    if (newCertification.trim()) {
      const currentCertifications = form.getValues('certifications') || [];
      form.setValue('certifications', [...currentCertifications, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const removeCertification = (indexToRemove: number) => {
    const currentCertifications = form.getValues('certifications') || [];
    form.setValue('certifications', currentCertifications.filter((_, index) => index !== indexToRemove));
  };

  // Helper functions for managing courses
  const addCourse = () => {
    if (newCourse.trim()) {
      const currentCourses = form.getValues('coursesTaught') || [];
      form.setValue('coursesTaught', [...currentCourses, newCourse.trim()]);
      setNewCourse('');
    }
  };

  const removeCourse = (indexToRemove: number) => {
    const currentCourses = form.getValues('coursesTaught') || [];
    form.setValue('coursesTaught', currentCourses.filter((_, index) => index !== indexToRemove));
  };

  const availableSubjects = [
    'Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Economics', 'Computer Science', 'Art', 'Music'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Completion Card */}
      <Card className="bg-gradient-soft border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Profile Completion</h3>
              <p className="text-sm text-muted-foreground">Complete your profile to attract more students</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
          {/* Main Profile Card */}
          <Card className="shadow-card border-0 bg-gradient-card">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <User className="h-6 w-6 text-primary" />
                    Tutor Profile
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Manage your professional tutoring profile
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button 
                    type="button"
                    variant="default" 
                    onClick={() => setIsEditing(true)}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      variant="default"
                      disabled={isLoading}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCancel}
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-soft">
                    <AvatarImage src={profileImage} alt="Profile picture" />
                    <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                      {form.getValues('fullName')?.charAt(0)?.toUpperCase() || 'T'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full cursor-pointer shadow-button hover:scale-110 transition-spring">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-foreground">
                    {form.getValues('fullName') || 'Your Name'}
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    {form.getValues('gradeLevel') ? `${form.getValues('gradeLevel')} Tutor` : 'Professional Tutor'}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {form.getValues('subjectsTaught')?.map((subject) => (
                      <Badge key={subject} variant="secondary" className="bg-gradient-soft">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input {...field} placeholder="Enter your full name" className="border-border/50 focus:border-primary" />
                        ) : (
                          <div className="p-3 bg-muted/30 rounded-lg border">
                            {field.value || 'Not provided'}
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input {...field} type="email" placeholder="Enter your email" className="border-border/50 focus:border-primary" />
                        ) : (
                          <div className="p-3 bg-muted/30 rounded-lg border">
                            {field.value || 'Not provided'}
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Grade Level */}
                <FormField
                  control={form.control}
                  name="gradeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        Grade Level
                      </FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="border-border/50 focus:border-primary">
                              <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="O-Level">O-Level</SelectItem>
                              <SelectItem value="A-Level">A-Level</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="p-3 bg-muted/30 rounded-lg border">
                            {field.value || 'Not selected'}
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Years of Experience */}
                <FormField
                  control={form.control}
                  name="yearsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Years of Experience
                      </FormLabel>
                      <FormControl>
                        {isEditing ? (
                          <Input 
                            {...field} 
                            type="number" 
                            placeholder="Enter years of experience"
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            className="border-border/50 focus:border-primary"
                          />
                        ) : (
                          <div className="p-3 bg-muted/30 rounded-lg border">
                            {field.value ? `${field.value} years` : 'Not provided'}
                          </div>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio Section */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Bio
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Textarea 
                          {...field} 
                          placeholder="Tell students about yourself, your teaching approach, and experience..."
                          className="min-h-[120px] border-border/50 focus:border-primary resize-none"
                        />
                      ) : (
                        <div className="p-4 bg-muted/30 rounded-lg border min-h-[120px]">
                          {field.value || 'No bio provided'}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subjects Taught */}
              <FormField
                control={form.control}
                name="subjectsTaught"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Subjects Taught
                    </FormLabel>
                    {isEditing ? (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">Select the subjects you teach:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {availableSubjects.map((subject) => (
                            <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={field.value?.includes(subject) || false}
                                onChange={(e) => {
                                  const currentSubjects = field.value || [];
                                  if (e.target.checked) {
                                    field.onChange([...currentSubjects, subject]);
                                  } else {
                                    field.onChange(currentSubjects.filter(s => s !== subject));
                                  }
                                }}
                                className="rounded border-border/50 text-primary focus:ring-primary"
                              />
                              <span className="text-sm">{subject}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {field.value && field.value.length > 0 ? (
                          field.value.map((subject) => (
                            <Badge key={subject} variant="secondary" className="bg-primary/10 text-primary">
                              {subject}
                            </Badge>
                          ))
                        ) : (
                          <div className="p-3 bg-muted/30 rounded-lg border w-full">
                            No subjects selected
                          </div>
                        )}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Courses Taught Section */}
              <FormField
                control={form.control}
                name="coursesTaught"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <Book className="h-4 w-4 text-primary" />
                      Courses Taught
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {/* Display existing courses */}
                        {field.value && field.value.length > 0 ? (
                          <div className="space-y-2">
                            {field.value.map((course, index) => (
                              <div 
                                key={index} 
                                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                              >
                                <div className="flex items-center gap-3">
                                  <Book className="h-4 w-4 text-secondary" />
                                  <span className="text-foreground">{course}</span>
                                </div>
                                {isEditing && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCourse(index)}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 bg-muted/30 rounded-lg border text-center text-muted-foreground">
                            No courses added yet
                          </div>
                        )}

                        {/* Add new course in edit mode */}
                        {isEditing && (
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                value={newCourse}
                                onChange={(e) => setNewCourse(e.target.value)}
                                placeholder="e.g., Advanced Calculus, IGCSE Physics, A-Level Chemistry..."
                                className="flex-1 border-border/50 focus:border-primary"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addCourse();
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={addCourse}
                                disabled={!newCourse.trim()}
                                className="gap-2 hover:bg-secondary/10"
                              >
                                <Plus className="h-4 w-4" />
                                Add
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Add specific courses or topics you teach within your subject areas
                            </p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Qualifications */}
              <FormField
                control={form.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      Qualifications
                    </FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Textarea 
                          {...field} 
                          placeholder="List your educational qualifications, certifications, and relevant credentials..."
                          className="min-h-[100px] border-border/50 focus:border-primary resize-none"
                        />
                      ) : (
                        <div className="p-4 bg-muted/30 rounded-lg border min-h-[100px]">
                          {field.value || 'No qualifications provided'}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Certifications Section */}
              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Professional Certifications
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {/* Display existing certifications */}
                        {field.value && field.value.length > 0 ? (
                          <div className="space-y-2">
                            {field.value.map((certification, index) => (
                              <div 
                                key={index} 
                                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                              >
                                <div className="flex items-center gap-3">
                                  <ShieldCheck className="h-4 w-4 text-success" />
                                  <span className="text-foreground">{certification}</span>
                                </div>
                                {isEditing && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCertification(index)}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 bg-muted/30 rounded-lg border text-center text-muted-foreground">
                            No certifications added yet
                          </div>
                        )}

                        {/* Add new certification in edit mode */}
                        {isEditing && (
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                value={newCertification}
                                onChange={(e) => setNewCertification(e.target.value)}
                                placeholder="e.g., Certified Teaching Professional, Subject Specialist Certificate..."
                                className="flex-1 border-border/50 focus:border-primary"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addCertification();
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={addCertification}
                                disabled={!newCertification.trim()}
                                className="gap-2 hover:bg-primary/10"
                              >
                                <Plus className="h-4 w-4" />
                                Add
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Add professional certifications, teaching credentials, or specialized training certificates
                            </p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Availability */}
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">Availability (Optional)</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Textarea 
                          {...field} 
                          placeholder="Describe your availability (e.g., weekdays after 4 PM, weekends, specific time slots...)"
                          className="min-h-[80px] border-border/50 focus:border-primary resize-none"
                        />
                      ) : (
                        <div className="p-4 bg-muted/30 rounded-lg border min-h-[80px]">
                          {field.value || 'No availability information provided'}
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default TutorProfile;