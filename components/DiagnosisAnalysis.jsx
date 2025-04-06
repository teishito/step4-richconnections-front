import { useState } from "react";

export default function DiagnosisAnalysis({ savedAnswers }) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState({});

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const userAnswers = JSON.stringify(savedAnswers, null, 2);
      const prompt = `以下は地方中小企業向けの経営診断アンケートの結果です。この内容をもとにPEST分析・4C分析・SWOT分析・STP分析・4P分析を実施し、業界トレンドを踏まえた経営戦略を提案してください:\n\n${userAnswers}\n\nそれぞれのフレームワークごとに整理して、分かりやすく箇条書きまたは表形式で出力してください。`;

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
      const rawText = data.result || "分析結果が取得できませんでした。";

      const newSections = {};
      const titles = ["PEST分析", "4C分析", "SWOT分析", "STP分析", "4P分析", "経営戦略の提案"];
      let current = null;
      rawText.split("\n").forEach((line) => {
        const found = titles.find((title) => line.includes(title));
        if (found) {
          current = found;
          newSections[current] = "";
        } else if (current) {
          newSections[current] += line + "\n";
        }
      });

      setSections(newSections);
      setAnalysis(rawText);
    } catch (error) {
      console.error("分析エラー:", error);
      setAnalysis("分析中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-12 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">経営分析</h2>
      <button
        onClick={runAnalysis}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "分析中..." : "AIに分析してもらう"}
      </button>

      <hr className="my-4" />

      {Object.entries(sections).map(([title, content]) => (
        <details key={title} className="mb-4 bg-gray-50 p-4 rounded shadow">
          <summary className="cursor-pointer text-indigo-700 font-semibold">{title}</summary>
          <pre className="mt-2 whitespace-pre-wrap text-gray-800">{content}</pre>
        </details>
      ))}

      {analysis && (
        <div className="mt-10 mb-32 space-y-3">
          <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">保存</button>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">SNSキャンペーン設計へ</button>
        </div>
      )}
    </div>
  );
}
