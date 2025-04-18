import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function DashboardMenu() {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-2 text-center mt-12">
      <Link href="/diagnosis">
        <button className="w-full bg-[#5B7F6F] text-white py-2 rounded-lg hover:opacity-90">
          自己診断
        </button>
      </Link>

      <div className="text-gray-400 text-xl">▼</div>

      <Link href="/diagnosis-analysis">
        <button className="w-full bg-[#5B7F6F] text-white py-2 rounded-lg hover:opacity-90">
          経営分析
        </button>
      </Link>

      <div className="text-gray-400 text-xl">▼</div>

      <Link href="/sns-campaign">
        <button className="w-full bg-[#5B7F6F] text-white py-2 rounded-lg hover:opacity-90">
          SNSキャンペーン設計
        </button>
      </Link>

      <div className="text-gray-400 text-xl">▼</div>

      <Link href="/campaign-detail">
        <button className="w-full bg-[#5B7F6F] text-white py-2 rounded-lg hover:opacity-90">
          キャンペーン実施/詳細
        </button>
      </Link>

      <div className="text-gray-400 text-xl">▼</div>

      <Link href="/campaign-report">
        <button className="w-full bg-[#5B7F6F] text-white py-2 rounded-lg hover:opacity-90">
          キャンペーン実施レポート
        </button>
      </Link>
    </div>
  );
}
