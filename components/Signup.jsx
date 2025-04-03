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
        className="bg-white border border-gray-300 p-6 rounded-md w-full max-w-sm space-y-4 shadow"
      >
        <h2 className="text-lg font-bold text-center text-gray-900">新規登録</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">お名前</label>
          <input
            type="text"
            placeholder="お名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-blue-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">メールアドレス</label>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-blue-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-blue-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">パスワード（再確認）</label>
          <input
            type="password"
            placeholder="パスワード（再確認）"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-blue-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <div className="flex items-start space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-1"
          />
          <label htmlFor="agree">
            <span>
              <a href="#" className="text-blue-600 underline">利用規約</a>・
              <a href="#" className="text-blue-600 underline">プライバシーポリシー</a>
              に同意します
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={!agreed}
          className={`w-full text-white font-semibold py-2 rounded transition ${
            agreed ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          登録する
        </button>
      </form>
    </div>
  );
}
