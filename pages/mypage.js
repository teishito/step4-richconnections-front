import Header from "../components/Header";
import Footer from "../components/Footer";
import Mypage from "../components/MyPage";

export default function Mypage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 flex justify-center items-start">
        <Mypage />
      </main>
      <Footer />
    </div>
  );
}
