export default function Loader() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="relative w-[200px] h-[140px]">
        {/* shadows */}
        <div className="absolute left-[4px] bottom-[8px] top-[80%] w-[120px] rotate-[-6deg] shadow-[0_16px_12px_rgba(39,94,254,0.28)]" />
        <div className="absolute right-[4px] bottom-[8px] top-[80%] w-[120px] rotate-[6deg] shadow-[0_16px_12px_rgba(39,94,254,0.28)]" />

        <div className="relative z-10 h-full w-full rounded-[13px] shadow-md bg-gradient-to-br from-[#23C4F8] to-[#275EFE] [perspective:600px]">
          <ul className="relative m-0 p-0 list-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <li
                key={i}
                className={`
                    absolute top-[10px] left-[10px] origin-[100%_50%]
                    text-white/40 opacity-0 rotate-y-[180deg]
                    ${i === 1 ? "opacity-100 rotate-y-0" : ""}
                    ${i === 2 ? "animate-[page2_3s_ease_infinite]" : ""}
                    ${i === 3 ? "animate-[page3_3s_ease_infinite]" : ""}
                    ${i === 4 ? "animate-[page4_3s_ease_infinite]" : ""}
                    ${i === 5 ? "animate-[page5_3s_ease_infinite]" : ""}
                  `}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 90 120"
                  className="w-[90px] h-[120px] block"
                >
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                </svg>
              </li>
            ))}
          </ul>
        </div>

        <span className="block text-center mt-5 text-[#6C7486]">Loading</span>
      </div>

      {/* keyframes injected once */}
      <style>{`
          @keyframes page2 {
            0%{transform:rotateY(180deg);opacity:0}
            20%{opacity:1}
            35%,100%{opacity:0}
            50%,100%{transform:rotateY(0deg)}
          }
          @keyframes page3 {
            15%{transform:rotateY(180deg);opacity:0}
            35%{opacity:1}
            50%,100%{opacity:0}
            65%,100%{transform:rotateY(0deg)}
          }
          @keyframes page4 {
            30%{transform:rotateY(180deg);opacity:0}
            50%{opacity:1}
            65%,100%{opacity:0}
            80%,100%{transform:rotateY(0deg)}
          }
          @keyframes page5 {
            45%{transform:rotateY(180deg);opacity:0}
            65%{opacity:1}
            80%,100%{opacity:0}
            95%,100%{transform:rotateY(0deg)}
          }
        `}</style>
    </div>
  );
}
