import { useState } from "react";
import { LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AdminButtonProps {
  onLogin: () => void;
}

const AdminButton = ({ onLogin }: AdminButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default credentials: username: Akash_admin, password: creative2024
    if (credentials.username === "Akash_admin" && credentials.password === "creative2024") {
      localStorage.setItem("isAdmin", "true");
      onLogin();
      setIsOpen(false);
      toast.success("Welcome back, Akash!");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-300 shadow-soft hover:shadow-elegant z-50"
        aria-label="Admin login"
      >
        <LogIn className="w-4 h-4" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Enter your admin credentials to manage the website
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminButton;
