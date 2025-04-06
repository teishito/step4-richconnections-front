import Header from "../components/Header";
import Footer from "../components/Footer";
import DiagnosisAnalysis from "../components/DiagnosisAnalysis";

export default function DiagnosisAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4 pb-40">
        <DiagnosisAnalysis />
      </main>
      <Footer />
    </div>
  );
}
