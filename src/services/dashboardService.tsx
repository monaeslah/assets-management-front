import axios from "axios";

export const fetchDashboardStats = async (token: string) => {
  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(token);

  return response.data;
};
