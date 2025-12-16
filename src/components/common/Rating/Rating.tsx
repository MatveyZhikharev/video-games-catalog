import { useMemo } from 'react';
import styles from './Rating.module.scss';
import { cn } from '@/utils/helpers';

export interface RatingProps {
  value: number; // 0-10 or 0-100 depending on max
  max?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'stars' | 'bar';
}

export const Rating = ({
  value,
  max = 10,
  showValue = true,
  size = 'md',
  className,
  variant = 'stars',
}: RatingProps) => {
  const normalizedValue = useMemo(() => {
    return Math.min(Math.max(value, 0), max);
  }, [value, max]);

  const percentage = useMemo(() => {
    return (normalizedValue / max) * 100;
  }, [normalizedValue, max]);

  const stars = useMemo(() => {
    const starCount = 5;
    const filledStars = (normalizedValue / max) * starCount;
    return Array.from({ length: starCount }, (_, i) => {
      const fillPercentage = Math.min(Math.max((filledStars - i) * 100, 0), 100);
      return fillPercentage;
    });
  }, [normalizedValue, max]);

  const getColor = (percent: number): string => {
    if (percent >= 80) return 'high';
    if (percent >= 60) return 'medium';
    return 'low';
  };

  if (variant === 'bar') {
    return (
      <div className={cn(styles.rating, styles[size], className)}>
        <div className={styles.barWrapper}>
          <div
            className={cn(styles.bar, styles[getColor(percentage)])}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={normalizedValue}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
        {showValue && (
          <span className={cn(styles.value, styles[getColor(percentage)])}>
            {normalizedValue.toFixed(1)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(styles.rating, styles.stars, styles[size], className)}
      role="img"
      aria-label={`Rating: ${normalizedValue.toFixed(1)} out of ${max}`}
    >
      <div className={styles.starsWrapper}>
        {stars.map((fillPercentage, index) => (
          <span key={index} className={styles.star}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id={`star-fill-${index}-${fillPercentage}`}>
                  <stop offset={`${fillPercentage}%`} stopColor="currentColor" />
                  <stop offset={`${fillPercentage}%`} stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={`url(#star-fill-${index}-${fillPercentage})`}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ))}
      </div>
      {showValue && <span className={styles.value}>{normalizedValue.toFixed(1)}</span>}
    </div>
  );
};

// Metacritic score component
export interface MetacriticProps {
  score: number | null;
  size?: 'sm' | 'md' | 'lg';
}

export const Metacritic = ({ score, size = 'md' }: MetacriticProps) => {
  if (score === null) return null;

  const getColor = (s: number): string => {
    if (s >= 75) return 'high';
    if (s >= 50) return 'medium';
    return 'low';
  };

  return (
    <div
      className={cn(styles.metacritic, styles[size], styles[getColor(score)])}
      title="Metacritic Score"
    >
      {score}
    </div>
  );
};
