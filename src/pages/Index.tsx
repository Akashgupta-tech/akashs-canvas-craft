import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdminButton from "@/components/AdminButton";

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
      {!isAdmin && <AdminButton onLogin={handleLogin} />}
    </div>
  );
};

export default Index;
