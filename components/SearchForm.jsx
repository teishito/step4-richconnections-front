import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import Link from "next/link";

const diagnosisStructure = [
  {
    title: "1. 店舗のコンセプト・独自性",
    question:
      "店舗のコンセプトやサービスに独自性があり、お客様にも伝わっていると感じますか？",
  },
  {
    title: "2. お客様の視点を理解する",
    question:
      "お客様のニーズや期待を理解し、フィードバックを活かせていると感じますか？",
  },
  {
    title: "3. 競争優位性を見極める",
    question:
      "競合店舗と比べて、自店には強みや優位性があると感じますか？",
  },
  {
    title: "4. マーケティング・集客",
    question:
      "SNSや広告などの施策が効果的に活用され、集客につながっていると感じますか？",
  },
  {
    title: "5. メニューの魅力",
    question:
      "価格や内容を含めたメニュー全体に対して、お客様の満足度は高いと感じますか？",
  },
  {
    title: "6. サービスの質",
    question:
      "接客態度や提供スピードを含めたサービス全体の質は高いと感じますか？",
  },
];

export default function SwipeDiagnosisForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const router = useRouter();

  const handleAnswer = (answer) => {
    const qKey = currentIndex;
    setAnswers((prev) => ({ ...prev, [qKey]: answer }));
    if (currentIndex < diagnosisStructure.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleAnswer("いいえ"),
    onSwipedRight: () => handleAnswer("はい"),
    trackMouse: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("保存された回答:", answers);
    alert("診断内容が保存されました！");
  };

  const current = diagnosisStructure[currentIndex];
  const finished = currentIndex >= diagnosisStructure.length;

  return (
    <div className="max-w-xl mx-auto p-6 mt-12 mb-24 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold text-[#5B7F6F] mb-6">
        自己診断フォーム
      </h2>

      {!finished ? (
        <div {...swipeHandlers} className="select-none">
          <h3 className="text-xl font-semibold text-[#5B7F6F] mb-4">
            {current.title}
          </h3>
          <p className="text-gray-800 text-lg px-4 mb-6">{current.question}</p>
          <p className="text-sm text-gray-500">右スワイプ: はい / 左スワイプ: いいえ</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">診断結果</h3>
            <ul className="text-left text-sm space-y-1">
              {diagnosisStructure.map((section, i) => (
                <li key={i}>
                  ✅ {section.title}: {answers[i] || "未回答"}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5B7F6F] text-white py-2 rounded hover:opacity-90"
          >
            保存する
          </button>

          <Link href="/diagnosis-analysis">
            <button
              type="button"
              className="w-full bg-[#5B7F6F] text-white py-2 rounded hover:opacity-90"
            >
              経営分析へ
            </button>
          </Link>
        </form>
      )}
    </div>
  );
}
