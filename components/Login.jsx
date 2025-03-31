import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // 仮のログイン判定（必要に応じてAPI連携可能）
    if (email === "user@example.com" && password === "password") {
      // ログイン成功時の処理
      localStorage.setItem("userToken", "dummy-token"); // 仮の保存
      router.push("/"); // indexページへ遷移
    } else {
      alert("メールアドレスまたはパスワードが違います");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-auto mt-[100px] space-y-4"
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
