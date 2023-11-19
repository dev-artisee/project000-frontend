import axios from 'axios';

export const getAddress = async (lat: number, lng: number) => {
  const baseUrl = 'https://dapi.kakao.com/v2/local/geo/coord2address';
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
      },
      params: { x: lng, y: lat },
    });
    const data = response.data.documents[0].address.address_name;
    return data;
  } catch (error) {
    console.log(error);
  }
};
