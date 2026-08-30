// client/src/data/questions.js
export const genderQuestion = {
  key: "patient_sex",
  question: "Aap apne aap ko kaise identify karte hain?",
  type: "single",
  options: ["Female", "Male", "Prefer not to say"],
};

export const questions = [
  // SECTION A — Personal & Family Hair Loss History
  {
    n: 1,
    key: "age_hair_loss_began",
    section: "A",
    question: "Aapke baal jhadna kab shuru hue the?",
    type: "number",
    placeholder: "Age in years",
  },
  {
    n: 2,
    key: "duration",
    section: "A",
    question: "Kitne time se ho raha hai?",
    type: "single",
    options: ["Less than 6 months", "6-12 months", "Over a year"],
  },
  {
    n: 3,
    key: "family_history",
    section: "A",
    question: "Family mein kisi ko hair loss hua hai?",
    type: "multi",
    options: [
      "Father had hair loss",
      "Mother had hair loss",
      "Siblings with thinning or baldness",
      "No known family history",
    ],
  },
  {
    n: 4,
    key: "pattern",
    section: "A",
    question: "Hair loss ka pattern kaisa hai?",
    type: "multi",
    options: [
      "Receding hairline",
      "Thinning at crown",
      "Widening part line",
      "Diffuse thinning",
      "Patchy loss",
      "Sudden excessive shedding",
    ],
  },

  // SECTION B — Hormonal & Health Influences
  {
    n: 5,
    key: "diagnosed_conditions",
    section: "B",
    question: "Kya aapko in mein se koi condition diagnose hui hai?",
    type: "multi",
    options: [
      "PCOS/PCOD",
      "Thyroid disorder",
      "Diabetes",
      "Autoimmune disease",
      "Anemia",
      "None",
    ],
  },
  {
    n: 6,
    key: "menstrual_cycle",
    section: "B",
    question: "Menstrual cycle kaisa hai?",
    type: "single",
    options: ["Regular", "Irregular", "Menopausal", "Not applicable"],
    femaleOnly: true,
  },
  {
    n: 7,
    key: "pregnancy_related",
    section: "B",
    question: "Pregnancy se related hair loss?",
    type: "single",
    options: ["Currently pregnant", "Postpartum <1 year", "Not applicable"],
    femaleOnly: true,
  },
  {
    n: 8,
    key: "adult_acne_oily_skin",
    section: "B",
    question: "Adult acne ya oily skin hai?",
    type: "yesno",
  },
  {
    n: 9,
    key: "excess_body_facial_hair",
    section: "B",
    question: "Excess body ya facial hair growth hai?",
    type: "yesno",
  },
  // SECTION C — Lifestyle & Environmental Triggers
  {
    n: 10,
    key: "past_6_months",
    section: "C",
    question: "Pichhle 6 mahino mein kuch hua?",
    type: "multi",
    options: [
      "Crash dieting or major weight loss",
      "High stress or emotional trauma",
      "Fever with illness (COVID, Dengue, Typhoid)",
      "Recent surgery",
      "Change in location/water/air quality",
    ],
  },
  {
    n: 11,
    key: "habits",
    section: "C",
    question: "Apni habits bataiye",
    type: "table",
    rows: [
      {
        key: "smoking",
        label: "Smoking",
        type: "yesno",
        followup: {
          key: "smoking_severity",
          question: "Kitni smoking?",
          type: "single",
          options: ["Mild <5/day", "Moderate 5-10/day", "Severe >10/day"],
        },
      },
      { key: "alcohol", label: "Alcohol", type: "yesno" },
      { key: "hard_water", label: "Hard water for hair wash", type: "yesno" },
      {
        key: "hair_wash_frequency",
        label: "Hair wash frequency",
        type: "single",
        options: ["Daily", "Alternate Days", "Weekly"],
      },
      {
        key: "heating_tools_styling_chemicals",
        label: "Heating tools/styling chemicals",
        type: "yesno",
      },
      {
        key: "salon_treatments",
        label: "Salon treatments (keratin, rebonding, etc.)",
        type: "yesno",
        followup: {
          key: "salon_treatment_detail",
          question: "Kaunsa treatment?",
          type: "text",
        },
      },
    ],
  },

  // SECTION D — Current Hair Care & Treatments
  {
    n: 12,
    key: "products",
    section: "D",
    question: "Products jo use kiye hain",
    type: "productTable",
    rows: [
      "OTC/Medicated Shampoos",
      "Hair Oils/Serums",
      "Topical Minoxidil",
      "Oral Minoxidil",
      "Supplements",
    ],
    columns: [
      { key: "used", label: "Used?", type: "bool" },
      {
        key: "duration",
        label: "Duration",
        type: "single",
        options: ["<3mo", "3-6mo", ">6mo"],
      },
      { key: "helped", label: "Helped?", type: "yesno" },
      { key: "side_effects", label: "Side effects?", type: "yesno" },
    ],
  },
  {
    n: 13,
    key: "procedures",
    section: "D",
    question: "In-clinic procedures jo kiye hain",
    type: "productTable",
    rows: ["PRP/GFC/iPRF", "Stem Cells/Exosomes", "Hair Transplant", "Other"],
    columns: [
      { key: "done", label: "Done?", type: "bool" },
      {
        key: "sessions",
        label: "Sessions",
        type: "single",
        options: ["1-3", "4-6", ">6"],
      },
      { key: "helped", label: "Helped?", type: "yesno" },
    ],
  },
  {
    n: 14,
    key: "past_treatment_side_effects",
    section: "D",
    question: "Purane treatment se koi side effect ya poor response hua?",
    type: "yesno",
    followup: {
      key: "describe",
      question: "Describe kariye",
      type: "text",
    },
  },

  // SECTION E — Sample & Consent
  {
    n: 15,
    key: "sample_type",
    section: "E",
    question: "Sample dene ke liye preference?",
    type: "single",
    options: ["Saliva", "Blood", "Either"],
  },
  {
    n: 16,
    key: "consent",
    section: "E",
    question: "Kya aap sample collection aur genetic analysis ke liye consent dete hain?",
    type: "yesno",
  },
];