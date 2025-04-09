import Header from "../components/Header";
import Footer from "../components/Footer";
import CampaignReport from "../components/CampaignReport";

export default function CampaignReportPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <CampaignReport />
      </main>
      <Footer />
    </div>
  );
}
