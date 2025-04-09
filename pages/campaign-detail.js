import Header from "../components/Header";
import Footer from "../components/Footer";
import CampaignDetail from "../components/CampaignDetail";

export default function CampaignDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4 pb-40">
        <CampaignDetail />
      </main>
      <Footer />
    </div>
  );
}
