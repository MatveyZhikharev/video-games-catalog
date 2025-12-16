import styles from './Loader.module.scss';
import { cn } from '@/utils/helpers';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
}

export const Loader = ({ size = 'md', fullScreen = false, text }: LoaderProps) => {
  return (
    <div
      className={cn(styles.loader, styles[size], fullScreen && styles.fullScreen)}
      role="status"
      aria-label={text || 'Загрузка'}
    >
      <div className={styles.spinner}>
        <svg viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80, 200"
            strokeDashoffset="0"
          />
        </svg>
      </div>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

// Skeleton loader for cards
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className,
}: SkeletonProps) => {
  return (
    <div
      className={cn(styles.skeleton, className)}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
      }}
      aria-hidden="true"
    />
  );
};

// Game card skeleton
export const GameCardSkeleton = () => {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton height="180px" borderRadius="12px 12px 0 0" />
      <div className={styles.cardSkeletonContent}>
        <Skeleton width="70%" height="1.25rem" />
        <Skeleton width="50%" height="1rem" />
        <div className={styles.cardSkeletonFooter}>
          <Skeleton width="40%" height="1rem" />
          <Skeleton width="30%" height="1rem" />
        </div>
      </div>
    </div>
  );
};
