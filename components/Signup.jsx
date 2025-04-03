import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 再確認用
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("個人情報の取扱に同意してください。");
      return;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    alert("新規登録が完了しました");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-white border border-gray-300 p-6 rounded-md w-full max-w-sm shadow-md"
      >
        <h2 className="text-lg font-bold text-center text-gray-800 mb-4">新規登録</h2>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">お名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* 再確認用 */}
        <div className="mb-3">
          <label className="block text-sm font-semibold text-gray-700 mb-1">パスワード（再確認）</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* 同意チェック */}
        <div className="flex items-center text-sm text-gray-700 mb-4">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="agree">
            <span className="text-xs">
              <a href="#" className="text-blue-600 underline mr-1">利用規約</a>・
              <a href="#" className="text-blue-600 underline mx-1">プライバシーポリシー</a>
              に同意します
            </span>
          </label>
        </div>

        <button
          type="submit"
          className={`w-full ${
            agreed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          } text-white font-semibold py-2 rounded transition`}
          disabled={!agreed}
        >
          登録する
        </button>
      </form>
    </div>
  );
}
