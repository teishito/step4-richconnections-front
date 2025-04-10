import { useState } from "react";

export default function FollowerExporter() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [csvUrl, setCsvUrl] = useState("");
  const [error, setError] = useState("");

  const handleExport = async () => {
    setLoading(true);
    setError("");
    setCsvUrl("");

    try {
      const res = await fetch(`/api/export-followers?username=${username}`, {
        method: "POST"
      });

      if (!res.ok) throw new Error("エクスポートに失敗しました");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setCsvUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-12">
      <h2 className="text-xl font-bold mb-4">Instagramフォロワーのエクスポート</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Instagramユーザー名"
        className="border p-2 w-full rounded mb-4"
      />
      <button
        onClick={handleExport}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "エクスポート中..." : "フォロワーをCSVで保存"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {csvUrl && (
        <a href={csvUrl} download={`${username}_followers.csv`} className="mt-4 block text-blue-700 underline">
          ダウンロードはこちら
        </a>
      )}
    </div>
  );
}
