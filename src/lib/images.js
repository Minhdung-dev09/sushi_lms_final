// Image assets management
// Import all images to ensure they are properly bundled and available
import bannerImage from "/banners-img.jpg";
import bannerImagePng from "/banners-img.png";
import adsImage from "/ads.png";
import bannerSvg from "/banner.svg";
import animationGif from "/Animation1704801029621.gif";
import infiniteSpinner from "/infinite-spinner.svg";
import viteLogo from "/vite.svg";

// Export images with fallback options
export const images = {
  banner: {
    jpg: bannerImage,
    png: bannerImagePng,
    // Fallback function that tries different formats
    get: () => {
      try {
        return bannerImage;
      } catch (error) {
        console.warn("Banner JPG not available, trying PNG...");
        return bannerImagePng;
      }
    },
  },
  ads: adsImage,
  bannerSvg: bannerSvg,
  animation: animationGif,
  spinner: infiniteSpinner,
  viteLogo: viteLogo,
};

// Helper function to get image with error handling
export const getImage = (imageKey, fallbackColor = "#1e293b") => {
  try {
    return images[imageKey] || images.banner.get();
  } catch (error) {
    console.error(`Failed to load image: ${imageKey}`, error);
    return null;
  }
};

// Helper function for image error handling
export const handleImageError = (e, fallbackColor = "#1e293b") => {
  console.error("Failed to load image:", e.target.src);
  e.target.style.display = "none";
  if (e.target.parentElement) {
    e.target.parentElement.style.backgroundColor = fallbackColor;
  }
};

export default images;
