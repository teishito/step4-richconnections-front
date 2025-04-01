import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardMenu from "../components/DashboardMenu";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 flex justify-center items-start">
        <DashboardMenu />
      </main>
      <Footer />
    </div>
  );
}
