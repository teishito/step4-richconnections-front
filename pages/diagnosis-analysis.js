import Header from "../components/Header";
import Footer from "../components/Footer";
import DiagnosisAnalysis from "../components/DiagnosisAnalysis";

export default function DiagnosisAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-6" style={{ padding: "20px" }}>診断結果に基づく経営分析</h1>
        <DiagnosisAnalysis />
      </main>
      <Footer />
    </div>
  );
}
