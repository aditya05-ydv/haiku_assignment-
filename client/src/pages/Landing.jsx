// client/src/pages/Landing.jsx
import { useState } from "react";
import Section5 from "../components/Section5";
import ReviewScreen from "../components/ReviewScreen";
import Section4 from "../components/Section4";
import Section3 from "../components/Section3";
import Section2 from "../components/Section2";
import Section1 from "../components/Section1";
import doctorImage from "../assets/doctor_image.png";
import logo from "../assets/logo_svg.svg";
import { text } from "../data/text";


function Landing({ onStart }) {
    const [currentSection, setCurrentSection] = useState(1);
      function handleStart() {
    setCurrentSection(1);
    setTimeout(() => {
      document.getElementById("section-1")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }
  const [answers, setAnswers] = useState({});

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-6 sm:h-8" />
          <h1 className="text-lg sm:text-xl font-bold text-blue-600">
            {text.clinicName}
          </h1>
        </div>
        
      </nav>

      {/* Hero */}
      <div
        className="relative mx-4 sm:mx-56 md:mx-24 lg:mx-32 xl:mx-64 mt-6 sm:mt-12 mb-4 sm:mb-6 rounded-2xl flex items-center justify-center sm:justify-between px-5 sm:px-8 py-8 sm:py-10 md:py-12 min-h-[260px] sm:min-h-[340px] sm:h-[340px]"
        style={{ backgroundColor: "#5F6FFF" }}
      >
        <div className="text-center md:text-left max-w-[20rem] sm:max-w-[20rem] md:max-w-[16rem] lg:max-w-[18rem] xl:max-w-[22rem] z-10 md:ml-0 lg:ml-10 xl:ml-32 w-full">
         <h2 className="text-xl sm:text-xl md:text-2xl font-bold text-white mb-3 leading-[1.1]">
  {text.heroTitle.map((line, i) => (
    <div key={i} className="leading-[1.1]">
      {line}
    </div>
  ))}
</h2>
          <p className="text-blue-100 mb-6 text-xs sm:text-xs md:text-sm leading-relaxed">
  {text.heroSubtitle}
</p>
         <button
  onClick={handleStart}
  className="bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-blue-50 w-full sm:w-auto"
>
  {text.startButton}
</button>
        </div>

        <img
          src={doctorImage}
          alt="doctor"
          className="hidden md:block absolute right-0 lg:right-10 xl:right-20 bottom-0 w-40 lg:w-56 xl:w-80 object-contain"
        />
      </div>
            {/* Intro cards section */}
            {/* Intro cards section */}
      <div className="px-4 sm:px-6 md:px-10 py-12 sm:py-16 max-w-6xl mx-auto text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Let's get to know what's going on
        </h3>
       <p className="text-gray-500 max-w-xl mx-auto mb-10 text-sm sm:text-base">
  Just a few questions, grouped into 5 quick steps. Your answers help
  us understand your hair and scalp concerns before your
  consultation.
</p>

        {(() => {
          const steps = [
  {
    num: "01",
    title: "Personal & Family",
    desc: "Hair loss history and family patterns",
    short: "Hair loss history",
  },
  {
    num: "02",
    title: "Health & Hormonal",
    desc: "Health factors that may affect hair loss",
    short: "Health & hormonal",
  },
  {
    num: "03",
    title: "Lifestyle & Triggers",
    desc: "Recent changes, habits and environment",
    short: "Lifestyle & triggers",
  },
  {
    num: "04",
    title: "Hair Care & Treatments",
    desc: "Products, procedures and treatment history",
    short: "Hair care & treatments",
  },
  {
    num: "05",
    title: "Sample & Consent",
    desc: "Sample preference and consent",
    short: "Sample & consent",
  },
];

          return (
            <>
              {/* Mobile: single combined card */}
              <div className="sm:hidden border border-gray-200 rounded-2xl bg-white shadow-sm divide-y divide-gray-100">
                {steps.map((card) => (
                  <div key={card.num} className="flex gap-3 p-4 text-left">
                    <span className="text-sm font-semibold text-blue-600 shrink-0">
                      {card.num}
                    </span>
                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-0.5">
                        {card.title}
                      </h4>
                      <p className="text-gray-500 text-sm">{card.short}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet/Desktop: separate cards */}
              {/* Tablet/Desktop: separate cards */}
<div className="hidden sm:grid landing-steps-grid grid-cols-2 lg:grid-cols-6 gap-6">
  {steps.map((card) => (
    <div
      key={card.num}
      className={`landing-step-card border border-gray-200 rounded-2xl p-6 text-left bg-white shadow-sm lg:col-span-2 ${
        card.num === "04" ? "lg:col-start-2" : ""
      }`}
    >
      <span className="landing-step-num text-sm font-semibold text-blue-600">
        {card.num}
      </span>

      <div className="landing-step-content">
        <h4 className="landing-step-title text-lg font-semibold text-gray-800 mt-2 mb-1">
          {card.title}
        </h4>

        <p className="landing-step-desc text-gray-500 text-sm">
          {card.desc}
        </p>
      </div>
    </div>
  ))}
</div>
            </>
          );
        })()}
      </div>
      <div id="intake-start">
        {currentSection === 1 && (
          <Section1
          answers={answers}
          setAnswers={setAnswers}
          onContinue={() => setCurrentSection(2)}
        />
      )}
      {currentSection === 2 && (
        <Section2
          answers={answers}
          setAnswers={setAnswers}
          onBack={() => setCurrentSection(1)}
          onContinue={() => setCurrentSection(3)}
        />
      )}
               {currentSection === 3 && (
        <Section3
          answers={answers}
          setAnswers={setAnswers}
          onBack={() => setCurrentSection(2)}
          onContinue={() => setCurrentSection(4)}
        />
      )}
            {currentSection === 4 && (
        <Section4
          answers={answers}
          setAnswers={setAnswers}
          onBack={() => setCurrentSection(3)}
          onContinue={() => setCurrentSection(5)}
        />
      )}
            {currentSection === 5 && (
        <Section5
          answers={answers}
          setAnswers={setAnswers}
          onBack={() => setCurrentSection(4)}
          onContinue={() => setCurrentSection(6)}
        />
      )}
      {currentSection === 6 && (
        <ReviewScreen
          answers={answers}
          onEditSection={(n) => setCurrentSection(n)}
          onBack={() => setCurrentSection(5)}
          onReset={() => {
            setAnswers({});
            setCurrentSection(1);
          }}
        />
      )}
      </div>
    </div>
  );
}

export default Landing;