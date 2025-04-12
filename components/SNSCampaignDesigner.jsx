import { useState } from "react";

export default function SNSCampaignDesigner() {
  const [analysisSummary, setAnalysisSummary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [snsText, setSnsText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const generateImage = async () => {
    setLoading(true);
    setErrorMsg("");
    setImageUrl("");
    setAnalysisSummary("");
    setSnsText("");

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

      // SNS投稿テキスト生成
      const textResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `以下の要約をもとに、InstagramやX（旧Twitter）に投稿できる「プレゼントキャンペーン投稿文」を作成してください。ターゲットは地域の中小企業関係者です。絵文字を含め、参加を促す構成で書いてください：\n\n${summary}`,
        }),
      });

      if (!textResponse.ok) {
        throw new Error("SNS投稿テキストの生成に失敗しました");
      }

      const textData = await textResponse.json();
      setSnsText(textData.result);
    } catch (error) {
      console.error("画像生成エラー:", error);
      setErrorMsg(error.message || "画像生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-12 mb-32 rounded shadow relative">
      <h2 className="text-2xl font-bold mb-6">SNSキャンペーン画像生成</h2>

      <button
        onClick={generateImage}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "生成中..." : "画像と投稿文を生成する"}
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

      {snsText && (
        <div className="mt-8 mb-32">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">SNS投稿テキスト</h3>
          <div className="whitespace-pre-wrap text-sm bg-yellow-50 p-4 rounded shadow text-gray-900 leading-relaxed">
            {snsText}
          </div>
        </div>
      )}

      {snsText && imageUrl && (
        <div className="fixed bottom-20 left-0 w-full flex justify-center z-50">
          <button
            onClick={() => {
              window.open(imageUrl, "_blank");
              navigator.clipboard.writeText(snsText).then(() => {
                alert("画像を開き、投稿文をコピーしました！");
              });
            }}
            className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700"
          >
            画像保存＆テキストコピー
          </button>
        </div>
      )}
    </div>
  );
}
