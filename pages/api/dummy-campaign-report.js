export default function handler(req, res) {
  const dummyReport = {
    likes: {
      ranking: [
        { user: "tomari_w", value: 1867 },
        { user: "jihy2010", value: 1750 },
        { user: "aozora", value: 1719 },
        { user: "sakemaimai", value: 1252 },
        { user: "chami_444", value: 887 },
        { user: "jur_1027", value: 599 },
        { user: "aopime", value: 271 },
        { user: "aiko_body", value: 77 },
        { user: "kayonomura_", value: 33 },
        { user: "hatsune_yd", value: 0 },
      ],
      total: 8455,
      average: 939,
    },
    comments: {
      ranking: [
        { user: "aozora", value: 498 },
        { user: "kayonomura_", value: 418 },
        { user: "aiko_body", value: 343 },
        { user: "chami_444", value: 316 },
        { user: "tomari_w", value: 291 },
        { user: "aopime", value: 212 },
        { user: "jihy2010", value: 147 },
        { user: "jur_1027", value: 75 },
        { user: "sakemaimai", value: 22 },
        { user: "hatsune_yd", value: 0 },
      ],
      total: 2322,
      average: 258,
    },
    engagement: {
      ranking: [
        { user: "tomari_w", value: 44.44 },
        { user: "aozora", value: 25.0 },
        { user: "kayonomura_", value: 19.8 },
        { user: "jihy2010", value: 6.02 },
        { user: "jur_1027", value: 3.36 },
        { user: "aiko_body", value: 2.87 },
        { user: "chami_444", value: 2.72 },
        { user: "sakemaimai", value: 2.65 },
        { user: "aopime", value: 2.21 },
        { user: "hatsune_yd", value: 0 },
      ],
      total: 121.12,
      average: 12.12,
    },
  };

  res.status(200).json(dummyReport);
}
