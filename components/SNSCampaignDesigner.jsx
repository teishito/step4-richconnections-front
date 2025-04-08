import { useState } from "react";

export default function SNSCampaignDesigner({ analysisSummary }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    setLoading(true);
    setError("");
    setImageUrl(null);

    try {
      const response = await fetch("/api/generate-campaign-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analysis_summary: analysisSummary }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`画像生成に失敗しました: ${errorText}`);
      }

      const data = await response.json();
      if (!data.image_url) {
        throw new Error("画像URLが返されませんでした。");
      }

      setImageUrl(data.image_url);
    } catch (err) {
      console.error("画像生成エラー:", err);
      setError("画像生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-12 rounded shadow">
      <h2 className="text-xl font-bold mb-4">SNSキャンペーン画像の生成</h2>

      <button
        onClick={generateImage}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        disabled={loading}
      >
        {loading ? "画像生成中..." : "AIで画像を生成する"}
      </button>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {imageUrl && (
        <div className="mt-4">
          <p className="text-gray-600 mb-2">画像が生成されました：</p>
          <img
            src={imageUrl}
            alt="SNSキャンペーン画像"
            className="max-w-full border rounded shadow"
          />
        </div>
      )}
    </div>
  );
}
