import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("authToken", "sample-token");
      router.push("/");
    } else {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* ログインフォーム */}
      <form
        onSubmit={handleLogin}
        className="bg-gray-100 border border-gray-300 p-6 rounded-md w-full max-w-sm mb-6"
      >
        <h2 className="text-lg font-bold text-center text-brown-800 mb-4">ログイン</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-brown-300"
            required
          />
        </div>

        <div className="mb-1">
          <label className="block text-sm font-semibold mb-1 text-gray-700">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-brown-300"
            required
          />
        </div>

        <div className="text-xs text-gray-500 mb-4 text-center">
          パスワードをお忘れの方は
          <span className="underline ml-1 cursor-pointer text-brown-600">こちら</span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#d8c7b3] text-brown-900 font-semibold py-2 rounded hover:bg-[#c8b7a3] transition"
        >
          ログイン
        </button>
      </form>

      {/* 新規登録 */}
      <div className="bg-gray-100 border border-gray-300 p-4 rounded-md w-full max-w-sm text-center">
        <h3 className="font-bold text-brown-800 text-md mb-1">はじめてご利用の方</h3>
        <p className="text-xs text-gray-500 mb-4">(無料アカウントの作成)</p>
        <Link href="/signup">
          <button className="w-full bg-[#d8c7b3] text-brown-900 font-semibold py-2 rounded hover:bg-[#c8b7a3] transition">
            新規登録
          </button>
        </Link>
      </div>
    </div>
  );
}
