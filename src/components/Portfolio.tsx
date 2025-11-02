import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Golden Hour",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      description: "A serene collection capturing the magic of golden hour light across breathtaking landscapes."
    },
    {
      id: 2,
      title: "Urban Stories",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      description: "Exploring the vibrant life and architecture of modern cities through candid moments."
    },
    {
      id: 3,
      title: "Cinematic Moments",
      category: "Video",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
      description: "A short film exploring human connections in the digital age."
    },
    {
      id: 4,
      title: "Portrait Series",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
      description: "Intimate portraits that reveal the essence and emotion of each subject."
    },
    {
      id: 5,
      title: "Nature's Canvas",
      category: "Photography",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
      description: "Capturing the raw beauty and power of natural landscapes."
    },
    {
      id: 6,
      title: "Motion & Light",
      category: "Video",
      image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?w=800&h=600&fit=crop",
      description: "An experimental video piece exploring abstract movement and light patterns."
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-center mb-16 animate-fade-in-up">
            My Work
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm font-medium text-primary-foreground/80 mb-2">{project.category}</p>
                    <h3 className="text-2xl font-display font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                      <span>View More</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">
            {selectedProject?.title}
          </DialogTitle>
          {selectedProject && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-primary font-medium">{selectedProject.category}</p>
                <h3 className="text-3xl font-display font-bold">{selectedProject.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
