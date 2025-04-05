import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function DiagnosisAnalysis({ savedAnswers }) {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ savedAnswers }),
      });

      const data = await response.json();

      if (data.result) {
        setAnalysis(data.result);
      } else {
        setAnalysis("分析に失敗しました。");
      }
    } catch (error) {
      console.error("分析エラー:", error);
      setAnalysis("分析中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 mt-12 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">経営分析レポート</h2>
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
