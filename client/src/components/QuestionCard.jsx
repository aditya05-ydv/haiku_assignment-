// client/src/components/QuestionCard.jsx
import recedingHairline from "../assets/Receding_ hairline.png";
import thinningCrown from "../assets/Thinning _at_ crown.png";
import wideningPart from "../assets/Widening_ part_ line.png";
import diffuseThinning from "../assets/Diffuse_ thinning.png";
import patchyLoss from "../assets/Patchy_hair__loss.png";

const patternImages = {
  "Receding hairline": recedingHairline,
  "Thinning at crown": thinningCrown,
  "Widening part line": wideningPart,
  "Diffuse thinning": diffuseThinning,
  "Patchy loss": patchyLoss,
};

function QuestionCard({ question, value, onChange }) {
  const { type, options } = question;

  if (question.key === "pattern") {
    const selected = value || [];
    function toggle(opt) {
      if (selected.includes(opt)) {
        onChange(selected.filter((o) => o !== opt));
      } else {
        onChange([...selected, opt]);
      }
    }
    return (
      <div>
        <p className="text-sm text-gray-500 mb-4">Select all that apply.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((opt) => {
            const isSelected = selected.includes(opt);
            const img = patternImages[opt];
            return (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`relative border rounded-2xl p-3 flex flex-col items-center text-center transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ✓
                  </span>
                )}
                {img && (
                  <img
                    src={img}
                    alt={opt}
                    className="w-full h-24 sm:h-28 object-contain mb-2"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === "number") {
    return (
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={question.placeholder || "Enter number"}
        className="border rounded-lg p-3 w-full"
      />
    );
  }

  if (type === "single") {
    return (
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`border rounded-lg p-3 text-left ${
              value === opt ? "bg-blue-600 text-white" : "hover:bg-blue-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (type === "multi") {
    const selected = value || [];
    function toggle(opt) {
      if (selected.includes(opt)) {
        onChange(selected.filter((o) => o !== opt));
      } else {
        onChange([...selected, opt]);
      }
    }
    return (
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`border rounded-lg p-3 text-left ${
              selected.includes(opt)
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (type === "yesno") {
    return (
      <div className="flex gap-3">
        {["Yes", "No"].map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`border rounded-lg px-6 py-3 ${
              value === opt ? "bg-blue-600 text-white" : "hover:bg-blue-50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  }

  if (type === "text") {
    return (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type here..."
        className="border rounded-lg p-3 w-full"
        rows={3}
      />
    );
  }

  if (type === "table") {
    const rows = question.rows;
    const rowValues = value || {};

    function updateRow(rowKey, val) {
      onChange({ ...rowValues, [rowKey]: { ...rowValues[rowKey], value: val } });
    }
    function updateFollowup(rowKey, followupKey, val) {
      onChange({
        ...rowValues,
        [rowKey]: { ...rowValues[rowKey], [followupKey]: val },
      });
    }

    return (
      <div className="flex flex-col gap-5">
        {rows.map((row) => (
          <div key={row.key} className="border rounded-lg p-3">
            <p className="font-medium mb-2">{row.label}</p>

            {row.type === "yesno" && (
              <div className="flex gap-3">
                {["Yes", "No"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateRow(row.key, opt)}
                    className={`border rounded-lg px-4 py-2 ${
                      rowValues[row.key]?.value === opt
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {row.type === "single" && (
              <div className="flex flex-wrap gap-2">
                {row.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateRow(row.key, opt)}
                    className={`border rounded-lg px-3 py-2 text-sm ${
                      rowValues[row.key]?.value === opt
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {row.followup && rowValues[row.key]?.value === "Yes" && (
              <div className="mt-3 pl-3 border-l-2 border-blue-300">
                <p className="text-sm mb-2">{row.followup.question}</p>
                {row.followup.type === "single" && (
                  <div className="flex flex-wrap gap-2">
                    {row.followup.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() =>
                          updateFollowup(row.key, row.followup.key, opt)
                        }
                        className={`border rounded-lg px-3 py-2 text-sm ${
                          rowValues[row.key]?.[row.followup.key] === opt
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {row.followup.type === "text" && (
                  <input
                    type="text"
                    value={rowValues[row.key]?.[row.followup.key] || ""}
                    onChange={(e) =>
                      updateFollowup(row.key, row.followup.key, e.target.value)
                    }
                    className="border rounded-lg p-2 w-full text-sm"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (type === "productTable") {
    const rows = question.rows;
    const columns = question.columns;
    const rowValues = value || {};

    function updateCell(rowKey, colKey, val) {
      onChange({
        ...rowValues,
        [rowKey]: { ...rowValues[rowKey], [colKey]: val },
      });
    }

    return (
      <div className="flex flex-col gap-5">
        {rows.map((rowLabel) => (
          <div key={rowLabel} className="border rounded-lg p-3">
            <p className="font-medium mb-3">{rowLabel}</p>
            {columns.map((col) => (
              <div key={col.key} className="mb-2">
                <p className="text-xs text-gray-500 mb-1">{col.label}</p>
                {(col.type === "bool" || col.type === "yesno") && (
                  <div className="flex gap-2">
                    {["Yes", "No"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateCell(rowLabel, col.key, opt)}
                        className={`border rounded px-3 py-1 text-sm ${
                          rowValues[rowLabel]?.[col.key] === opt
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {col.type === "single" && (
                  <div className="flex flex-wrap gap-2">
                    {col.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateCell(rowLabel, col.key, opt)}
                        className={`border rounded px-3 py-1 text-sm ${
                          rowValues[rowLabel]?.[col.key] === opt
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default QuestionCard;