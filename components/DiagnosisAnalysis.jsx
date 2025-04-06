import { useState } from "react";

export default function DiagnosisAnalysis({ savedAnswers }) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const userAnswers = JSON.stringify(savedAnswers, null, 2);
      const prompt = `以下は地方中小企業向けの経営診断アンケートの結果です。この内容をもとにPEST分析・4C分析・SWOT分析・STP分析・4P分析を実施し、業界トレンドを踏まえた経営戦略を提案してください:

${userAnswers}

それぞれのフレームワークごとに整理して、分かりやすく箇条書きまたは表形式で出力してください。`;

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`サーバーエラー: ${errorText}`);
      }

      const data = await response.json();
      setAnalysis(data.result || "分析結果が取得できませんでした。");
    } catch (error) {
      console.error("分析エラー:", error);
      setAnalysis("分析中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 mt-12 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">経営分析レポート</h2>
      <button
        onClick={runAnalysis}
        className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "分析中..." : "AIに分析してもらう"}
      </button>
      {analysis && (
        <div className="whitespace-pre-wrap border-t pt-4 text-gray-800">
          {analysis}
        </div>
      )}
    </div>
  );
}
