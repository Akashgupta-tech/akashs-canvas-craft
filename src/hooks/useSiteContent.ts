import { useState, useEffect } from 'react';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'photo' | 'video';
  imageUrl: string;
  videoUrl?: string;
}

export interface SiteContent {
  hero: {
    name: string;
    tagline: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
    profileImage: string;
  };
  portfolio: PortfolioItem[];
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

const defaultContent: SiteContent = {
  hero: {
    name: "Akash Gupta",
    tagline: "Capturing stories in light and motion",
    description: "Hi, I'm Akash Gupta, a creative artist who loves capturing emotions through photography and film."
  },
  about: {
    title: "About Me",
    description: "I'm a passionate creative artist specializing in photography and videography. My work focuses on capturing authentic moments and telling compelling visual stories. With years of experience in both commercial and artistic projects, I strive to create images that resonate with emotion and authenticity.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  portfolio: [
    {
      id: '1',
      title: 'Urban Landscapes',
      description: 'A collection of cityscapes capturing the beauty of urban life',
      category: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
    },
    {
      id: '2',
      title: 'Nature Documentary',
      description: 'A short film exploring the wilderness',
      category: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      videoUrl: 'https://example.com/video1.mp4'
    },
    {
      id: '3',
      title: 'Portrait Series',
      description: 'Intimate portraits capturing human emotion',
      category: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop'
    },
    {
      id: '4',
      title: 'Travel Memories',
      description: 'Adventures from around the world',
      category: 'photo',
      imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop'
    }
  ],
  contact: {
    email: 'akash.gupta@creative.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India'
  }
};

export const useSiteContent = () => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
  }, [content]);

  const updateContent = (updates: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...updates }));
  };

  const updateHero = (hero: Partial<SiteContent['hero']>) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, ...hero } }));
  };

  const updateAbout = (about: Partial<SiteContent['about']>) => {
    setContent(prev => ({ ...prev, about: { ...prev.about, ...about } }));
  };

  const updateContact = (contact: Partial<SiteContent['contact']>) => {
    setContent(prev => ({ ...prev, contact: { ...prev.contact, ...contact } }));
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setContent(prev => ({ ...prev, portfolio: [...prev.portfolio, newItem] }));
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setContent(prev => ({
      ...prev,
      portfolio: prev.portfolio.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const deletePortfolioItem = (id: string) => {
    setContent(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter(item => item.id !== id)
    }));
  };

  return {
    content,
    updateContent,
    updateHero,
    updateAbout,
    updateContact,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem
  };
};
