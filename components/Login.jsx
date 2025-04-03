import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("利用規約・プライバシーポリシーに同意してください。");
      return;
    }
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("authToken", "sample-token");
      router.push("/dashboard");
    } else {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* ログインフォーム */}
      <form
        onSubmit={handleLogin}
        className="bg-white border border-gray-300 p-6 rounded-lg w-full max-w-md shadow mb-6"
      >
        <h2 className="text-center text-lg font-semibold mb-6">ログイン</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス / ログインID
          </label>
          <input
            type="email"
            placeholder="メールアドレス / ログインID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <span className="absolute right-3 top-9 text-gray-400 cursor-pointer">👁️</span>
        </div>

        {/* 同意チェック */}
        <div className="mb-4 flex items-start text-sm text-gray-700 space-x-2">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="agree" className="leading-tight">
            <span className="text-blue-600 underline cursor-pointer">利用規約</span>・
            <span className="text-blue-600 underline cursor-pointer">プライバシーポリシー</span>
            に同意の上ログインしてください
          </label>
        </div>

        <button
          type="submit"
          disabled={!agreed}
          className={`w-full py-2 rounded font-semibold ${
            agreed
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-400 cursor-not-allowed"
          } transition`}
        >
          ログイン
        </button>
      </form>

      {/* 新規登録案内 */}
      <div className="bg-white border border-gray-300 p-4 rounded-lg w-full max-w-md text-center shadow">
        <h3 className="font-semibold text-gray-800 text-md mb-1">はじめてご利用の方</h3>
        <p className="text-xs text-gray-500 mb-4">(無料アカウントの作成)</p>
        <Link href="/signup">
          <button className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded hover:bg-blue-200 transition">
            新規登録
          </button>
        </Link>
      </div>
    </div>
  );
}
