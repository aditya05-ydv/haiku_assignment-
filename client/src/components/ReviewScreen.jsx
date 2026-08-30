// client/src/components/ReviewScreen.jsx
import { useState } from "react";
import { jsPDF } from "jspdf";

function fmt(val) {
  if (val === undefined || val === null || val === "") return "Not applicable";
  if (Array.isArray(val)) return val.length ? val.join(", ") : "Not applicable";
  return val;
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-gray-800 text-sm font-medium sm:text-right">
        {fmt(value)}
      </span>
    </div>
  );
}

function SectionBlock({ number, title, onEdit, children }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 sm:p-5 mb-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-800 text-sm sm:text-base">
          {number} · {title}
        </p>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-blue-600 text-xs sm:text-sm hover:underline"
          >
            Edit
          </button>
        )}
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}

function buildProductLines(answers) {
  const products = answers.products_selected || [];
  if (products.includes("none") || products.length === 0) return ["None of these"];
  const labels = {
    medicated_shampoos: "Medicated shampoos",
    hair_oils_serums: "Hair oils or serums",
    topical_minoxidil: "Topical minoxidil",
    oral_minoxidil: "Oral minoxidil",
    supplements: "Supplements",
  };
  return products.map((key) => {
    const d = answers.product_details?.[key] || {};
    return `${labels[key]}: used ${d.duration || "-"}, helped: ${d.helped || "-"}, side effects: ${d.side_effects || "-"}`;
  });
}

function buildProcedureLines(answers) {
  const procs = answers.procedures_selected || [];
  if (procs.includes("none") || procs.length === 0) return ["None of these"];
  const labels = {
    prp_gfc_iprf: "PRP, GFC or iPRF",
    stem_cells_exosomes: "Stem cells or exosomes",
    hair_transplant: "Hair transplant",
    other_procedure: "Other",
  };
  return procs.map((key) => {
    const d = answers.procedure_details?.[key] || {};
    return `${labels[key]}: sessions ${d.sessions || "-"}, helped: ${d.helped || "-"}`;
  });
}

function ReviewScreen({ answers, onEditSection, onBack, onReset }) {
  const [submitted, setSubmitted] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isMale = answers.patient_sex === "Male";
  const productLines = buildProductLines(answers);
  const procedureLines = buildProcedureLines(answers);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      await fetch("https://haiku-assignment-backend.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
    } catch (err) {
      console.error("Submit failed:", err);
    }
    setSubmitting(false);
    setSubmitted(true);
  }

    function downloadPDF() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 12;
    const right = 198;
    const colValueX = 130;
    let y = 14;

    function line(label, value, opts = {}) {
      doc.setFont(undefined, "normal");
      doc.setFontSize(opts.size || 8.5);
      const text = doc.splitTextToSize(String(fmt(value)), right - colValueX);
      doc.text(String(label), left, y);
      doc.text(text, colValueX, y);
      y += 3.6 * Math.max(text.length, 1);
    }

    function sectionHeader(title) {
      y += 1.5;
      doc.setFont(undefined, "bold");
      doc.setFontSize(9.5);
      doc.text(title, left, y);
      doc.setDrawColor(210);
      doc.setLineWidth(0.2);
      doc.line(left, y + 1, right, y + 1);
      y += 5;
    }

    doc.setFont(undefined, "bold");
    doc.setFontSize(14);
    doc.text("GENOROOT", left, y);
    y += 5.5;
    doc.setFontSize(10);
    doc.text("Hair & Scalp Intake", left, y);
    y += 4.5;
    doc.setFont(undefined, "normal");
    doc.setFontSize(8);
    doc.text(`Submitted: ${new Date().toLocaleString()}`, left, y);
    doc.text("Status: Completed", right, y, { align: "right" });
    y += 4;
    doc.setDrawColor(150);
    doc.setLineWidth(0.3);
    doc.line(left, y, right, y);
    y += 4;

    sectionHeader("01 \u00B7 Personal & Family Hair Loss History");
    line("Age when hair loss began", answers.age_hair_loss_began);
    line("Duration", answers.duration);
    line("Family history", answers.family_history);
    line("Pattern", answers.pattern);

    sectionHeader("02 \u00B7 Hormonal & Health Influences");
    line("Diagnosed conditions", answers.diagnosed_conditions);
    if (isMale) {
      line("Progression", answers.progression);
    } else {
      line("Menstrual cycle", answers.menstrual_cycle);
      line("Pregnancy-related hair loss", answers.pregnancy_related);
    }
    line("Acne / oily skin", answers.adult_acne_oily_skin);
    line("Body / facial hair growth", answers.excess_body_facial_hair);

    sectionHeader("03 \u00B7 Lifestyle & Environmental Triggers");
    line("Recent triggers", answers.past_6_months);
    line("Smoking", answers.smoking);
    if (answers.smoking === "Yes") line("Cigarettes per day", answers.smoking_amount);
    line("Alcohol", answers.alcohol);
    line("Hard water", answers.hard_water);
    line("Hair-wash frequency", answers.wash_frequency);
    line("Heating tools / styling chemicals", answers.heating_styling);
    line("Salon treatments", answers.salon_treatments);
    if (answers.salon_treatments === "Yes") line("Treatment type", answers.salon_treatment_types);

    sectionHeader("04 \u00B7 Current Hair Care & Treatments");
    if (
  productLines.length === 1 &&
  productLines[0] === "None of these"
) {
  line("Products", "None of these");
} else {
  productLines.forEach((l) => {
    const [label, ...rest] = l.split(":");
    line(label, rest.join(":").trim());
  });
}

