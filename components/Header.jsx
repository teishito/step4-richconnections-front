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
    // Cookie削除などがあればここに追加
    setMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#5B7F6F] text-white py-4 z-50 shadow-md">
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
          <ul className="text-center space-y-3 text-sm text-black">
            <li>
              <Link href="/diagnosis" className="hover:text-blue-600">
                自己診断
              </Link>
            </li>
            <li>
              <Link href="/diagnosis-analysis" className="hover:text-green-600">
                経営分析
              </Link>
            </li>
            <li>
              <Link href="/sns-campaign" className="hover:text-yellow-600">
                SNSキャンペーン設計
              </Link>
            </li>
            <li>
              <Link href="/campaign-detail" className="hover:text-purple-600">
                キャンペーン実施/詳細
              </Link>
            </li>
            <li>
              <Link href="/campaign-report" className="hover:text-red-600">
                キャンペーン実施レポート
              </Link>
            </li>
            <li>
              <Link href="/mypage" className="hover:text-indigo-600">
                マイページ
              </Link>
            </li>
            <li className="border-t pt-3 mt-3">
              <span
                onClick={handleLogout}
                className="cursor-pointer hover:text-gray-700"
              >
                ログアウト
              </span>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
