import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

export const usePageSEO = ({ title, description, canonical }: SEOProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (link) {
        link.href = canonical;
      } else {
        link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonical;
        document.head.appendChild(link);
      }
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical]);
};
