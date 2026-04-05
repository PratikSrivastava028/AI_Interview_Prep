import { BsLightningChargeFill } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";
import { FiRefreshCw } from "react-icons/fi";

const GenerateButton = ({ onClick, generating, loading, hasQuestions }) => (
  <button
    onClick={onClick}
    disabled={generating || loading}
    className="group flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98]"
  >
    {generating ? (
      <>
        <ImSpinner8 className="animate-spin w-4 h-4" /> Generating…
      </>
    ) : hasQuestions ? (
      <>
        <FiRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" /> Regenerate
      </>
    ) : (
      <>
        <BsLightningChargeFill className="w-4 h-4" /> Generate
      </>
    )}
  </button>
);

export default GenerateButton;
