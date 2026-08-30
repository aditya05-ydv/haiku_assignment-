// client/src/components/Section1.jsx
import { useState } from "react";
import recedingHairline from "../assets/Receding_ hairline.png";
import thinningCrown from "../assets/Thinning _at_ crown.png";
import wideningPart from "../assets/Widening_ part_ line.png";
import diffuseThinning from "../assets/Diffuse_ thinning.png";
import patchyLoss from "../assets/Patchy_hair__loss.png";
import Sudden from "../assets/Sudden excessive shedding.png";

const patternImages = {
  "Receding hairline": recedingHairline,
  "Thinning at crown": thinningCrown,
  "Widening part line": wideningPart,
  "Diffuse thinning": diffuseThinning,
  "Patchy loss": patchyLoss,
};

function Section1({ answers, setAnswers, onContinue }) {
  const [error, setError] = useState("");

  function setAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError("");
  }

  function toggleMulti(key, opt) {
    const current = answers[key] || [];
    const updated = current.includes(opt)
      ? current.filter((o) => o !== opt)
      : [...current, opt];
    setAnswer(key, updated);
  }

  function handleContinue() {
    if (!answers.age_hair_loss_began) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.duration) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.family_history || answers.family_history.length === 0) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!answers.pattern || answers.pattern.length === 0) {
      setError("Please answer all questions before continuing.");
      return;
    }
    setError("");
    onContinue();
  }

  return (
    <div
      id="section-1"
      className="max-w-[850px] mx-auto bg-white border border-gray-100 shadow-sm rounded-[24px] px-5 sm:px-8 md:px-10 py-6 sm:py-8 mt-2 sm:mt-3 mb-8 sm:mb-12"
    >
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-blue-600 font-semibold text-sm">01</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Personal & Family Hair Loss History
          </h3>
        </div>
        <p className="text-gray-400 text-sm mt-1.5">
           Section 1 of 5
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        <div className="py-4 first:pt-0">
          <p className="font-medium text-gray-800 mb-3">
            How old were you when you first noticed hair loss?
          </p>
          <div className="flex items-center gap-2 max-w-[200px]">
            <input
              type="number"
              value={answers.age_hair_loss_began || ""}
              onChange={(e) =>
                setAnswer("age_hair_loss_began", e.target.value)
              }
              className="border border-gray-200 rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500 text-sm">years old</span>
          </div>
        </div>

        <div className="py-4">
          <p className="font-medium text-gray-800 mb-3">
            How long have you been experiencing hair loss?
          </p>
          <div className="flex flex-wrap gap-2">
            {["Less than 6 months", "6-12 months", "Over a year"].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswer("duration", opt)}
                  className={`border rounded-full px-4 py-2 text-sm transition-all ${
                    answers.duration === opt
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 text-gray-600 hover:border-blue-300"
                  }`}
                >
                  {opt}
                </button>
              )
            )}
          </div>
        </div>

        <div className="py-4">
          <p className="font-medium text-gray-800 mb-1">
            Does hair loss or thinning run in your family?
          </p>
          <p className="text-sm text-gray-400 mb-3">Select all that apply.</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Father had hair loss",
              "Mother had hair loss",
              "Siblings with thinning or baldness",
              "No known family history",
            ].map((opt) => {
              const selected = (answers.family_history || []).includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleMulti("family_history", opt)}
                  className={`border rounded-full px-4 py-2 text-sm transition-all ${
                    selected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 text-gray-600 hover:border-blue-300"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="py-4 last:pb-0">
          <p className="font-medium text-gray-800 mb-1">
            Which pattern best describes what you're experiencing?
          </p>
          <p className="text-sm text-gray-400 mb-4">Select all that apply.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              "Receding hairline",
              "Thinning at crown",
              "Widening part line",
              "Diffuse thinning",
              "Patchy loss",
            ].map((opt) => {
              const selected = (answers.pattern || []).includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleMulti("pattern", opt)}
                  className={`relative border rounded-2xl p-2.5 sm:p-3 flex flex-col items-center text-center transition-all ${
                    selected
                      ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {selected && (
                    <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                  <img
                    src={patternImages[opt]}
                    alt={opt}
                    className="w-full h-20 sm:h-24 object-contain mb-2"
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    {opt}
                  </span>
                </button>
              );
            })}

            <button
              onClick={() => toggleMulti("pattern", "Sudden excessive shedding")}
              className={`relative border rounded-2xl p-2.5 sm:p-3 flex flex-col items-center text-center transition-all min-h-[100px] sm:min-h-[120px] ${
                (answers.pattern || []).includes("Sudden excessive shedding")
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              {(answers.pattern || []).includes("Sudden excessive shedding") && (
                <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  ✓
                </span>
              )}
              <img
                src={Sudden}
                alt="Sudden excessive shedding"
                className="w-full h-20 sm:h-24 object-contain mb-2"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                Sudden excessive shedding
              </span>
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2 mb-2">{error}</p>}

      <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-100">
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

export default Section1;