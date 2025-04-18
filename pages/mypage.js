import Header from "../components/Header";
import Footer from "../components/Footer";
import MyPage from "../components/MyPage";

export default function MyPagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 flex justify-center items-start">
        <MyPage />
      </main>
      <Footer />
    </div>
  );
}
