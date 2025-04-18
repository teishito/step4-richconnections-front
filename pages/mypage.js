import Header from "../components/Header";
import Footer from "../components/Footer";
import MypageForm from "../components/MypageForm";

export default function Mypage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 flex justify-center items-start">
        <MypageForm />
      </main>
      <Footer />
    </div>
  );
}
