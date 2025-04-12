import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // ログアウト処理（必要に応じてCookieやToken削除などを追加）
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white py-4 z-50 shadow-md">
      <div className="flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="text-xl font-bold cursor-pointer" aria-label="Home">
            Richness
          </h1>
        </Link>

        <button
          className="text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-14 right-4 bg-white shadow-lg rounded-md p-4 z-50 w-56">
          <ul className="text-center space-y-3 text-sm">
            <li>
              <Link href="/diagnosis">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                  自己診断
                </button>
              </Link>
            </li>
            <li>
              <Link href="/diagnosis-analysis">
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                  経営分析
                </button>
              </Link>
            </li>
            <li>
              <Link href="/sns-campaign">
                <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
                  SNSキャンペーン設計
                </button>
              </Link>
            </li>
            <li>
              <Link href="/campaign-detail">
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                  キャンペーン実施/詳細
                </button>
              </Link>
            </li>
            <li>
              <Link href="/campaign-report">
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                  キャンペーン実施レポート
                </button>
              </Link>
            </li>
            <li className="border-t pt-3 mt-3">
              <button
                onClick={handleLogout}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                ログアウト
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
