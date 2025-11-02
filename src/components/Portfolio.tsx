import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSiteContent, PortfolioItem } from "@/hooks/useSiteContent";

const Portfolio = () => {
  const { content } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-center mb-16 animate-fade-in-up">
            My Work
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.portfolio.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.imageUrl}
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
                  src={selectedProject.imageUrl}
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
