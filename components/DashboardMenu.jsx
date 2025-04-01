import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function DashboardMenu() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={() => handleNavigate("/diagnosis")} style={{ padding: "25px" }}>自己診断</button>
      <button className="w-full bg-green-500 text-white py-2 rounded">経営分析</button>
      <button className="w-full bg-yellow-500 text-white py-2 rounded">SNSキャンペーン設計</button>
      <button className="w-full bg-purple-500 text-white py-2 rounded">キャンペーン実施/詳細</button>
      <button className="w-full bg-red-500 text-white py-2 rounded">キャンペーン実施レポート</button>
    </div>
  );
}
