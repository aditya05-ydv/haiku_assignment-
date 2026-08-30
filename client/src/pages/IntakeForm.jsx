// client/src/pages/IntakeForm.jsx
import { useLanguage } from "../context/LanguageContext";
import { text } from "../data/text";
import QuestionCard from "../components/QuestionCard";
import { useState } from "react";
import { questions, genderQuestion } from "../data/questions";


function IntakeForm() {
  const { language } = useLanguage();
  const [step, setStep] = useState(-1); // -1 = gender question
  const [sex, setSex] = useState(null);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // filter questions based on gender
  const activeQuestions = questions.filter((q) => {
    if (q.femaleOnly && sex !== "Female") return false;
    return true;
  });

  const currentQuestion =
    step === -1 ? genderQuestion : activeQuestions[step];

  const totalSteps = activeQuestions.length;

  function handleGenderSelect(value) {
    setSex(value);
    setStep(0);
  }

  function handleAnswer(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function goNext() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      submitData();
    }
  }

  async function submitData() {
    try {
      await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sex, ...answers }),
      });
    } catch (err) {
      console.error("Submit failed:", err);
    }
    setFinished(true);
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
    else setStep(-1);
  }
   if (finished) {
    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">
          {text.finishedTitle[language]}
        </h2>
        <pre className="bg-gray-100 text-left p-3 sm:p-4 rounded text-xs sm:text-sm overflow-auto">
          {JSON.stringify({ sex, ...answers }, null, 2)}
        </pre>
      </div>
    );
  }

  return (
        <div className="max-w-xl mx-auto p-4 sm:p-6">
      {/* Progress bar */}
      {step >= 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2">
            <span>Section {currentQuestion.section}</span>
            <span>
              {step + 1} / {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">
        {currentQuestion.question}
      </h2>

      {/* GENDER QUESTION */}
      {step === -1 && (
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleGenderSelect(opt)}
              className="border rounded-lg p-3 text-left hover:bg-blue-50"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {step >= 0 && (
        <QuestionCard
          question={currentQuestion}
          value={answers[currentQuestion.key]}
          onChange={(val) => handleAnswer(currentQuestion.key, val)}
        />
      )}

      {step >= 0 && (
        <div className="flex justify-between mt-6">
          <button onClick={goBack} className="text-gray-500 text-sm sm:text-base">
            {text.backButton[language]}
          </button>
          <button
            onClick={goNext}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base"
          >
            {text.nextButton[language]}
          </button>
        </div>
      )}
    </div>
  );
}

export default IntakeForm;