import Link from "next/link";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
      <nav className="flex justify-around items-center text-sm text-center py-3 text-[#5B7F6F] font-semibold">
        <Link href="/sns-campaign">
          <span className="cursor-pointer">Plan</span>
        </Link>
        <Link href="/campaign-detail">
          <span className="cursor-pointer">Do</span>
        </Link>
        <Link href="/campaign-report">
          <span className="cursor-pointer">Check</span>
        </Link>
        <Link href="/mypage">
          <span className="cursor-pointer">MyPage</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
