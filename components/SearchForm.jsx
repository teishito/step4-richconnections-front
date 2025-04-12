import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const yesNoOptions = ["Yes", "No"];
const scale4Options = [
  "①とてもそう思う",
  "②ややそう思う",
  "③あまりそう思わない",
  "④全くそう思わない",
];

const diagnosisStructure = [
  {
    title: "1. 店舗のコンセプト・独自性",
    questions: [
      { q: "お店のテーマやコンセプトが、お客様に一目で伝わる内装やメニューになっているか？", type: "yesno" },
      { q: "あなたの店舗の「売り」や「強み」はお客様に認識されていると感じるか？", type: "scale4" },
      { q: "競合店にはない、独自の商品・サービスを提供しているか？", type: "yesno" },
    ],
  },
  {
    title: "2. お客様の視点を理解する",
    questions: [
      { q: "来店したお客様はリピーターになりやすく紹介の頻度も高く感じるか？", type: "scale4" },
      { q: "お客様から「このお店ならでは！」とよく言われるポイントがあるか？", type: "yesno" },
      { q: "口コミサイトやSNSの評価は総じて良いか？", type: "yesno" },
      { q: "価格に関係なく「この店だから通う」というファンがいるか？", type: "yesno" },
    ],
  },
  {
    title: "3. 競争優位性を見極める",
    questions: [
      { q: "近隣の競合店と比較して、価格競争に巻き込まれにくい強みを持っているか？", type: "yesno" },
      { q: "競合と比べて「サービスの質」「商品の独自性」で差別化ができているか？", type: "scale4" },
    ],
  },
  {
    title: "4. マーケティング・集客",
    questions: [
      { q: "SNS（Instagram・Twitterなど）での発信を積極的に行っているか？", type: "yesno" },
      { q: "SNS経由で来店したお客様の割合は増えていると感じるか？", type: "scale4" },
      { q: "集客施策（チラシ・クーポン・広告など）の効果を測定しているか？", type: "yesno" },
      { q: "過去のキャンペーンやプロモーションで特に成功した施策があるか？", type: "yesno" },
    ],
  },
  {
    title: "5. メニューの魅力",
    questions: [
      { q: "「これのために通いたい」とお客様から仰られる商品があるか？", type: "scale4" },
      { q: "価格帯は、ターゲット層の期待と合致しているか？", type: "yesno" },
      { q: "お客様のニーズを把握し、メニュー開発や改良を行っているか？", type: "yesno" },
    ],
  },
  {
    title: "6. サービスの質",
    questions: [
      { q: "来店時の待ち時間やオペレーションはスムーズに管理されているか？", type: "scale4" },
      { q: "スタッフの対応は、競合店と比べても自信があると感じるか？", type: "scale4" },
      { q: "スタッフ教育を定期的に行っているか？", type: "yesno" },
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
    // TODO: API保存やローカルストレージ保存を追加可能
  };

  const handleAnalyze = () => {
    // OpenAIなどのAPIで診断結果を解析する処理へ移行（仮）
    console.log("分析を実行:", answers);
    router.push("/diagnosis-analysis");
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl mx-auto bg-white p-6 pb-24 rounded shadow">
      <h2 className="text-2xl font-bold mb-6" style={{ padding: "30px" }}>自己診断フォーム</h2>
      {diagnosisStructure.map((section, i) => (
        <div key={section.title} className="mb-8">
          <h3 className="text-xl font-semibold text-indigo-600 mb-4">
            {section.title}
          </h3>
          {section.questions.map((q, qi) => {
            const qKey = `${i}-${qi}`;
            const options = q.type === "yesno" ? yesNoOptions : scale4Options;
            return (
              <div key={qKey} className="mb-3">
                <p className="mb-1 font-medium">{q.q}</p>
                <select
                  value={answers[qKey] || ""}
                  onChange={(e) => handleAnswerChange(qKey, e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">選択してください</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          保存する
        </button>

        <button
          type="button"
          onClick={handleAnalyze}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          経営分析へ
        </button>
      </div>
    </form>
  );
}
