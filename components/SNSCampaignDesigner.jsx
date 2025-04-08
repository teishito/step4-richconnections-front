import { useState } from "react";

export default function SNSCampaignDesigner({ analysis }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-campaign-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `以下の経営戦略に基づいたSNSキャンペーンバナーをデザインしてください。:

${analysis}` })
      });

      if (!response.ok) throw new Error("画像生成に失敗しました");

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("画像生成エラー:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-12 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">SNSキャンペーン設計</h2>
      <button
        onClick={generateImage}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "生成中..." : "キャンペーン画像を生成"}
      </button>

      {imageUrl && (
        <div className="border-t pt-4">
          <p className="mb-2 text-gray-700">生成されたイメージ:</p>
          <img src={imageUrl} alt="SNSキャンペーン画像" className="w-full rounded shadow" />
        </div>
      )}
    </div>
  );
}
