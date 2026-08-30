import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Landing from "./pages/Landing";
import IntakeForm from "./pages/IntakeForm";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        {started ? <IntakeForm /> : <Landing onStart={() => setStarted(true)} />}
      </div>
    </LanguageProvider>
  );
}

export default App;