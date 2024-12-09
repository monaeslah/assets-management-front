import axios from "axios";

export const fetchDashboardStats = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`);
  return response.data;
};
