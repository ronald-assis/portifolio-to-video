import React from 'react';

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ children, className = '' }: ContentSectionProps) {
  return (
    <section className={`container mx-auto px-6 py-20 md:py-24 ${className}`}>
      {children}
    </section>
  );
}
