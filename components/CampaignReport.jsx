import { useState, useEffect } from "react";

export default function CampaignReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetch("/api/dummy-campaign-report")
      .then(res => res.json())
      .then(setReportData)
      .catch(err => console.error("ダミーデータの取得に失敗:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-12 mb-24 rounded shadow">
      <h2 className="text-2xl font-bold text-[#5B7F6F] mb-4">キャンペーン実施レポート</h2>
      
      {reportData ? (
        <div className="space-y-10">
          {["likes", "comments", "engagement"].map((type) => (
            <div key={type}>
              <h3 className="text-xl font-semibold text-[#5B7F6F] mb-2">
                {type === "likes"
                  ? "いいね数ランキング"
                  : type === "comments"
                  ? "コメント数ランキング"
                  : "エンゲージメント率ランキング"}
              </h3>
              <table className="w-full text-sm border">
                <thead className="bg-[#E6F0EC] text-[#5B7F6F]">
                  <tr>
                    <th className="p-2">Rank</th>
                    <th className="p-2">User</th>
                    <th className="p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData[type].ranking.slice(0, 10).map((entry, index) => (
                    <tr key={entry.user} className="border-t">
                      <td className="p-2 text-center">#{index + 1}</td>
                      <td className="p-2">{entry.user}</td>
                      <td className="p-2 text-right">
                        {type === "engagement"
                          ? `${entry.value.toFixed(2)}%`
                          : entry.value.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td className="p-2 text-right" colSpan={2}>
                      総計:
                    </td>
                    <td className="p-2 text-right">
                      {type === "engagement"
                        ? `${reportData[type].total.toFixed(2)}%`
                        : reportData[type].total.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="border-t bg-gray-50 font-semibold">
                    <td className="p-2 text-right" colSpan={2}>
                      平均:
                    </td>
                    <td className="p-2 text-right">
                      {type === "engagement"
                        ? `${reportData[type].average.toFixed(2)}%`
                        : reportData[type].average.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">読み込み中...</p>
      )}
    </div>
  );
}
