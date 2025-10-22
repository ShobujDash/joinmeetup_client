"use client";

import { LogoTable } from "@/components/adminComponents/table/LogoTable";
import WorkInProgressMessage from "@/components/WorkInProgress";
import { getAllLogoAPI } from "@/service/adminService/logo.service";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const data = await getAllLogoAPI();
        setLogos(data || []);
      } catch (error) {
        console.error("Failed to load logos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading logos...</div>
    );
  }

  return (
    <div className="max-w-[67rem] mx-auto p-4">
      <LogoTable data={logos} />
      <WorkInProgressMessage />
    </div>
  );
};

export default Page;
