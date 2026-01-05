"use client";

import { useState } from "react";
import Link from "next/link";
import { BiArrowToLeft } from "react-icons/bi";

type ApiResponse = {
  status: number;
  data?: any;
  error?: string;
  headers?: Record<string, string>;
  time?: number;
};

export default function ApiPractice() {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/api/users");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("{}");
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const exercises = [
    {
      title: "GET Request",
      description: "Fetch all users",
      method: "GET",
      endpoint: "/api/users",
      difficulty: "Easy"
    },
    {
      title: "GET with Params",
      description: "Get user by ID",
      method: "GET",
      endpoint: "/api/users/1",
      difficulty: "Easy"
    },
    {
      title: "POST Request",
      description: "Create a new user",
      method: "POST",
      endpoint: "/api/users",
      body: '{"name": "John Doe", "email": "john@example.com", "age": 30}',
      difficulty: "Medium"
    },
    {
      title: "PUT Request",
      description: "Update user information",
      method: "PUT",
      endpoint: "/api/users/1",
      body: '{"name": "Jane Doe", "age": 31}',
      difficulty: "Medium"
    },
    {
      title: "DELETE Request",
      description: "Delete a user",
      method: "DELETE",
      endpoint: "/api/users/1",
      difficulty: "Medium"
    },
    {
      title: "Authentication",
      description: "Access protected endpoint",
      method: "GET",
      endpoint: "/api/protected",
      headers: '{"Authorization": "Bearer your-token-here"}',
      difficulty: "Hard"
    }
  ];

  const handleSendRequest = async () => {
    setLoading(true);
    const startTime = Date.now();
    
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...JSON.parse(headers || "{}")
        }
      };

      if (method !== "GET" && body) {
        options.body = body;
      }

      const res = await fetch(endpoint, options);
      const data = await res.json();
      const endTime = Date.now();

      setResponse({
        status: res.status,
        data,
        time: endTime - startTime,
        headers: Object.fromEntries(res.headers.entries())
      });
    } catch (error: any) {
      setResponse({
        status: 0,
        error: error.message,
        time: Date.now() - startTime
      });
    }
    setLoading(false);
  };

  const loadExercise = (exercise: any) => {
    setMethod(exercise.method);
    setEndpoint(exercise.endpoint);
    setBody(exercise.body || "");
    setHeaders(exercise.headers || "{}");
  };

  return (
    <div className="min-h-screen bg-[#F9DFDF] font-sans relative overflow-hidden p-2 sm:p-6">
      <div className="p-4 min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-3rem)] border-[3px] sm:border-[8px] border-black rounded-2xl sm:rounded-3xl bg-[#A78BFA] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative transform transition-transform duration-300">
        <div className="absolute inset-2 sm:inset-4 border-4 border-black rounded-xl sm:rounded-2xl border-dashed opacity-40"></div>

        <div className="absolute top-2.5 left-2  w-3 h-3 sm:w-6 sm:h-6 bg-[#F9DFDF] border-6 border-black rounded-full"></div>
        <div className="absolute top-2.5 right-2  w-3 h-3 sm:w-6 sm:h-6 bg-[#F9DFDF] border-6 border-black rounded-full"></div>
        <div className="absolute bottom-2.5 left-2  w-3 h-3 sm:w-6 sm:h-6 bg-[#F9DFDF] border-6 border-black rounded-full"></div>
        <div className="absolute bottom-2.5 right-2 w-3 h-3 sm:w-6 sm:h-6 bg-[#F9DFDF] border-6 border-black rounded-full"></div>
        
        <div className="relative z-10 p-3 sm:p-6 lg:p-8">
      <Link href="/" className="text-black inline-block mb-3 sm:mb-6 px-3 sm:px-4 py-2 sm:py-3 bg-[#A78BFA] hover:bg-[#F1E2E2] border-2 sm:border-[3px] border-transparent hover:border-black rounded-lg sm:rounded-xl font-black text-sm sm:text-base hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
        <div className="flex items-center gap-1 sm:gap-2">
          <BiArrowToLeft className="text-lg sm:text-xl" />
          <span>Back</span>
        </div>
      </Link>

      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <div className="relative inline-block">
          <h1 className="text-3xl sm:text-5xl lg:text-8xl font-black text-[#F5EFFF] relative z-10">
            <span className="bg-[#F5EFFF] bg-clip-text text-transparent drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">ARB</span>
          </h1>
        </div>
      </div>

      <div className="max-w-6xl text-black mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-[#F5EFFF] border-[3px] sm:border-[5px] border-black rounded-[16px] sm:rounded-[24px] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">Exercises</h2>
          <div className="space-y-3 sm:space-y-4">
            {exercises.map((exercise, idx) => (
              <div key={idx} className="border-[2px] sm:border-[3px] hover:border-black transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-base sm:text-lg">{exercise.title}</h3>
                  <span className={`rounded-t-3xl py-0.5 sm:py-1 px-2 text-[10px] sm:text-xs font-black border-b-2 self-start flex items-center gap-1 shrink-0 ${
                    exercise.difficulty === "Easy" ? "bg-[#81e4ae] text-[#148547] border-[#148547]" :
                    exercise.difficulty === "Medium" ? "pt-1 sm:pt-2 bg-[#fad47a] text-[#ba8a19] border-[#ba8a19]" : "bg-[#fc8eb3] text-[#d32961] border-[#d32961] sm:px-2 pt-1 sm:pt-2"
                  }`}>
                    <span>
                      {exercise.difficulty === "Easy" ? "★" :
                       exercise.difficulty === "Medium" ? "★★" : "★★★"}
                    </span>
                  </span>

                </div>
                <p className="text-xs sm:text-sm mb-2 sm:mb-3">{exercise.description}</p>
                <button
                  onClick={() => loadExercise(exercise)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F5EFFF] text-[#A78BFA] hover:text-black border-2 cursor-pointer hover:border-black rounded-lg font-bold text-xs sm:text-sm hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
                >
                  Load Request
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Request Builder Panel */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-[#F5EFFF] border-[3px] sm:border-[5px] border-black rounded-[16px] sm:rounded-[24px] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Request Builder</h2>
            
            <div className="space-y-3 sm:space-y-4">
<div>
                <label className="block font-black mb-1.5 sm:mb-2 text-sm sm:text-base">Method</label>
                <div className="relative">
                  <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                    className="w-full p-2.5 sm:p-3 border-[2px] sm:border-[3px] border-black rounded-lg sm:rounded-xl font-black bg-[#F5EFFF] focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none cursor-pointer text-sm sm:text-base"
                >
                    <option value="GET" className="font-black bg-[#60D394] text-black">GET</option>
                    <option value="POST" className="font-black bg-[#A78BFA] text-black">POST</option>
                    <option value="PUT" className="font-black bg-[#FEC84D] text-black">PUT</option>
                    <option value="DELETE" className="font-black bg-[#FF6B9D] text-black">DELETE</option>
                    <option value="PATCH" className="font-black bg-[#95E1D3] text-black">PATCH</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black font-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-black mb-1.5 sm:mb-2 text-sm sm:text-base">Endpoint</label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="w-full p-2.5 sm:p-3 border-[2px] sm:border-[3px] border-black rounded-lg sm:rounded-xl font-mono focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#A78BFA] text-sm sm:text-base"
                  placeholder="/api/endpoint"
                />
              </div>

              <div>
                <label className="block font-black mb-1.5 sm:mb-2 text-sm sm:text-base">Headers (JSON)</label>
                <textarea
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  className="w-full h-16 sm:h-20 p-2.5 sm:p-3 border-[2px] sm:border-[3px] border-black rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#A78BFA]"
                  placeholder='{"Authorization": "Bearer token"}'
                />
              </div>

              {method !== "GET" && (
                <div>
                  <label className="block font-black mb-1.5 sm:mb-2 text-sm sm:text-base">Body (JSON)</label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full h-24 sm:h-32 p-2.5 sm:p-3 border-[2px] sm:border-[3px] border-black rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#FF6B9D]"
                    placeholder='{"key": "value"}'
                  />
                </div>
              )}

              <button
                onClick={handleSendRequest}
                disabled={loading}
                className="w-full cursor-pointer px-6 sm:px-8 py-3 sm:py-4 bg-[#A78BFA] hover:bg-[#c0abff] active:bg-[#876BDA] border-[2px] sm:border-[3px] border-black rounded-lg sm:rounded-xl font-black text-base sm:text-lg transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] sm:active:translate-x-[3px] active:translate-y-[2px] sm:active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </div>

          </div>
          {response && (
            <div className={`bg-[#F5EFFF] border-[3px] sm:border-[5px] rounded-[16px] sm:rounded-[24px] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
              response.status >= 200 && response.status < 300 ? "border-[#60D394]" : "border-[#FF6B9D]"
            }`}>
              <div className="flex justify-between items-center mb-3 sm:mb-4 gap-2">
                <h2 className="text-xl sm:text-2xl font-black">Response</h2>
                <div className="flex gap-2 sm:gap-3">
                  <span className={`px-2 sm:px-3 py-1 font-black rounded-lg border-2 border-black text-xs sm:text-base ${
                    response.status >= 200 && response.status < 300 ? "bg-[#60D394]" : "bg-[#FF6B9D]"
                  }`}>
                    {response.status}
                  </span>
                  <span className="px-2 sm:px-3 py-1 font-black rounded-lg border-2 border-black bg-[#FEC84D] text-xs sm:text-base">
                    {response.time}ms
                  </span>
                </div>
              </div>
              
              {response.error && (
                <p className="text-red-600 font-mono text-xs sm:text-sm mb-3 sm:mb-4 break-words">{response.error}</p>
              )}
              
              {response.data && (
                <pre className="p-3 sm:p-4 bg-[#efe9ff] border-[2px] sm:border-[3px] border-black rounded-lg sm:rounded-xl overflow-x-auto text-xs sm:text-sm font-mono">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}
