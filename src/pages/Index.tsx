
import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, Mail, Phone, User, GraduationCap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    exam: ''
  });

  // Set seminar date (7 days from now for demo)
  const seminarDate = new Date();
  seminarDate.setDate(seminarDate.getDate() + 7);
  seminarDate.setHours(10, 0, 0, 0); // 10:00 AM

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = seminarDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.class || !formData.exam) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required for registration.",
        variant: "destructive",
      });
      return;
    }

    // Simulate registration success
    console.log('Registration data:', formData);
    setIsRegistered(true);
    
    toast({
      title: "Registration Successful!",
      description: "You'll receive a confirmation email shortly.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Registration Successful!</CardTitle>
            <CardDescription>
              Thank you for registering for our Smart Study Strategies seminar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              You'll receive a confirmation email with the seminar link and materials shortly.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-blue-800">Seminar Details:</p>
              <p className="text-blue-700">Date: {seminarDate.toLocaleDateString()}</p>
              <p className="text-blue-700">Time: 10:00 AM - 12:00 PM</p>
              <p className="text-blue-700">Mode: Online (Zoom)</p>
            </div>
            <Button 
              onClick={() => setIsRegistered(false)} 
              variant="outline" 
              className="w-full"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Smart Study Strategies
                <span className="block text-yellow-300">for Exam Success</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100">
                Join our free online seminar to learn proven exam preparation strategies that top students use
              </p>
              
              {/* Event Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-yellow-300" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-blue-100">{seminarDate.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="w-6 h-6 text-yellow-300" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-blue-100">10:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <MapPin className="w-6 h-6 text-yellow-300" />
                  <div>
                    <p className="font-semibold">Mode</p>
                    <p className="text-blue-100">Online (Zoom)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="w-6 h-6 text-yellow-300" />
                  <div>
                    <p className="font-semibold">For</p>
                    <p className="text-blue-100">Class 10-12, JEE/NEET</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-6">Event Starts In</h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={index} className="bg-white text-blue-800 rounded-lg p-4">
                    <div className="text-3xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                    <div className="text-sm text-blue-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Why This Seminar Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from experts who have helped thousands of students achieve their academic goals through proven strategies and personalized guidance.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-800">What You'll Learn</h3>
              <div className="space-y-4">
                {[
                  'Effective study planning and time management',
                  'Memory techniques that actually work',
                  'Stress management and motivation strategies',
                  'Common mistakes to avoid during preparation',
                  'Last-minute revision techniques',
                  'Exam day strategies for peak performance'
                ].map((topic, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-blue-800">Meet Your Experts</h3>
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">Dr. Priya Sharma</h4>
                      <p className="text-blue-600 font-medium">Educational Psychology Expert</p>
                      <p className="text-gray-600 text-sm mt-1">
                        15+ years experience in student counseling and academic strategy development
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">Rahul Mehta</h4>
                      <p className="text-green-600 font-medium">JEE Topper & Mentor</p>
                      <p className="text-gray-600 text-sm mt-1">
                        IIT graduate who has mentored 500+ students to crack competitive exams
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Secure Your Spot
              </h2>
              <p className="text-xl text-gray-600">
                Registration is completely free. Limited seats available!
              </p>
            </div>

            <Card className="p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">Current Class *</Label>
                    <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                        <SelectItem value="12+">12th Passed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam">Target Exam *</Label>
                  <Select value={formData.exam} onValueChange={(value) => handleInputChange('exam', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your target exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JEE">JEE Main/Advanced</SelectItem>
                      <SelectItem value="NEET">NEET</SelectItem>
                      <SelectItem value="MHT-CET">MHT-CET</SelectItem>
                      <SelectItem value="Board">Board Exams</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                  Register Now - It's Free!
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@smartstudyseminar.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#about" className="block hover:text-blue-300 transition-colors">About Seminar</a>
                <a href="#register" className="block hover:text-blue-300 transition-colors">Register Now</a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <p className="text-gray-300">
                Stay updated with study tips and exam strategies on our social media channels.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Smart Study Strategies Seminar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
