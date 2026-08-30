// client/src/components/Section5.jsx
import { useState } from "react";

function Section5({ answers, setAnswers, onBack, onContinue }) {
  const [error, setError] = useState("");

  function setField(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function handleContinue() {
    if (!answers.sample_type) {
      setError("Please select a sample preference before continuing.");
      return;
    }
    if (!answers.consent) {
      setError("Please respond to the consent question before continuing.");
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
        ← Back to Section 4
      </button>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-blue-600 font-semibold text-sm">05</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Sample & Consent
          </h3>
        </div>
        <p className="text-gray-400 text-sm mt-1.5">
          One last step. Tell us your sample preference and confirm your
          consent. · Section 5 of 5
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        <div className="py-4 first:pt-0">
          <p className="font-medium text-gray-800 mb-1">
            Which sample would you prefer to provide?
          </p>
          <p className="text-sm text-gray-400 mb-3">
            Choose the option you're most comfortable with.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            {["Saliva", "Blood", "Either is fine"].map((opt) => (
              <button
                key={opt}
                onClick={() => setField("sample_type", opt)}
                className={`border rounded-xl px-4 py-3 text-sm sm:text-base text-left transition-all flex-1 ${
                  answers.sample_type === opt
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-700 hover:border-blue-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="py-4 last:pb-0">
          <p className="font-medium text-gray-800 mb-1">
            Do you consent to sample collection and genetic analysis?
          </p>
          <p className="text-sm text-gray-400 mb-3">
            Your sample may be used for genetic analysis as part of your
            clinic assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            {["Yes, I consent", "No, I don't consent"].map((opt) => (
              <button
                key={opt}
                onClick={() => setField("consent", opt)}
                className={`border rounded-xl px-4 py-3 text-sm sm:text-base text-left transition-all flex-1 ${
                  answers.consent === opt
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-700 hover:border-blue-300"
                }`}
              >
                {opt}
              </button>
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
          Review answers
        </button>
      </div>
    </div>
  );
}

export default Section5;