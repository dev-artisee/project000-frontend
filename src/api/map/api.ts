import { apiClient } from '@/api/api-client';

export const getRecommendPlace = async ({
  latitude,
  longitude,
  radius = '100',
  category = '',
}: {
  latitude: string;
  longitude: string;
  radius?: string;
  category?: string;
}) => {
  try {
    const response = await apiClient().get(`/recommend/place`, {
      params: { latitude, longitude, radius, category },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOverviewRelation = async (corpCode: string) => {
  try {
    const response = await apiClient().get(`/overview/${corpCode}/relations`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
