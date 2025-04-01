import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">経営分析結果</h2>
        {loading ? (
          <p className="text-center text-gray-600">分析中...</p>
        ) : (
          <div className="whitespace-pre-wrap bg-white p-4 rounded shadow">
            {analysis}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
