import Header from "../components/Header";
import Footer from "../components/Footer";
import Signup from "../components/Signup";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f2]">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <Signup />
      </main>
      <Footer />
    </div>
  );
}