if (
  procedureLines.length === 1 &&
  procedureLines[0] === "None of these"
) {
  line("In-clinic procedures", "None of these");
} else {
  procedureLines.forEach((l) => {
    const [label, ...rest] = l.split(":");
    line(label, rest.join(":").trim());
  });
}
    line("Side effects / poor response", answers.past_treatment_side_effects);
    if (answers.past_treatment_side_effects === "Yes") {
      line("Description", answers.side_effects_description, { size: 8 });
    }

    sectionHeader("05 \u00B7 Sample & Consent");
    line("Preferred sample", answers.sample_type);
    line("Consent to sample collection and genetic analysis", answers.consent);

    y += 3;
    doc.setDrawColor(150);
    doc.line(left, y, right, y);
    y += 4;
    doc.setFont(undefined, "bold");
    doc.setFontSize(8.5);
    doc.text("Intake completed", left, y);
    y += 3.8;
    doc.setFont(undefined, "normal");
    doc.setFontSize(7.5);
    doc.text("This summary reflects the answers submitted by the patient.", left, y);

    doc.save("hair-scalp-intake-summary.pdf");
  }

  if (submitted) {
    return (
      <div className="max-w-[850px] mx-auto bg-white border border-gray-100 shadow-sm rounded-[24px] px-5 sm:px-8 md:px-10 py-6 sm:py-8 my-8 sm:my-12">
        <div className="text-center mb-8">
          <p className="text-green-600 font-semibold mb-2">✓ Intake submitted</p>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Your intake is complete
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Your responses have been recorded and are ready for your care team.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-8 text-center">
          <p className="text-sm font-medium text-gray-700 mb-1">
            What happens next?
          </p>
          <p className="text-sm text-gray-500">
            Your care team can review your information before your consultation.
          </p>
        </div>

        <h4 className="font-semibold text-gray-800 mb-4">
          Your submitted intake
        </h4>

        <SectionBlock number="01" title="Personal & Family Hair Loss History">
          <Row label="Age when hair loss began" value={answers.age_hair_loss_began} />
          <Row label="Duration" value={answers.duration} />
          <Row label="Family history" value={answers.family_history} />
          <Row label="Pattern" value={answers.pattern} />
        </SectionBlock>

        <SectionBlock number="02" title="Hormonal & Health Influences">
          <Row label="Diagnosed conditions" value={answers.diagnosed_conditions} />
          {isMale ? (
            <Row label="Progression" value={answers.progression} />
          ) : (
            <>
              <Row label="Menstrual cycle" value={answers.menstrual_cycle} />
              <Row label="Pregnancy-related hair loss" value={answers.pregnancy_related} />
            </>
          )}
          <Row label="Acne / oily skin" value={answers.adult_acne_oily_skin} />
          <Row label="Body / facial hair growth" value={answers.excess_body_facial_hair} />
        </SectionBlock>

        <SectionBlock number="03" title="Lifestyle & Environmental Triggers">
          <Row label="Recent triggers" value={answers.past_6_months} />
          <Row label="Smoking" value={answers.smoking} />
          {answers.smoking === "Yes" && (
            <Row label="Cigarettes per day" value={answers.smoking_amount} />
          )}
          <Row label="Alcohol" value={answers.alcohol} />
          <Row label="Hard water" value={answers.hard_water} />
          <Row label="Hair-wash frequency" value={answers.wash_frequency} />
          <Row label="Heating tools / styling chemicals" value={answers.heating_styling} />
          <Row label="Salon treatments" value={answers.salon_treatments} />
          {answers.salon_treatments === "Yes" && (
            <Row label="Treatment type" value={answers.salon_treatment_types} />
          )}
        </SectionBlock>

        <SectionBlock number="04" title="Current Hair Care & Treatments">
          <p className="text-xs text-gray-400 pt-2 pb-1">Products</p>
          {productLines.map((line, i) => (
            <Row key={i} label={line.split(":")[0]} value={line.split(":").slice(1).join(":").trim()} />
          ))}
          <p className="text-xs text-gray-400 pt-3 pb-1">Procedures</p>
          {procedureLines.map((line, i) => (
            <Row key={i} label={line.split(":")[0]} value={line.split(":").slice(1).join(":").trim()} />
          ))}
          <Row label="Side effects / poor response" value={answers.past_treatment_side_effects} />
          {answers.past_treatment_side_effects === "Yes" && (
            <Row label="Description" value={answers.side_effects_description} />
          )}
        </SectionBlock>

        <SectionBlock number="05" title="Sample & Consent">
          <Row label="Preferred sample" value={answers.sample_type} />
          <Row label="Consent" value={answers.consent} />
        </SectionBlock>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={downloadPDF}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-full font-medium hover:bg-gray-50"
          >
            Start New Intake
          </button>
        </div>

        {showResetConfirm && (
          <div className="mt-4 border border-gray-200 rounded-xl p-4 sm:p-5 bg-gray-50">
            <p className="font-medium text-gray-800 mb-1">
              Start a new intake?
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Your current intake has already been submitted. Starting a new
              intake will clear the current form on this device and begin a
              fresh intake.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="w-full sm:w-auto border border-gray-200 text-gray-600 px-6 py-2.5 rounded-full font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onReset}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700"
              >
                Start New Intake
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6 text-center">
          Need to correct something? Please contact the clinic.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[850px] mx-auto bg-white border border-gray-100 shadow-sm rounded-[24px] px-5 sm:px-8 md:px-10 py-6 sm:py-8 my-8 sm:my-12">
      <button
        onClick={onBack}
        className="text-sm text-gray-400 hover:text-blue-600 mb-4"
      >
        ← Back to Section 5
      </button>

      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          Review your answers
        </h3>
        <p className="text-gray-400 text-sm">
          Take a moment to check your answers before submitting.
        </p>
      </div>

      <SectionBlock number="01" title="Personal & Family Hair Loss History" onEdit={() => onEditSection(1)}>
        <Row label="Age when hair loss began" value={answers.age_hair_loss_began} />
        <Row label="Duration" value={answers.duration} />
        <Row label="Family history" value={answers.family_history} />
        <Row label="Pattern" value={answers.pattern} />
      </SectionBlock>

      <SectionBlock number="02" title="Hormonal & Health Influences" onEdit={() => onEditSection(2)}>
        <Row label="Diagnosed conditions" value={answers.diagnosed_conditions} />
        {isMale ? (
          <Row label="Progression" value={answers.progression} />
        ) : (
          <>
            <Row label="Menstrual cycle" value={answers.menstrual_cycle} />
            <Row label="Pregnancy-related hair loss" value={answers.pregnancy_related} />
          </>
        )}
        <Row label="Acne / oily skin" value={answers.adult_acne_oily_skin} />
        <Row label="Body / facial hair growth" value={answers.excess_body_facial_hair} />
      </SectionBlock>

      <SectionBlock number="03" title="Lifestyle & Environmental Triggers" onEdit={() => onEditSection(3)}>
        <Row label="Recent triggers" value={answers.past_6_months} />
        <Row label="Smoking" value={answers.smoking} />
        {answers.smoking === "Yes" && (
          <Row label="Cigarettes per day" value={answers.smoking_amount} />
        )}
        <Row label="Alcohol" value={answers.alcohol} />
        <Row label="Hard water" value={answers.hard_water} />
        <Row label="Hair-wash frequency" value={answers.wash_frequency} />
        <Row label="Heating tools / styling chemicals" value={answers.heating_styling} />
        <Row label="Salon treatments" value={answers.salon_treatments} />
        {answers.salon_treatments === "Yes" && (
          <Row label="Treatment type" value={answers.salon_treatment_types} />
        )}
      </SectionBlock>

      <SectionBlock number="04" title="Current Hair Care & Treatments" onEdit={() => onEditSection(4)}>
        <p className="text-xs text-gray-400 pt-2 pb-1">Products</p>
        {productLines.map((line, i) => (
          <Row key={i} label={line.split(":")[0]} value={line.split(":").slice(1).join(":").trim()} />
        ))}
        <p className="text-xs text-gray-400 pt-3 pb-1">Procedures</p>
        {procedureLines.map((line, i) => (
          <Row key={i} label={line.split(":")[0]} value={line.split(":").slice(1).join(":").trim()} />
        ))}
        <Row label="Side effects / poor response" value={answers.past_treatment_side_effects} />
        {answers.past_treatment_side_effects === "Yes" && (
          <Row label="Description" value={answers.side_effects_description} />
        )}
      </SectionBlock>

      <SectionBlock number="05" title="Sample & Consent" onEdit={() => onEditSection(5)}>
        <Row label="Preferred sample" value={answers.sample_type} />
        <Row label="Consent" value={answers.consent} />
      </SectionBlock>

      <div className="bg-gray-50 rounded-xl p-4 mt-6 mb-6 text-center">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Ready to submit?
        </p>
        <p className="text-xs text-gray-500">
          This will send your completed intake to the clinic.
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          className="text-gray-500 text-sm sm:text-base hover:text-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 rounded-full font-medium hover:bg-blue-700 text-sm sm:text-base disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit intake"}
        </button>
      </div>
    </div>
  );
}

export default ReviewScreen;