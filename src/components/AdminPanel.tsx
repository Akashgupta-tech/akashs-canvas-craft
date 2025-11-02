import { useState } from "react";
import { LogOut, User, Image, Mail, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useSiteContent, PortfolioItem } from "@/hooks/useSiteContent";

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const { content, updateHero, updateAbout, updateContact, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useSiteContent();
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<PortfolioItem, 'id'>>({
    title: '',
    description: '',
    category: 'photo',
    imageUrl: ''
  });

  const handleHeroUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateHero({
      name: formData.get('name') as string,
      tagline: formData.get('tagline') as string,
      description: formData.get('description') as string
    });
    toast.success("Hero section updated!");
  };

  const handleAboutUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateAbout({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      profileImage: formData.get('profileImage') as string
    });
    toast.success("About section updated!");
  };

  const handleContactUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateContact({
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      location: formData.get('location') as string
    });
    toast.success("Contact info updated!");
  };

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPortfolioItem(newProject);
    setNewProject({ title: '', description: '', category: 'photo', imageUrl: '' });
    setIsAddDialogOpen(false);
    toast.success("Project added!");
  };

  const handleUpdateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;
    const formData = new FormData(e.currentTarget);
    updatePortfolioItem(editingProject.id, {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as 'photo' | 'video',
      imageUrl: formData.get('imageUrl') as string,
      videoUrl: formData.get('videoUrl') as string || undefined
    });
    setEditingProject(null);
    toast.success("Project updated!");
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deletePortfolioItem(id);
      toast.success("Project deleted!");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Edit Hero Section
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleHeroUpdate} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input name="name" defaultValue={content.hero.name} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tagline</label>
                    <Input name="tagline" defaultValue={content.hero.tagline} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea name="description" defaultValue={content.hero.description} required rows={3} />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Edit About Section
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAboutUpdate} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input name="title" defaultValue={content.about.title} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea name="description" defaultValue={content.about.description} required rows={5} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Profile Image URL</label>
                    <Input name="profileImage" defaultValue={content.about.profileImage} required type="url" />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <Image className="w-5 h-5" />
                    Manage Portfolio
                  </CardTitle>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Project</DialogTitle>
                        <DialogDescription>Create a new portfolio item</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddProject} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Title</label>
                          <Input value={newProject.title} onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))} required />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Description</label>
                          <Textarea value={newProject.description} onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))} required />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Category</label>
                          <Select value={newProject.category} onValueChange={(value: 'photo' | 'video') => setNewProject(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="photo">Photo</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Image URL</label>
                          <Input type="url" value={newProject.imageUrl} onChange={(e) => setNewProject(prev => ({ ...prev, imageUrl: e.target.value }))} required />
                        </div>
                        {newProject.category === 'video' && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Video URL</label>
                            <Input type="url" value={newProject.videoUrl || ''} onChange={(e) => setNewProject(prev => ({ ...prev, videoUrl: e.target.value }))} />
                          </div>
                        )}
                        <Button type="submit">Add Project</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.portfolio.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-3">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded" />
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setEditingProject(project)}>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Project</DialogTitle>
                              <DialogDescription>Update project details</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdateProject} className="space-y-4">
                              <div>
                                <label className="text-sm font-medium mb-2 block">Title</label>
                                <Input name="title" defaultValue={project.title} required />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-2 block">Description</label>
                                <Textarea name="description" defaultValue={project.description} required />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-2 block">Category</label>
                                <Select name="category" defaultValue={project.category}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="photo">Photo</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-2 block">Image URL</label>
                                <Input type="url" name="imageUrl" defaultValue={project.imageUrl} required />
                              </div>
                              <div>
                                <label className="text-sm font-medium mb-2 block">Video URL (optional)</label>
                                <Input type="url" name="videoUrl" defaultValue={project.videoUrl} />
                              </div>
                              <Button type="submit">Update Project</Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Edit Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactUpdate} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input name="email" type="email" defaultValue={content.contact.email} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input name="phone" defaultValue={content.contact.phone} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input name="location" defaultValue={content.contact.location} required />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
