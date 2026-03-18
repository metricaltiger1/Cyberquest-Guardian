import { Link } from "react-router-dom";
import { Shield, Target, Eye, Users, Rocket, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <Home className="w-4 h-4" />
            Back to Missions
          </Button>
        </Link>
      </nav>

      <div className="relative z-10 container mx-auto px-4 pb-20">
        {/* Hero Section */}
        <section className="text-center py-16 animate-fade-in">
          <div className="inline-block mb-6">
            <Shield className="w-20 h-20 text-secondary animate-glow-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent animate-shimmer">
            About CyberQuest
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            by <span className="text-secondary font-semibold">Chryntox</span>
          </p>
          <p className="text-2xl md:text-3xl text-foreground/90 font-light italic">
            Empowering Digital Defenders Through Play
          </p>
        </section>

        {/* Mission & Vision Cards */}
        <section className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card className="border-secondary/30 hover:border-secondary/60 transition-all hover:shadow-[0_0_30px_rgba(246,139,30,0.3)] group">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform" />
                <h2 className="text-3xl font-bold text-secondary">Our Mission</h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                To promote cybersecurity awareness for learners of all ages through engaging, 
                gamified experiences. We believe that cybersecurity education should be accessible, 
                fun, and practical—empowering everyone to protect themselves and their communities 
                in the digital world.
              </p>
            </CardContent>
          </Card>

          <Card className="border-accent/30 hover:border-accent/60 transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] group">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Eye className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
                <h2 className="text-3xl font-bold text-accent">Our Vision</h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed">
                A safe digital future where every user becomes cyber-smart through interactive 
                education. We envision a world where cybersecurity literacy is as fundamental as 
                reading and writing, and where learning to defend against digital threats is an 
                adventure, not a chore.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Who We Are */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Card className="border-primary/50 hover:shadow-[0_0_40px_rgba(246,139,30,0.2)] transition-all">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-12 h-12 text-secondary" />
                <h2 className="text-4xl font-bold text-foreground">Who We Are</h2>
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                <span className="text-secondary font-semibold text-xl">Chryntox</span> is an 
                innovation-driven cybersecurity startup dedicated to making the digital world 
                safer for everyone. We combine cutting-edge technology with creative pedagogy 
                to deliver learning experiences that stick.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Our team believes that the best way to build digital resilience is through 
                hands-on practice, real-world scenarios, and a dash of fun. That's why we 
                created CyberQuest—a platform that transforms complex security concepts into 
                engaging missions that anyone can master.
              </p>
              <a 
                href="http://chryntox.web.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-secondary hover:text-accent transition-colors text-lg font-medium group"
              >
                Learn more about Chryntox
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </CardContent>
          </Card>
        </section>

        {/* The Journey */}
        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="border-accent/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <CardContent className="p-8 md:p-12 relative">
              <div className="flex items-center gap-4 mb-6">
                <Rocket className="w-12 h-12 text-accent" />
                <h2 className="text-4xl font-bold text-foreground">The Journey So Far</h2>
              </div>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  CyberQuest started as a simple idea: <span className="text-accent font-medium">
                  What if learning cybersecurity felt like playing a game?</span>
                </p>
                <p>
                  We noticed that traditional cybersecurity training was often dry, technical, 
                  and intimidating—especially for beginners. So we set out to change that.
                </p>
                <p>
                  Through countless iterations, user feedback, and a passion for both education 
                  and innovation, CyberQuest evolved into a full-fledged learning platform. 
                  Today, it guides users through real-world scenarios—from spotting phishing 
                  emails to securing their devices—all while earning XP, collecting badges, 
                  and leveling up their cyber skills.
                </p>
                <p className="text-secondary font-medium">
                  This is just the beginning. Join us as we continue to expand the CyberQuest 
                  universe with new missions, challenges, and ways to learn.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Join the Quest?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your journey to becoming a Digital Guardian today. 
              Every mission brings you one step closer to cyber mastery.
            </p>
            <Link to="/">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/80 text-white text-lg px-8 py-6 shadow-[0_0_20px_rgba(246,139,30,0.5)] hover:shadow-[0_0_30px_rgba(246,139,30,0.7)] transition-all"
              >
                Start Your Quest
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
