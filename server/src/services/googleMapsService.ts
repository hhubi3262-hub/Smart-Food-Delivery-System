import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

interface DistanceResult {
  distance: number; // in kilometers
  duration: number; // in seconds
}

// Calculate delivery fee based on distance (example: $1 per km)
export const calculateDeliveryFee = (distance: number): number => {
  const baseFee = 2.5;
  const perKmFee = 1.0;
  return baseFee + distance * perKmFee;
};

// Get distance between two coordinates
export const getDistance = async (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): Promise<DistanceResult> => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: `${lat1},${lng1}`,
        destinations: `${lat2},${lng2}`,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.rows[0].elements[0].status === 'OK') {
      const element = response.data.rows[0].elements[0];
      return {
        distance: element.distance.value / 1000, // Convert to km
        duration: element.duration.value, // in seconds
      };
    }

    throw new Error('Unable to calculate distance');
  } catch (error) {
    console.error('❌ Google Maps API error:', error);
    throw error;
  }
};

// Geocode address to coordinates
export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    }

    throw new Error('Address not found');
  } catch (error) {
    console.error('❌ Geocoding error:', error);
    throw error;
  }
};

// Get address from coordinates (reverse geocoding)
export const reverseGeocodeCoordinates = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${lat},${lng}`,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }

    throw new Error('Address not found');
  } catch (error) {
    console.error('❌ Reverse geocoding error:', error);
    throw error;
  }
};
