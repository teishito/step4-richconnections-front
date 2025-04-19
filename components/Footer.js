import Link from "next/link";
import { FaClipboardList, FaPlay, FaCheckCircle, FaUserCircle } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow z-50">
      <div className="flex justify-between items-center px-6 py-2 text-sm text-[#5B7F6F]">
        {/* Plan */}
        <Link href="/sns-campaign" className="flex flex-col items-center">
          <FaClipboardList className="text-lg" />
          <span className="text-xs">Plan</span>
        </Link>

        {/* Do */}
        <Link href="/campaign-detail" className="flex flex-col items-center">
          <FaPlay className="text-lg" />
          <span className="text-xs">Do</span>
        </Link>

        {/* Check */}
        <Link href="/campaign-report" className="flex flex-col items-center">
          <FaCheckCircle className="text-lg" />
          <span className="text-xs">Check</span>
        </Link>

        {/* MyPage */}
        <Link href="/mypage" className="flex flex-col items-center">
          <FaUserCircle className="text-lg" />
          <span className="text-xs">MyPage</span>
        </Link>
      </div>
    </footer>
  );
}
