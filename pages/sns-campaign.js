import Header from "../components/Header";
import Footer from "../components/Footer";
import SNSCampaignDesigner from "../components/SNSCampaignDesigner";

export default function SNSCampaignPage({ analysis = "" }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center p-4">
        <SNSCampaignDesigner analysis={analysis} />
      </main>
      <Footer />
    </div>
  );
}
