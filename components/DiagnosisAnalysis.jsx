import { useState } from "react";

export default function DiagnosisAnalysis({ savedAnswers }) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // 分析実行
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

  // 分析結果をセクションごとに分割
  const parseAnalysis = (text) => {
    const sections = {};
    const titles = [
      "PEST分析",
      "4C分析",
      "SWOT分析",
      "STP分析",
      "4P分析",
      "経営戦略の提案"
    ];

    titles.forEach((title, i) => {
      const start = text.indexOf(`### ${title}`);
      const end = i < titles.length - 1 ? text.indexOf(`### ${titles[i + 1]}`) : text.length;

      if (start !== -1 && end !== -1) {
        sections[title] = text.slice(start + title.length + 5, end).trim(); // +5 は "### " を除去
      }
    });

    return sections;
  };

  const parsed = parseAnalysis(analysis);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 mt-12 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">経営分析</h2>

      <button
        onClick={runAnalysis}
        className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "分析中..." : "AIに分析してもらう"}
      </button>

      {/* 分析結果を項目ごとに表示 */}
      {analysis && (
        <div className="space-y-4 border-t pt-4">
          {Object.entries(parsed).map(([title, content]) => (
            <div key={title} className="border rounded shadow">
              <details className="p-4">
                <summary className="cursor-pointer text-lg font-semibold text-indigo-700">
                  {title}
                </summary>
                <div className="mt-2 whitespace-pre-wrap text-gray-800">
                  {content}
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
