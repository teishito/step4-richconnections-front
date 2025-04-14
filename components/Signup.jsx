import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("個人情報の取扱に同意してください。");
      return;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("新規登録が完了しました");
        router.push("/login");
      } else {
        alert(`登録に失敗しました: ${data.message || "サーバーエラー"}`);
      }
    } catch (err) {
      console.error("登録中エラー:", err);
      alert("通信エラーが発生しました。ネットワークをご確認ください。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white border border-gray-300 p-6 rounded-lg w-full max-w-md shadow space-y-4"
      >
        <h2 className="text-center text-lg font-semibold mb-6">新規登録</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
          <input
            type="text"
            placeholder="お名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5B7F6F]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5B7F6F]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5B7F6F]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">パスワード（再確認）</label>
          <input
            type="password"
            placeholder="パスワード（再確認）"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5B7F6F]"
            required
          />
        </div>

        <div className="mb-4 flex items-start text-sm text-gray-700 space-x-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="agree" className="leading-tight">
            <span className="text-[#5B7F6F] underline cursor-pointer">利用規約</span>・
            <span className="text-[#5B7F6F] underline cursor-pointer">プライバシーポリシー</span>
            に同意します
          </label>
        </div>

        <button
          type="submit"
          disabled={!agreed}
          className={`w-full py-2 rounded font-semibold transition ${
            agreed
              ? "bg-[#5B7F6F] text-white hover:opacity-90"
              : "bg-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          登録する
        </button>
      </form>
    </div>
  );
}
