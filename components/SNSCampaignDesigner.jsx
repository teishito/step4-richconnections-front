import { useState } from "react";

export default function SNSCampaignDesigner() {
  const [analysisSummary, setAnalysisSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const generateImage = async () => {
    setLoading(true);
    setErrorMsg("");
    setImageUrl("");

    try {
      // 経営診断の分析結果をまず取得
      const diagnosisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "地方中小企業の経営分析結果をもとに、SNSで使えるキャンペーンメッセージを作るために要約をしてください。箇条書きで要点をまとめてください。",
        }),
      });

      if (!diagnosisResponse.ok) {
        throw new Error("診断分析の取得に失敗しました");
      }

      const diagnosisData = await diagnosisResponse.json();
      const summary = diagnosisData.result;

      setAnalysisSummary(summary);

      // 取得した診断要約から画像を生成
      const imageResponse = await fetch("/api/generate-campaign-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis_summary: summary }),
      });

      if (!imageResponse.ok) {
        const errorText = await imageResponse.text();
        throw new Error(`画像生成に失敗しました: ${errorText}`);
      }

      const data = await imageResponse.json();
      setImageUrl(data.image_url);
    } catch (error) {
      console.error("画像生成エラー:", error);
      setErrorMsg(error.message || "画像生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-12 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">SNSキャンペーン画像生成</h2>

      <button
        onClick={generateImage}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "生成中..." : "画像を生成する"}
      </button>

      {errorMsg && <p className="mt-4 text-red-600">{errorMsg}</p>}

      {analysisSummary && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">分析要約</h3>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded">
            {analysisSummary}
          </pre>
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">生成された画像</h3>
          <img src={imageUrl} alt="キャンペーン画像" className="w-full rounded border" />
        </div>
      )}
    </div>
  );
}
