import React, { useEffect } from "react";
import { useAssets } from "../../contexts/AssetContext";
import Table from "../Shared/Table";

const ViewAssets: React.FC = () => {
  const { assets, fetchAssets } = useAssets();

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div>
      <h1>Assets</h1>
      <Table
        columns={["id", "name", "type", "serialNumber", "status"]}
        data={assets}
      />
    </div>
  );
};

export default ViewAssets;
