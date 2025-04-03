import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("個人情報の取扱に同意してください。");
      return;
    }

    alert("新規登録が完了しました（仮）");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSignup}
        className="bg-gray-100 border border-gray-300 p-6 rounded-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-lg font-bold text-center text-brown-800">新規登録</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">お名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-brown-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-brown-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-brown-300"
            required
          />
        </div>

        {/* 個人情報の同意チェック */}
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 border-gray-300"
          />
          <label htmlFor="agree">
            <span>個人情報の取扱に同意します</span>
          </label>
        </div>

        <button
          type="submit"
          className={`w-full ${
            agreed ? "bg-[#d8c7b3] hover:bg-[#c8b7a3]" : "bg-gray-300 cursor-not-allowed"
          } text-brown-900 font-semibold py-2 rounded transition`}
          disabled={!agreed}
        >
          登録する
        </button>
      </form>
    </div>
  );
}
