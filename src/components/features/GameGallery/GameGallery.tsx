import { useState, useCallback } from 'react';
import styles from './GameGallery.module.scss';
import { cn } from '@/utils/helpers';

export interface GameGalleryProps {
  images: string[];
  title: string;
}

export const GameGallery = ({ images, title }: GameGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrevious = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <button
            className={styles.mainImageButton}
            onClick={openModal}
            aria-label={`View ${title} screenshot ${selectedIndex + 1} in fullscreen`}
          >
            <img
              src={images[selectedIndex]}
              alt={`${title} screenshot ${selectedIndex + 1}`}
              className={styles.image}
            />
          </button>
          {images.length > 1 && (
            <>
              <button
                className={cn(styles.navButton, styles.prevButton)}
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className={cn(styles.navButton, styles.nextButton)}
                onClick={handleNext}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
          <div className={styles.counter}>
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {images.length > 1 && (
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <button
                key={index}
                className={cn(styles.thumbnail, index === selectedIndex && styles.active)}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View screenshot ${index + 1}`}
                aria-current={index === selectedIndex}
              >
                <img src={image} alt={`${title} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          className={styles.modal}
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery modal"
        >
          <button
            className={styles.closeButton}
            onClick={closeModal}
            aria-label="Close gallery"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={images[selectedIndex]}
            alt={`${title} screenshot ${selectedIndex + 1}`}
            className={styles.modalImage}
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button
                className={cn(styles.modalNavButton, styles.prevButton)}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="32"
                  height="32"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className={cn(styles.modalNavButton, styles.nextButton)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="32"
                  height="32"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
          <div className={styles.modalCounter}>
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};
