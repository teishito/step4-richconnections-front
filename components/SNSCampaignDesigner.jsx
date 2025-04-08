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
    setAnalysisSummary("");

    try {
      // 経営診断の分析要約を取得
      const diagnosisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "以下は地方中小企業の経営診断結果です。この内容をSNSで使えるキャンペーンメッセージの要約にしてください。箇条書きでわかりやすくまとめてください。",
        }),
      });

      if (!diagnosisResponse.ok) {
        const errorText = await diagnosisResponse.text();
        throw new Error(`診断分析の取得に失敗しました: ${errorText}`);
      }

      const diagnosisData = await diagnosisResponse.json();
      const summary = diagnosisData.result;
      setAnalysisSummary(summary);

      // 画像生成APIへ要約を送信
      const imageResponse = await fetch("/api/generate-campaign-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis_summary: summary }),
      });

      if (!imageResponse.ok) {
        const errorText = await imageResponse.text();
        throw new Error(`画像生成に失敗しました: ${errorText}`);
      }

      const imageData = await imageResponse.json();
      setImageUrl(imageData.image_url);
    } catch (error) {
      console.error("画像生成エラー:", error);
      setErrorMsg(error.message || "画像生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-12 mb-24 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">SNSキャンペーン画像生成</h2>

      <button
        onClick={generateImage}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "生成中..." : "画像を生成する"}
      </button>

      {errorMsg && <p className="mt-4 text-red-600">{errorMsg}</p>}

      {analysisSummary && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">分析要約</h3>
          <div className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded shadow text-gray-800 leading-relaxed">
            {analysisSummary}
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">生成された画像</h3>
          <img
            src={imageUrl}
            alt="SNSキャンペーン画像"
            className="w-full max-w-md mx-auto rounded shadow border"
          />
        </div>
      )}
    </div>
  );
}
