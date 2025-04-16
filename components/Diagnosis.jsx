import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// 4段階評価ラベル＋意味
const scale4Options = [
  { label: "①", text: "とてもそう思う" },
  { label: "②", text: "ややそう思う" },
  { label: "③", text: "あまりそう思わない" },
  { label: "④", text: "全くそう思わない" },
];

const diagnosisStructure = [
  {
    title: "1. 店舗のコンセプト・独自性",
    questions: [
      {
        q: "店舗のコンセプトやサービスに独自性があり、お客様にも伝わっていると感じますか？",
      },
    ],
  },
  {
    title: "2. お客様の視点を理解する",
    questions: [
      {
        q: "お客様のニーズや期待を理解し、フィードバックを活かせていると感じますか？",
      },
    ],
  },
  {
    title: "3. 競争優位性を見極める",
    questions: [
      {
        q: "競合店舗と比べて、自店には強みや優位性があると感じますか？",
      },
    ],
  },
  {
    title: "4. マーケティング・集客",
    questions: [
      {
        q: "SNSや広告などの施策が効果的に活用され、集客につながっていると感じますか？",
      },
    ],
  },
  {
    title: "5. メニューの魅力",
    questions: [
      {
        q: "価格や内容を含めたメニュー全体に対して、お客様の満足度は高いと感じますか？",
      },
    ],
  },
  {
    title: "6. サービスの質",
    questions: [
      {
        q: "接客態度や提供スピードを含めたサービス全体の質は高いと感じますか？",
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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://tech0-gen-8-step4-richconnections-back-dbajhyfdcnhbembb.germanywestcentral-01.azurewebsites.net/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });
      if (response.ok) {
        alert("診断内容が保存されました！");
      } else {
        alert("保存に失敗しました");
      }
    } catch (error) {
      console.error("エラー:", error);
      alert("送信エラーが発生しました");
    }
  };

  // 🔽 これを追加！
  const handleAnalyze = () => {
    router.push("/analyze");
  };

  return (
    <form
      onSubmit={handleSave}
      className="max-w-3xl mx-auto bg-white p-6 rounded shadow mb-24"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#5B7F6F]">
        自己診断フォーム
      </h2>

      {diagnosisStructure.map((section, i) => (
        <div key={section.title} className="mb-8">
          <h3 className="text-xl font-semibold text-[#5B7F6F] mb-4">
            {section.title}
          </h3>

          {section.questions.map((q, qi) => {
            const qKey = `${i}-${qi}`;
            return (
              <div key={qKey} className="mb-6">
                <p className="mb-2 font-medium">{q.q}</p>
                <div className="flex gap-6 flex-wrap">
                  {scale4Options.map((opt, index) => {
                    const value = (index + 1).toString(); // "1"〜"4"
                    return (
                      <label
                        key={value}
                        className="flex flex-col items-center text-sm text-gray-700"
                      >
                        <input
                          type="radio"
                          name={qKey}
                          value={value}
                          checked={answers[qKey] === value}
                          onChange={() => handleAnswerChange(qKey, value)}
                          className="accent-[#5B7F6F] w-5 h-5 mb-1"
                        />
                        <span>{opt.label}</span>
                        <span className="text-[10px] text-gray-500 text-center">
                          {opt.text}
                        </span>
                      </label>
                    );
                  })}
                </div>
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
            className="w-full bg-[#5B7F6F] text-white py-2 rounded-lg hover:opacity-90"
          >
            経営分析へ
          </button>
        </Link>
      </div>
    </form>
  );
}
