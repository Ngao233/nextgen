import apiClient from "./api";

export const favoriteApi = {
  getFavorites: async (userId) => {
    const response = await apiClient.get(`/api/favorite-products/${userId}`);
    return response.data;
  },

  addToFavorites: async ({ UserID, ProductVariantID }) => {
    const response = await apiClient.post("/api/favorite-products", {
      UserID,
      ProductVariantID,
    });
    return response.data;
  },

  removeFromFavorites: async ({ UserID, ProductVariantID }) => {
    const response = await apiClient.delete("/api/favorite-products", {
      data: {
        UserID,
        ProductVariantID,
      },
    });
    return response.data;
  },

  checkIsFavorite: async (userId, productVariantId) => {
    try {
      const response = await apiClient.get(`/api/favorite-products/${userId}`);
      const favorites = response.data.data || [];
      return favorites.some((fav) => fav.ProductVariantID === productVariantId);
    } catch (error) {
      console.error("Error checking favorite status:", error);
      return false;
    }
  },
};
