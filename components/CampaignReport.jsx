import { useState } from "react";

export default function CampaignReport() {
  const [postUrl, setPostUrl] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchReport = async () => {
    setLoading(true);
    setErrorMsg("");
    setReportData(null);

    try {
      const res = await fetch("/api/campaign-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: postUrl }),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`取得失敗: ${error}`);
      }

      const data = await res.json();
      setReportData(data);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "レポート取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mb-20">
      <h2 className="text-2xl font-bold mb-4">キャンペーン実施レポート</h2>

      <input
        type="text"
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
        placeholder="https://www.instagram.com/p/..."
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={fetchReport}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "分析中..." : "レポートを取得"}
      </button>

      {errorMsg && <p className="mt-4 text-red-600">{errorMsg}</p>}

      {reportData && (
        <div className="mt-6 space-y-8">
          {["likes", "comments", "engagement"].map((type) => (
            <div key={type}>
              <h3 className="text-xl font-semibold mb-2">
                {type === "likes"
                  ? "いいね数ランキング"
                  : type === "comments"
                  ? "コメント数ランキング"
                  : "エンゲージメント率ランキング"}
              </h3>
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2">Rank</th>
                    <th className="p-2">User</th>
                    <th className="p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData[type].ranking.map((entry, index) => (
                    <tr key={entry.user} className="border-t">
                      <td className="p-2 text-center">#{index + 1}</td>
                      <td className="p-2">{entry.user}</td>
                      <td className="p-2 text-right">{entry.value}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td className="p-2 text-right" colSpan={2}>
                      総計:
                    </td>
                    <td className="p-2 text-right">
                      {reportData[type].total}
                    </td>
                  </tr>
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td className="p-2 text-right" colSpan={2}>
                      平均:
                    </td>
                    <td className="p-2 text-right">
                      {reportData[type].average}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
