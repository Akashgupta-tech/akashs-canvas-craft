import { Instagram, Youtube, Twitter } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-center mb-16 animate-fade-in-up">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
                  alt="Akash Gupta"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10 animate-float" />
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My creative journey began with a simple camera and an insatiable curiosity to capture the world around me. 
                Over the years, I've developed a deep passion for storytelling through visual media.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every frame tells a story, every moment holds emotion. Through my lens, I strive to freeze time and 
                preserve memories that resonate with authenticity and beauty.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's capturing the golden hour light, documenting intimate moments, or creating cinematic narratives, 
                I pour my heart into every project.
              </p>
              
              <div className="flex gap-6 pt-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
