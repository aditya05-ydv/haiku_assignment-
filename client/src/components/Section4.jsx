// client/src/components/Section4.jsx
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

const PRODUCTS = [
  { key: "medicated_shampoos", label: "Medicated shampoos", icon: "🧴" },
  { key: "hair_oils_serums", label: "Hair oils or serums", icon: "💧" },
  { key: "topical_minoxidil", label: "Topical minoxidil", icon: "🧪" },
  { key: "oral_minoxidil", label: "Oral minoxidil", icon: "💊" },
  { key: "supplements", label: "Supplements", icon: "💊" },
];

const PROCEDURES = [
  { key: "prp_gfc_iprf", label: "PRP, GFC or iPRF" },
  { key: "stem_cells_exosomes", label: "Stem cells or exosomes" },
  { key: "hair_transplant", label: "Hair transplant" },
  { key: "other_procedure", label: "Other" },
];

function Section4({ answers, setAnswers, onBack, onContinue }) {
  const [error, setError] = useState("");

  const selectedProducts = answers.products_selected || [];
  const selectedProcedures = answers.procedures_selected || [];

  function setField(path, value) {
    setAnswers((prev) => ({ ...prev, [path]: value }));
    setError("");
  }

  function toggleProduct(key) {
    if (key === "none") {
      setField("products_selected", selectedProducts.includes("none") ? [] : ["none"]);
      return;
    }
    const updated = selectedProducts.includes(key)
      ? selectedProducts.filter((k) => k !== key)
      : [...selectedProducts.filter((k) => k !== "none"), key];
    setField("products_selected", updated);
  }

  function toggleProcedure(key) {
    if (key === "none") {
      setField("procedures_selected", selectedProcedures.includes("none") ? [] : ["none"]);
      return;
    }
    const updated = selectedProcedures.includes(key)
      ? selectedProcedures.filter((k) => k !== key)
      : [...selectedProcedures.filter((k) => k !== "none"), key];
    setField("procedures_selected", updated);
  }

  function setProductDetail(productKey, field, value) {
    setAnswers((prev) => ({
      ...prev,
      product_details: {
        ...prev.product_details,
        [productKey]: {
          ...(prev.product_details?.[productKey] || {}),
          [field]: value,
        },
      },
    }));
    setError("");
  }

  function setProcedureDetail(procKey, field, value) {
    setAnswers((prev) => ({
      ...prev,
      procedure_details: {
        ...prev.procedure_details,
        [procKey]: {
          ...(prev.procedure_details?.[procKey] || {}),
          [field]: value,
        },
      },
    }));
    setError("");
  }

  function handleContinue() {
    if (selectedProducts.length === 0) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!selectedProducts.includes("none")) {
      for (const key of selectedProducts) {
        const d = answers.product_details?.[key];
        if (!d?.duration || !d?.helped || !d?.side_effects) {
          setError("Please complete all treatment details before continuing.");
          return;
        }
      }
    }
    if (selectedProcedures.length === 0) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (!selectedProcedures.includes("none")) {
      for (const key of selectedProcedures) {
        const d = answers.procedure_details?.[key];
        if (!d?.sessions || !d?.helped) {
          setError("Please complete all procedure details before continuing.");
          return;
        }
      }
    }
    if (!answers.past_treatment_side_effects) {
      setError("Please answer all questions before continuing.");
      return;
    }
    if (
      answers.past_treatment_side_effects === "Yes" &&
      !answers.side_effects_description
    ) {
      setError("Please describe your side effects before continuing.");
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
        ← Back to Section 3
      </button>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-blue-600 font-semibold text-sm">04</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Current Hair Care & Treatments
          </h3>
        </div>
        <p className="text-gray-400 text-sm mt-1.5">
          Tell us what you've tried so far. We'll only ask for details about
          treatments you've used. · Section 4 of 5
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Q12 - Products */}
        <div className="py-4 first:pt-0">
          <p className="font-medium text-gray-800 mb-1">
            Have you used any of these hair-loss or scalp treatments?
          </p>
          <p className="text-sm text-gray-400 mb-3">Select all that apply.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {PRODUCTS.map((p) => (
              <Chip
                key={p.key}
                selected={selectedProducts.includes(p.key)}
                onClick={() => toggleProduct(p.key)}
              >
                <span className="mr-1">{p.icon}</span>
                {p.label}
              </Chip>
            ))}
            <Chip
              selected={selectedProducts.includes("none")}
              onClick={() => toggleProduct("none")}
            >
              None of these
            </Chip>
          </div>

          {/* Progressive disclosure per product */}
          <div className="flex flex-col gap-3">
            {PRODUCTS.filter((p) => selectedProducts.includes(p.key)).map(
              (p) => {
                const d = answers.product_details?.[p.key] || {};
                return (
                  <div
                    key={p.key}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {p.icon} {p.label}
                    </p>

                    <p className="text-xs text-gray-500 mb-1.5">
                      How long have you used it?
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["Under 3 months", "3-6 months", "Over 6 months"].map(
                        (opt) => (
                          <Chip
                            key={opt}
                            selected={d.duration === opt}
                            onClick={() =>
                              setProductDetail(p.key, "duration", opt)
                            }
                          >
                            {opt}
                          </Chip>
                        )
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mb-1.5">
                      Has it helped?
                    </p>
                    <div className="flex gap-2 mb-3">
                      {["Yes", "No"].map((opt) => (
                        <Chip
                          key={opt}
                          selected={d.helped === opt}
                          onClick={() => setProductDetail(p.key, "helped", opt)}
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 mb-1.5">
                      Any side effects?
                    </p>
                    <div className="flex gap-2">
                      {["Yes", "No"].map((opt) => (
                        <Chip
                          key={opt}
                          selected={d.side_effects === opt}
                          onClick={() =>
                            setProductDetail(p.key, "side_effects", opt)
                          }
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Q13 - Procedures */}
        <div className="py-4">
          <p className="font-medium text-gray-800 mb-1">
            Have you had any of these in-clinic procedures?
          </p>
          <p className="text-sm text-gray-400 mb-3">
            Select the ones you've had.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {PROCEDURES.map((p) => (
              <Chip
                key={p.key}
                selected={selectedProcedures.includes(p.key)}
                onClick={() => toggleProcedure(p.key)}
              >
                {p.label}
              </Chip>
            ))}
            <Chip
              selected={selectedProcedures.includes("none")}
              onClick={() => toggleProcedure("none")}
            >
              None of these
            </Chip>
          </div>

          <div className="flex flex-col gap-3">
            {PROCEDURES.filter((p) => selectedProcedures.includes(p.key)).map(
              (p) => {
                const d = answers.procedure_details?.[p.key] || {};
                return (
                  <div
                    key={p.key}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {p.label}
                    </p>

                    <p className="text-xs text-gray-500 mb-1.5">
                      How many sessions?
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {["1-3", "4-6", "Over 6"].map((opt) => (
                        <Chip
                          key={opt}
                          selected={d.sessions === opt}
                          onClick={() =>
                            setProcedureDetail(p.key, "sessions", opt)
                          }
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 mb-1.5">
                      Did it help?
                    </p>
                    <div className="flex gap-2">
                      {["Yes", "No"].map((opt) => (
                        <Chip
                          key={opt}
                          selected={d.helped === opt}
                          onClick={() =>
                            setProcedureDetail(p.key, "helped", opt)
                          }
                        >
                          {opt}
                        </Chip>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Q14 */}
        <div className="py-4 last:pb-0">
          <p className="font-medium text-gray-800 mb-3">
            Have you experienced side effects or a poor response to any past
            treatment?
          </p>
          <div className="flex gap-2 mb-3">
            {["Yes", "No"].map((opt) => (
              <Chip
                key={opt}
                selected={answers.past_treatment_side_effects === opt}
                onClick={() => setField("past_treatment_side_effects", opt)}
              >
                {opt}
              </Chip>
            ))}
          </div>
          {answers.past_treatment_side_effects === "Yes" && (
            <div className="pl-3 border-l-2 border-blue-200">
              <p className="text-sm text-gray-600 mb-2">
                Tell us a little about what happened.
              </p>
              <textarea
                value={answers.side_effects_description || ""}
                onChange={(e) =>
                  setField("side_effects_description", e.target.value)
                }
                rows={3}
                className="border border-gray-200 rounded-lg p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
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

export default Section4;