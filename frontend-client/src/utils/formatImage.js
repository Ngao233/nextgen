export const getProductImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/public/images/img_1.jpg";
  }

  return `${import.meta.env.VITE_API_URL || ""}/storage/${imagePath}`;
};
