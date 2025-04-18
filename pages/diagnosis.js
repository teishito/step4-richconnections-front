import Header from "../components/Header";
import Footer from "../components/Footer";
import Diagnosis from "../components/SearchForm";

export default function DiagnosisPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4">
        <Diagnosis />
      </main>
      <Footer />
    </div>
  );
}
