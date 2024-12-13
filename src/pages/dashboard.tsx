import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../services/dashboardService";
import Card from "../components/card";
import { useAuthContext } from "../context/authContext";

const Dashboard = () => {
  const { token } = useAuthContext();

  const [stats, setStats] = useState<{
    totalAssets: number;
    totalEmployees: number;
    availableAssets: number;
    totalAdmins: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchDashboardStats(token);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return <div>Failed to load data.</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        <Card title="Total Assets" value={stats.totalAssets} />
        <Card title="Total Employees" value={stats.totalEmployees} />
        <Card title="Available Assets" value={stats.availableAssets} />
        <Card title="Total Admins" value={stats.totalAdmins} />
      </div>
    </div>
  );
};

export default Dashboard;
