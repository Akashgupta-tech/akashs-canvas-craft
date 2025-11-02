const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-2xl font-display font-semibold">Akash Gupta</p>
          <p className="text-background/80">
            Capturing stories in light and motion
          </p>
          <p className="text-sm text-background/60 pt-4">
            © {new Date().getFullYear()} Akash Gupta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
