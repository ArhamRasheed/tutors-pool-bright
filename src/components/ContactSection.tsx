import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} id="contact" className="py-20 bg-gradient-section">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help you on your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-elegant border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help you..." 
                  className="min-h-[120px]"
                />
              </div>
              
              <Button variant="hero" size="lg" className="w-full">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-elegant border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Support</h3>
                    <p className="text-muted-foreground">support@tutorspool.com</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get help via email within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">WhatsApp</h3>
                    <p className="text-muted-foreground">+92 300 1234567</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Chat with us instantly for quick support
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-primary w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Support Hours</h3>
                    <p className="text-muted-foreground">Mon - Fri: 9AM - 6PM</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Available for calls and live chat
                </p>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-elegant border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">How do demo sessions work?</h4>
                    <p className="text-sm text-muted-foreground">Free 30-minute sessions to test our platform and meet your tutor.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">What subjects do you cover?</h4>
                    <p className="text-sm text-muted-foreground">All O/A Level subjects including Math, Physics, Chemistry, Biology, and more.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">How are tutors verified?</h4>
                    <p className="text-sm text-muted-foreground">All tutors undergo qualification verification and background checks.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;