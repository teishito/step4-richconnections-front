import { useState } from "react";

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
        q: "提供スピードや接客態度を含めたサービス全体の質は高いと感じますか？",
        type: "scale5",
      },
    ],
  },
];

export default function SNSCampaignDesigner() {
  const [productText, setProductText] = useState("");
  const [answers] = useState(() => {
    const generated = {};
    diagnosisStructure.forEach((section, i) => {
      section.questions.forEach((_, j) => {
        const key = `${i}-${j}`;
        const random = scale5Options[Math.floor(Math.random() * scale5Options.length)];
        generated[key] = random;
      });
    });
    return generated;
  });

  const [analysisSummary, setAnalysisSummary] = useState("");
  const [shortSummary, setShortSummary] = useState("");
  const [snsText, setSnsText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg("");
    setAnalysisSummary("");
    setSnsText("");
    setImageUrl("");
    setShortSummary("");

    try {
      // 経営分析
      const prompt = `以下は商材「${productText}」に関する地方中小企業の経営診断結果です。設問はすべて5段階評価で自動回答されています。これを元に、PEST分析、4C分析、SWOT分析、STP分析、4P分析、さらにSNSキャンペーン設計まで行ってください。\n\n診断回答:\n${JSON.stringify(answers, null, 2)}`;
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const summary = data.result;
      setAnalysisSummary(summary);

      // 要約生成（画像用）
      const shortSummaryRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `以下の分析内容を、SNSキャンペーン用画像に適した要約として100文字以内で1文で表現してください：\n\n${summary}`,
        }),
      });
      const shortData = await shortSummaryRes.json();
      const short = shortData.result.trim();
      setShortSummary(short);

      // 画像生成（先）
      const imgRes = await fetch("/api/generate-campaign-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis_summary: short }),
      });
      const imgData = await imgRes.json();
      setImageUrl(imgData.image_url);

      // 投稿文生成（後）
      const snsRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `以下の要約に基づき、InstagramやXで投稿できるキャンペーン文章を作成してください。ターゲットは中小企業の経営者です。絵文字を含め、参加を促す構成にしてください：\n\n${short}`,
        }),
      });
      const snsData = await snsRes.json();
      setSnsText(snsData.result);

    } catch (err) {
      console.error("生成エラー:", err);
      setErrorMsg("生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 mt-12 mb-24 rounded shadow">
      <h2 className="text-2xl font-bold text-[#5B7F6F] mb-4">SNSキャンペーン設計</h2>

      <label className="block mb-2 font-semibold text-[#5B7F6F]">
        商材名（例：地域限定いちご、地元焼肉、クラフトビール など）
      </label>
      <input
        type="text"
        value={productText}
        onChange={(e) => setProductText(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="商材を入力してください"
      />

      <button
        onClick={handleGenerate}
        className="w-full bg-[#5B7F6F] text-white py-2 rounded hover:opacity-90"
        disabled={loading || !productText}
      >
        {loading ? "生成中..." : "キャンペーン設計を開始"}
      </button>

      {errorMsg && <p className="text-red-600 mt-4">{errorMsg}</p>}

      {analysisSummary && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">経営分析サマリー</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap text-gray-800">
            {analysisSummary}
          </pre>
        </div>
      )}

      {shortSummary && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">画像生成用 要約</h3>
          <p className="bg-gray-50 p-3 rounded border text-sm text-gray-700">{shortSummary}</p>
        </div>
      )}

      {snsText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">SNS投稿テキスト</h3>
          <div className="bg-yellow-50 p-4 rounded shadow text-gray-900 text-sm whitespace-pre-wrap">
            {snsText}
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">生成されたキャンペーン画像</h3>
          <img
            src={imageUrl}
            alt="キャンペーン画像"
            className="w-full max-w-md mx-auto rounded shadow border"
          />
        </div>
      )}

      {snsText && imageUrl && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => {
              window.open(imageUrl, "_blank");
              navigator.clipboard.writeText(snsText).then(() => {
                alert("画像を開き、投稿文をコピーしました！");
              });
            }}
            className="bg-[#5B7F6F] text-white px-6 py-3 rounded shadow hover:opacity-90"
          >
            画像保存＆テキストコピー
          </button>
        </div>
      )}
    </div>
  );
}
