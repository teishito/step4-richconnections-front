import { useState } from "react";

export default function MyPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    description: "",
    strengths: "",
    challenges: "",
    futureVision: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("送信された内容:", formData);
    alert("企業情報が保存されました！");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10 mb-24">
      <h2 className="text-2xl font-bold text-[#5B7F6F] mb-6">マイページ - 企業情報と経営分析</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SectionTitle title="企業基本情報" />
        <InputField label="会社名" name="companyName" value={formData.companyName} onChange={handleChange} />
        <InputField label="業種" name="industry" value={formData.industry} onChange={handleChange} />
        <InputField label="担当者名" name="contactName" value={formData.contactName} onChange={handleChange} />
        <InputField label="メールアドレス" name="email" type="email" value={formData.email} onChange={handleChange} />
        <InputField label="電話番号" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
        <InputField label="WebサイトURL" name="website" type="url" value={formData.website} onChange={handleChange} />
        <TextAreaField label="会社概要" name="description" value={formData.description} onChange={handleChange} />

        <SectionTitle title="経営分析に活かせる情報" />
        <TextAreaField label="自社の強み" name="strengths" value={formData.strengths} onChange={handleChange} />
        <TextAreaField label="現在の課題" name="challenges" value={formData.challenges} onChange={handleChange} />
        <TextAreaField label="今後取り組みたいこと" name="futureVision" value={formData.futureVision} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-[#5B7F6F] text-white py-2 px-4 rounded hover:opacity-90"
        >
          保存する
        </button>
      </form>
    </div>
  );
}

function SectionTitle({ title }) {
  return <h3 className="text-xl font-bold text-[#5B7F6F] mt-4">{title}</h3>;
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-[#5B7F6F]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-[#5B7F6F]">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border border-gray-300 rounded px-3 py-2"
        required
      />
    </div>
  );
}
