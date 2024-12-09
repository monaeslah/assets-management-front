import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    totalEmployees: 0,
    availableAssets: 0,
    totalAdmins: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch("/dashboard");
      const data = await response.json();
      console.log(data);
      setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Assets: {stats.totalAssets}</p>
      <p>Total Employees: {stats.totalEmployees}</p>
      <p>Available Assets: {stats.availableAssets}</p>
      <p>Total Admins: {stats.totalAdmins}</p>
    </div>
  );
};

export default Dashboard;
