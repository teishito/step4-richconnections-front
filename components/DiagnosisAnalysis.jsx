import { useState } from "react";
import Link from "next/link";

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
        sections[title] = text.slice(start + title.length + 5, end).trim();
      }
    });

    return sections;
  };

  const parsed = parseAnalysis(analysis);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 mt-12 rounded shadow flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">経営分析</h2>

      <button
        onClick={runAnalysis}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 mb-4"
        disabled={loading}
      >
        {loading ? "分析中..." : "AIに分析してもらう"}
      </button>

      {analysis && (
        <div className="w-full max-w-md space-y-4 border-t pt-4">
          {Object.entries(parsed).map(([title, content]) => (
            <div key={title} className="border rounded shadow">
              <details className="p-4">
                <summary className="cursor-pointer text-lg font-semibold text-indigo-700">
                  {title}
                </summary>
                <div className="mt-2 whitespace-pre-wrap text-gray-800">{content}</div>
              </details>
            </div>
          ))}

          {/* ✅ 追加のボタンエリア */}
          <div className="mt-6 flex flex-col gap-3">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              保存
            </button>
            <Link href="/campaign-design">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                SNSキャンペーン設計へ
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
