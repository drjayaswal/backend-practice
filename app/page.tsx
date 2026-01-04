"use client";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden p-2 sm:p-6">
      <div className="p-4 min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-3rem)] border-[3px] sm:border-[8px] border-black rounded-2xl sm:rounded-3xl bg-[#F96E5B] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative transform transition-transform duration-300">
        <div className="absolute inset-2 sm:inset-4 border-4 border-black rounded-xl sm:rounded-2xl border-dashed opacity-40"></div>

        <div className="absolute top-2.5 left-2  w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>
        <div className="absolute top-2.5 right-2  w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>
        <div className="absolute bottom-2.5 left-2  w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>
        <div className="absolute bottom-2.5 right-2 w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>

        <main className="flex flex-col items-center justify-center px-3 sm:px-8 py-4 sm:py-20 relative z-10 min-h-full">
          <div className="relative w-full max-w-4xl">
            <div className="bg-[#F9DFDF] border-[3px] sm:border-[4px] border-black rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform transition-transform duration-300">
              <div className="text-center mb-4 sm:mb-8 md:mb-12">
                <div className="inline-block bg-white border-b-6 border-r-6 border-t-2 border-l-2 sm:border-b-10 sm:border-r-10 sm:border-t-3 sm:border-l-3 border-black rounded-lg sm:rounded-xl md:rounded-2xl px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 mb-3 sm:mb-4 md:mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1 sm:rotate-1 md:rotate-2">
                  <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-black leading-tight">Docker App</h1>
                </div>
              </div>

              <div className="mb-4 sm:mb-6 md:mb-10">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                  <a href="/databases" className="group text-white cursor-pointer px-3 sm:px-6 md:px-12 py-3 sm:py-4 md:py-6 bg-[#FF6B9D] hover:bg-[#FF5A8C] active:bg-[#FF4979] border-2 sm:border-[3px] md:border-[4px] border-black rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-xs sm:text-sm md:text-xl transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] sm:active:translate-x-[2px] sm:active:translate-y-[2px] md:active:translate-x-[4px] md:active:translate-y-[4px] text-center transform hover:rotate-1 hover:scale-105 flex-1">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
                      <div className="text-center">
                        <div className="font-black text-sm sm:text-base md:text-xl sm:inline hidden">DQE</div>
                        <div className="text-xl font-bold opacity-90 leading-tight">Database Query Explorer</div>
                      </div>
                    </div>
                  </a>

                  <a href="/apis" className="group text-white cursor-pointer px-3 sm:px-6 md:px-12 py-3 sm:py-4 md:py-6 bg-[#A78BFA] hover:bg-[#977BEA] active:bg-[#876BDA] border-2 sm:border-[3px] md:border-[4px] border-black rounded-xl sm:rounded-2xl md:rounded-3xl font-black text-xs sm:text-sm md:text-xl transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] sm:active:translate-x-[2px] sm:active:translate-y-[2px] md:active:translate-x-[4px] md:active:translate-y-[4px] text-center transform hover:-rotate-1 hover:scale-105 flex-1">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
                      <div className="text-center">
                        <div className="font-black text-sm sm:text-base md:text-xl sm:inline hidden">ARB</div>
                        <div className="text-xl font-bold opacity-90 leading-tight">API Request Builder</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
          </div>
          </div>
          <div className="text-center">
            <div className="inline-block bg-[#4ECDC4] border-2 sm:border-3 border-black rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <a href="https://github.com/drjayaswal/backend" className="text-black inline-block px-2 sm:px-6 py-2 sm:py-4 bg-white border-2 sm:border-3 border-black rounded-lg sm:rounded-xl font-black text-xs sm:text-lg hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] sm:active:translate-x-[3px] sm:active:translate-y-[3px] transform hover:scale-105">
                <div className="flex gap-1 sm:gap-2 items-center">
                  <svg className="w-4 h-4 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg><span className="text-sm sm:text-2xl">Code</span>
                </div>
              </a>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}