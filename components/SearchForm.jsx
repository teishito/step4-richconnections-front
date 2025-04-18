import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const scale5Options = [
  "① 全くそう思わない",
  "② あまりそう思わない",
  "③ どちらともいえない",
  "④ ややそう思う",
  "⑤ 非常にそう思う",
];

const diagnosisStructure = [
  {
    title: "1. 店舗のコンセプト・独自性",
    questions: [
      {
        q: "店舗のコンセプトやサービスに独自性があり、お客様にも伝わっていると感じますか？",
        type: "scale5",
      },
    ],
  },
  {
    title: "2. お客様の視点を理解する",
    questions: [
      {
        q: "お客様のニーズや期待を理解し、フィードバックを活かせていると感じますか？",
        type: "scale5",
      },
    ],
  },
  {
    title: "3. 競争優位性を見極める",
    questions: [
      {
        q: "競合店舗と比べて、自店には強みや優位性があると感じますか？",
        type: "scale5",
      },
    ],
  },
  {
    title: "4. マーケティング・集客",
    questions: [
      {
        q: "SNSや広告などの施策が効果的に活用され、集客につながっていると感じますか？",
        type: "scale5",
      },
    ],
  },
  {
    title: "5. メニューの魅力",
    questions: [
      {
        q: "価格や内容を含めたメニュー全体に対して、お客様の満足度は高いと感じますか？",
        type: "scale5",
      },
    ],
  },
  {
    title: "6. サービスの質",
    questions: [
      {
        q: "接客態度や提供スピードを含めたサービス全体の質は高いと感じますか？",
        type: "scale5",
      },
    ],
  },
];

export default function DiagnosisForm() {
  const [answers, setAnswers] = useState({});
  const router = useRouter();

  const handleAnswerChange = (qKey, value) => {
    setAnswers((prev) => ({ ...prev, [qKey]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("保存された回答:", answers);
    alert("診断内容が保存されました！（仮）");
  };

  return (
    <form
      onSubmit={handleSave}
      className="max-w-3xl mx-auto bg-white p-6 mt-12 mb-24 rounded shadow"
    >
      <h2 className="text-2xl font-bold text-[#5B7F6F] mb-4">自己診断フォーム</h2>      

      {diagnosisStructure.map((section, i) => (
        <div key={section.title} className="mb-8">
          <h3 className="text-xl font-semibold text-[#5B7F6F] mb-4">
            {section.title}
          </h3>
          {section.questions.map((q, qi) => {
            const qKey = `${i}-${qi}`;
            return (
              <div key={qKey} className="mb-3">
                <p className="mb-1 font-medium">{q.q}</p>
                <select
                  value={answers[qKey] || ""}
                  onChange={(e) => handleAnswerChange(qKey, e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">選択してください</option>
                  {scale5Options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      ))}

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          className="w-full bg-[#5B7F6F] text-white py-2 rounded-lg hover:opacity-90"
        >
          保存する
        </button>

        <Link href="/diagnosis-analysis" className="w-full">
          <button
            type="button"
            className="bg-[#5B7F6F] text-white px-6 py-3 rounded shadow hover:opacity-90"
          >
            経営分析へ
          </button>
        </Link>
      </div>
    </form>
  );
}
