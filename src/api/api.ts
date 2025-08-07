import axiosInstance from './AxiosInstance'

// Define the response type for a generic API request
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Utility function for GET request
export const get = async <T>(url: string, config: object = {}): Promise<T> => {
  // try {
    const response: ApiResponse<T> = await axiosInstance.get(url, config);
    return response.data;
  // } catch (error) {
  //   console.error('API GET request error:', error);
  //   throw error;
  // }
};

// Utility function for POST request
export const post = async <T, U>(
  url: string,
  data: T,
  config: object = {}
): Promise<U> => {
  try {
    const response: ApiResponse<U> = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('API POST request error:', error);
    throw error;
  }
};

// Utility function for PUT request
export const put = async <T, U>(
  url: string,
  data: T,
  config: object = {}
): Promise<U> => {
  try {
    const response: ApiResponse<U> = await axiosInstance.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error('API PUT request error:', error);
    throw error;
  }
};

// Utility function for DELETE request
export const del = async <T>(
  url: string,
  config: object = {}
): Promise<T> => {
  try {
    const response: ApiResponse<T> = await axiosInstance.delete(url, config);
    return response.data;
  } catch (error) {
    console.error('API DELETE request error:', error);
    throw error;
  }
};
