import { BookOpen, ChevronDown, Sparkles, Zap } from "lucide-react";

const Sidebar_grammer = ({ setInputText, selectedMode, setSelectedMode ,currentDetails,setcurrentDetails}) => {
  const quickActions = [
    "I has a apple and two banana.",
    "Their going to the park tommorow.",
    "She don't know nothing about it.",
    "The data shows that the results are significant.",
    "Me and my friend was late for the meeting.",
  ];

  return (
    <>
      <div className="lg:w-80">
        <div className="bg-dark-navy rounded-2xl border border-gray-700 p-6 sticky top-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Writing Statistics
          </h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Total Words Checked</span>
                <span className="font-bold text-teal text-xl">{currentDetails?.words_checked || 0}/{currentDetails?.original_text?.split(" ")?.length || 0}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-teal h-2 rounded-full"
                  style={{ width: ((currentDetails?.words_checked/currentDetails?.original_text?.split(" ")?.length)*100).toString()+"%" || "85%"  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl">
                <div className="text-2xl font-bold text-teal">{(currentDetails?.accuracy_score*100 || 0).toFixed(0)}%</div>
                <div className="text-sm text-gray-400">Accuracy Score</div>
              </div>
              <div className="bg-gray-900 border border-gray-700 p-4 rounded-xl">
                <div className="text-2xl font-bold text-teal">{currentDetails?.error_fixed || 0}</div>
                <div className="text-sm text-gray-400">Errors Fixed</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Grammar Modes</h4>
              <div className="space-y-3">
                {grammarModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border ${
                      selectedMode === mode.id
                        ? `${mode.color} ${mode.bgColor} text-white`
                        : "border-gray-700 text-gray-300 hover:bg-gray-800"
                    } transition-colors`}
                  >
                    <mode.icon className="h-5 w-5" />
                    <span className="font-medium">{mode.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <h4 className="font-semibold text-white mb-3">Quick Examples</h4>
              <div className="space-y-2">
                {quickActions.map((text, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(text)}
                    className="w-full text-left p-3 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-lg text-sm transition-colors border border-gray-700"
                  >
                    "{text}"
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <h4 className="font-semibold text-white mb-3">Pro Tips</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-2 h-2 bg-teal rounded-full"></div>
                  <span>Use active voice for clearer sentences</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-2 h-2 bg-teal rounded-full"></div>
                  <span>Vary sentence length for better flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 w-2 h-2 bg-teal rounded-full"></div>
                  <span>Read your text aloud to catch awkward phrasing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar_grammer;

const grammarModes = [
  {
    id: "standard",
    name: "Standard",
    icon: BookOpen,
    color: "border-purple-600",
    bgColor: "bg-purple-600",
  },
  {
    id: "creative",
    name: "Creative",
    icon: Sparkles,
    color: "border-teal",
    bgColor: "bg-teal",
  },
  {
    id: "academic",
    name: "Academic",
    icon: Zap,
    color: "border-purple-600",
    bgColor: "bg-purple-600",
  },
  {
    id: "concise",
    name: "Concise",
    icon: ChevronDown,
    color: "border-teal",
    bgColor: "bg-teal",
  },
];
