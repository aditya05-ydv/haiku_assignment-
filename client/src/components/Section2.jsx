// client/src/components/Section2.jsx
import { useState } from "react";

function Chip({ selected, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-full px-4 py-2 text-sm transition-all ${
        selected
          ? "bg-blue-600 text-white border-blue-600"
          : "border-gray-200 text-gray-600 hover:border-blue-300"
      }`}
    >
      {children}
    </button>
  );
}

function Section2({ answers, setAnswers, onBack, onContinue }) {
  const [error, setError] = useState("");
  const sex = answers.patient_sex || null;
  const isMale = sex === "Male";

  function setAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function handleSexChange(opt) {
    setAnswer("patient_sex", sex === opt ? null : opt);
  }

  function toggleConditions(opt) {
    const current = answers.diagnosed_conditions || [];
    let updated;
    if (opt === "None of these") {
      updated = current.includes(opt) ? [] : ["None of these"];
    } else {
      updated = current.includes(opt)
        ? current.filter((o) => o !== opt)
        : [...current.filter((o) => o !== "None of these"), opt];
    }
    setAnswer("diagnosed_conditions", updated);
  }

  const conditionOptions = isMale
    ? ["Thyroid disorder", "Diabetes", "Autoimmune disease", "Anemia", "None of these"]
    : ["PCOS / PCOD", "Thyroid disorder", "Diabetes", "Autoimmune disease", "Anemia", "None of these"];

  function handleContinue() {
    if (!answers.diagnosed_conditions || answers.diagnosed_conditions.length === 0) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (isMale) {
      if (!answers.progression) {
        setError("Please answer all questions before continuing.");
        return;
      }
    } else {
      if (!answers.menstrual_cycle || !answers.pregnancy_related) {
        setError("Please answer all questions before continuing.");
        return;
      }
    }
    if (!answers.adult_acne_oily_skin || !answers.excess_body_facial_hair) {
      setError("Please answer all questions before continuing.");
      return;
    }
    setError("");
    onContinue();
  }

  return (
    <div className="max-w-[850px] mx-auto bg-white border border-gray-100 shadow-sm rounded-[24px] px-5 sm:px-8 md:px-10 py-6 sm:py-8 my-8 sm:my-12">
      <button
        onClick={onBack}
        className="text-sm text-gray-400 hover:text-blue-600 mb-4"
      >
        ← Back to Section 1
      </button>

      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-blue-600 font-semibold text-sm">02</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Hormonal & Health Influences
          </h3>
        </div>
        <p className="text-gray-400 text-sm mt-1.5">
          Let's look at a few health factors that may be relevant to your hair and scalp. · Section 2 of 5
        </p>
      </div>

      <div className="mb-8 pb-8 border-b border-gray-100">
        <p className="font-medium text-gray-800 mb-1">
          How would you like us to tailor your intake?
        </p>
        <p className="text-sm text-gray-400 mb-4">
          This helps us show questions that are relevant to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          {["Female", "Male", "Prefer not to say"].map((opt) => (
            <Chip key={opt} selected={sex === opt} onClick={() => handleSexChange(opt)}>
              {opt}
            </Chip>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <div className="py-6 first:pt-0">
          <p className="font-medium text-gray-800 mb-1">
            Have you been diagnosed with any of these conditions?
          </p>
          <p className="text-sm text-gray-400 mb-3">Select all that apply.</p>
          <div className="flex flex-wrap gap-2">
            {conditionOptions.map((opt) => (
              <Chip
                key={opt}
                selected={(answers.diagnosed_conditions || []).includes(opt)}
                onClick={() => toggleConditions(opt)}
              >
                {opt}
              </Chip>
            ))}
          </div>
        </div>

        {!isMale && (
          <>
            <div className="py-6">
              <p className="font-medium text-gray-800 mb-3">
                How would you describe your menstrual cycle?
              </p>
              <div className="flex flex-wrap gap-2">
                {["Regular", "Irregular", "Menopausal", "Not applicable"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.menstrual_cycle === opt}
                    onClick={() => setAnswer("menstrual_cycle", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="py-6">
              <p className="font-medium text-gray-800 mb-3">
                Have you experienced hair loss related to pregnancy?
              </p>
              <div className="flex flex-wrap gap-2">
                {["Currently pregnant", "Postpartum under 1 year", "Not applicable"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.pregnancy_related === opt}
                    onClick={() => setAnswer("pregnancy_related", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>
          </>
        )}

        {isMale && (
          <div className="py-6">
            <p className="font-medium text-gray-800 mb-3">
              Has your hair loss been gradually progressing, or did it start suddenly?
            </p>
            <div className="flex flex-wrap gap-2">
              {["Gradually over time", "Suddenly", "Comes and goes", "Not sure"].map((opt) => (
                <Chip
                  key={opt}
                  selected={answers.progression === opt}
                  onClick={() => setAnswer("progression", opt)}
                >
                  {opt}
                </Chip>
              ))}
            </div>
          </div>
        )}

        <div className="py-6">
          <p className="font-medium text-gray-800 mb-3">
            Have you experienced acne or oily skin in adulthood?
          </p>
          <div className="flex gap-2">
            {["Yes", "No"].map((opt) => (
              <Chip
                key={opt}
                selected={answers.adult_acne_oily_skin === opt}
                onClick={() => setAnswer("adult_acne_oily_skin", opt)}
              >
                {opt}
              </Chip>
            ))}
          </div>
        </div>

        <div className="py-6 last:pb-0">
          <p className="font-medium text-gray-800 mb-3">
            Have you noticed increased body or facial hair growth?
          </p>
          <div className="flex gap-2">
            {["Yes", "No"].map((opt) => (
              <Chip
                key={opt}
                selected={answers.excess_body_facial_hair === opt}
                onClick={() => setAnswer("excess_body_facial_hair", opt)}
              >
                {opt}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2 mb-2">{error}</p>}

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={onBack}
          className="text-gray-500 text-sm sm:text-base hover:text-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 rounded-full font-medium hover:bg-blue-700 text-sm sm:text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Section2;