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
    <div className="max-w-2xl w-full mx-auto bg-white p-6 mt-12 rounded shadow min-h-screen pb-32">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#5B7F6F]">経営分析</h2>

      <div className="flex justify-center">
        <button
          onClick={runAnalysis}
          className="bg-[#5B7F6F] text-white px-6 py-2 rounded hover:opacity-90"
          disabled={loading}
        >
          {loading ? "分析中..." : "AIに分析してもらう"}
        </button>
      </div>

      <hr className="my-6" />

      {Object.entries(sections).map(([title, content]) => (
        <details key={title} className="mb-4 bg-gray-50 p-4 rounded shadow">
          <summary className="cursor-pointer text-[#5B7F6F] font-semibold">{title}</summary>
          <pre className="mt-2 whitespace-pre-wrap text-gray-800">{content}</pre>
        </details>
      ))}

      {analysis && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-6 space-y-3">
          <button className="w-full bg-[#5B7F6F] text-white px-4 py-2 rounded hover:opacity-90">
            保存
          </button>
          <button className="w-full bg-[#5B7F6F] text-white px-4 py-2 rounded hover:opacity-90">
            SNSキャンペーン設計へ
          </button>
        </div>
      )}
    </div>
  );
}
