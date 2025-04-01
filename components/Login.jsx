import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // 認証（仮）→ 実際はAPIで認証チェック
    if (email === "user@example.com" && password === "password") {
      // 認証成功 → トークン保存（仮）→ index に遷移
      localStorage.setItem("authToken", "sample-token");
      router.push("/"); // index.tsx に遷移
    } else {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded shadow-md w-full max-w-sm mt-[100px] space-y-4"
    >
      <h2 className="text-xl font-bold text-center">ログイン</h2>
      <div>
        <label className="block text-sm mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ログイン
      </button>
    </form>
  );
}
