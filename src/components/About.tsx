import { Instagram, Youtube, Twitter } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const About = () => {
  const { content } = useSiteContent();
  
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-center mb-16 animate-fade-in-up">
            {content.about.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={content.about.profileImage}
                  alt={content.hero.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10 animate-float" />
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {content.about.description}
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
