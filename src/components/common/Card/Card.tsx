import type { ReactNode } from 'react';
import styles from './Card.module.scss';
import { cn } from '@/utils/helpers';

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  className,
  onClick,
  hoverable = false,
  padding = 'md',
}: CardProps) => {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={cn(
        styles.card,
        styles[`padding-${padding}`],
        hoverable && styles.hoverable,
        onClick && styles.clickable,
        className
      )}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </Component>
  );
};

export interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export const CardImage = ({ src, alt, aspectRatio = '16/9' }: CardImageProps) => {
  return (
    <div className={styles.imageWrapper} style={{ aspectRatio }}>
      <img src={src} alt={alt} className={styles.image} loading="lazy" />
    </div>
  );
};

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return <div className={cn(styles.content, className)}>{children}</div>;
};

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return <div className={cn(styles.footer, className)}>{children}</div>;
};
