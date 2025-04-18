import Link from "next/link";

export default function DashboardMenu() {
  return (
    <div className="max-w-3xl mx-auto px-4 mt-12 space-y-2 text-center">
      <MenuButton href="/diagnosis" label="自己診断" />
      <Divider />

      <MenuButton href="/diagnosis-analysis" label="経営分析" />
      <Divider />

      <MenuButton href="/sns-campaign" label="SNSキャンペーン設計" />
      <Divider />

      <Label text="SNS投稿" />
      <Divider />

      <MenuButton href="/campaign-detail" label="キャンペーン実施/詳細" />
      <Divider />

      <MenuButton href="/campaign-report" label="キャンペーン実施レポート" />
    </div>
  );
}

function MenuButton({ href, label }) {
  return (
    <Link href={href} passHref>
      <a className="block w-full bg-[#5B7F6F] text-white py-3 rounded-lg font-semibold text-center hover:opacity-90">
        {label}
      </a>
    </Link>
  );
}

function Divider() {
  return <div className="text-gray-400 text-xl">▼</div>;
}

function Label({ text }) {
  return (
    <div className="w-full text-center text-[#5B7F6F] font-semibold py-2 border border-dashed border-gray-300 rounded">
      {text}
    </div>
  );
}
