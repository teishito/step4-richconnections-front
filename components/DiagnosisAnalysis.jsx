import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function DiagnosisAnalysis() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("diagnosisAnswers");
    if (!savedAnswers) return;

    const parsed = JSON.parse(savedAnswers);
    const formatted = Object.entries(parsed)
      .map(([key, value]) => `質問${key}: ${value}`)
      .join("\n");

    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/openai-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: formatted }),
        });

        const data = await res.json();
        setAnalysis(data.result || "分析結果の取得に失敗しました");
      } catch (err) {
        console.error(err);
        setAnalysis("エラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <div className="whitespace-pre-wrap bg-white p-4 rounded shadow">
      {loading ? (
        <p className="text-center text-gray-600">分析中...</p>
      ) : (
        analysis
      )}
    </div>
  );
}
