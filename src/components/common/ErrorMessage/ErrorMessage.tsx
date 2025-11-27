import type { ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';
import { cn } from '@/utils/helpers';
import { Button } from '../Button';

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
  icon?: ReactNode;
}

export const ErrorMessage = ({
  title = 'Error',
  message,
  onRetry,
  retryText = 'Try Again',
  className,
  icon,
}: ErrorMessageProps) => {
  return (
    <div className={cn(styles.error, className)} role="alert">
      <div className={styles.iconWrapper}>
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry} className={styles.retryButton}>
          {retryText}
        </Button>
      )}
    </div>
  );
};

// Empty state component
export interface EmptyStateProps {
  title?: string;
  message: string;
  action?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const EmptyState = ({
  title = 'No Results',
  message,
  action,
  className,
  icon,
}: EmptyStateProps) => {
  return (
    <div className={cn(styles.empty, className)}>
      <div className={styles.iconWrapper}>
        {icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        )}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
