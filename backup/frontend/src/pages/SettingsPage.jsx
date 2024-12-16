import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const DEFAULT_THEME = "dim";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-base-200 overflow-auto">
      {/* Left side for themes */}
      <div className="w-full lg:w-1/2 p-6 lg:ml-16">
        <div className="space-y-4">
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {THEMES.filter((t) => t !== DEFAULT_THEME && t !== "dark").map(
              (t) => (
                <button
                  key={t}
                  className={`group flex flex-col items-center gap-4 p-4 rounded-lg transition-colors 
            ${
              theme === t
                ? "bg-primary text-primary-content border-4 border-secondary shadow-lg"
                : "hover:bg-base-200/50"
            }`}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className="relative h-12 w-full rounded-md overflow-hidden"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-center truncate w-full">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right side for preview */}
      <div className="w-full lg:w-1/2 p-6 flex items-center justify-center flex-col">
        <div className="mt-12 rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg w-full max-w-lg">
          <div className="p-4 bg-base-200">
            <h4 className="pb-4">Preview</h4>
            <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
              {/* Chat Header */}
              <div className="px-3 py-3 border-b border-base-300 bg-base-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                    J
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">John Doe</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                        message.isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-[10px] mt-1.5 ${
                          message.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/70"
                        }`}
                      >
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-base-300 bg-base-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary text-sm h-9 px-3 min-h-0">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Default Theme Button Below Preview */}
        <div className="flex justify-center items-center p-4">
          <button
            className="btn btn-secondary text-base font-semibold text-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            onClick={() => setTheme(DEFAULT_THEME)}
            aria-label="Set Default Theme"
            title="Reset to the default theme"
          >
            Reset the Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
