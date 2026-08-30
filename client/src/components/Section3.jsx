// client/src/components/Section3.jsx
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

function Section3({ answers, setAnswers, onBack, onContinue }) {
  const [error, setError] = useState("");

  function setAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function toggleRecentChanges(opt) {
    const current = answers.past_6_months || [];
    let updated;
    if (opt === "None of these") {
      updated = current.includes(opt) ? [] : ["None of these"];
    } else {
      updated = current.includes(opt)
        ? current.filter((o) => o !== opt)
        : [...current.filter((o) => o !== "None of these"), opt];
    }
    setAnswer("past_6_months", updated);
  }

  function toggleTreatmentType(opt) {
    const current = answers.salon_treatment_types || [];
    const updated = current.includes(opt)
      ? current.filter((o) => o !== opt)
      : [...current, opt];
    setAnswer("salon_treatment_types", updated);
  }

  function handleContinue() {
    if (!answers.past_6_months || answers.past_6_months.length === 0) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.smoking) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (answers.smoking === "Yes" && !answers.smoking_amount) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.alcohol) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.hard_water) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.wash_frequency) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.heating_styling) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.salon_treatments) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (
      answers.salon_treatments === "Yes" &&
      (!answers.salon_treatment_types || answers.salon_treatment_types.length === 0)
    ) {
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
        ← Back to Section 2
      </button>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-blue-600 font-semibold text-sm">03</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Lifestyle & Environmental Triggers
          </h3>
        </div>
        <p className="text-gray-400 text-sm mt-1.5">
          A few questions about recent changes, habits, and your hair-care
          routine. · Section 3 of 5
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Q10 */}
        <div className="py-4 first:pt-0">
          <p className="font-medium text-gray-800 mb-1">
            In the past 6 months, have any of these happened to you?
          </p>
          <p className="text-sm text-gray-400 mb-3">Select all that apply.</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Major weight loss or crash dieting",
              "High stress or emotional trauma",
              "Fever or serious illness",
              "Recent surgery",
              "Change in location, water, or air quality",
              "None of these",
            ].map((opt) => (
              <Chip
                key={opt}
                selected={(answers.past_6_months || []).includes(opt)}
                onClick={() => toggleRecentChanges(opt)}
              >
                {opt}
                {opt === "Fever or serious illness" && (
                  <span className="block text-xs opacity-70 font-normal">
                    COVID, dengue, typhoid
                  </span>
                )}
              </Chip>
            ))}
          </div>
        </div>

        {/* Q11 - Habits */}
        <div className="py-4 last:pb-0">
          <p className="font-medium text-gray-800 mb-4">
            Habits & hair care routine
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Smoking */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Do you smoke?
              </p>
              <div className="flex gap-2">
                {["No", "Yes"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.smoking === opt}
                    onClick={() => setAnswer("smoking", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
              {answers.smoking === "Yes" && (
                <div className="mt-3 pl-3 border-l-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">
                    How many per day?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Under 5", "5-10", "Over 10"].map((opt) => (
                      <Chip
                        key={opt}
                        selected={answers.smoking_amount === opt}
                        onClick={() => setAnswer("smoking_amount", opt)}
                      >
                        {opt}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Alcohol */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Do you drink alcohol?
              </p>
              <div className="flex gap-2">
                {["Yes", "No"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.alcohol === opt}
                    onClick={() => setAnswer("alcohol", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Hard water */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Do you use hard water to wash your hair?
              </p>
              <div className="flex flex-wrap gap-2">
                {["Yes", "No", "Not sure"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.hard_water === opt}
                    onClick={() => setAnswer("hard_water", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Wash frequency */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                How often do you wash your hair?
              </p>
              <div className="flex flex-wrap gap-2">
                {["Daily", "Every other day", "Weekly"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.wash_frequency === opt}
                    onClick={() => setAnswer("wash_frequency", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Heating tools */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Do you regularly use heating tools or styling chemicals?
              </p>
              <div className="flex gap-2">
                {["Yes", "No"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.heating_styling === opt}
                    onClick={() => setAnswer("heating_styling", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Salon treatments */}
            <div className="border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Salon treatments (keratin, rebonding, smoothening)?
              </p>
              <div className="flex gap-2">
                {["Yes", "No"].map((opt) => (
                  <Chip
                    key={opt}
                    selected={answers.salon_treatments === opt}
                    onClick={() => setAnswer("salon_treatments", opt)}
                  >
                    {opt}
                  </Chip>
                ))}
              </div>
              {answers.salon_treatments === "Yes" && (
                <div className="mt-3 pl-3 border-l-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">
                    Which treatment(s)?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Keratin", "Rebonding", "Smoothening", "Other"].map(
                      (opt) => (
                        <Chip
                          key={opt}
                          selected={(
                            answers.salon_treatment_types || []
                          ).includes(opt)}
                          onClick={() => toggleTreatmentType(opt)}
                        >
                          {opt}
                        </Chip>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
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

export default Section3;