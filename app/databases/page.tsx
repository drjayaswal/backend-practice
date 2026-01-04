"use client";

import { useState } from "react";
import Link from "next/link";
import { BiArrowToLeft} from "react-icons/bi";
import { HiPaperClip } from "react-icons/hi";

type QueryResult = {
  success: boolean;
  data?: any[];
  error?: string;
  explanation?: string;
};

export default function DatabasePractice() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);

  const exercises = [
    {
      title: "SELECT Basics",
      description: "Retrieve all users from the database",
      hint: "SELECT * FROM users;",
      difficulty: "Easy"
    },
    {
      title: "WHERE Clause",
      description: "Find users older than 25",
      hint: "SELECT * FROM users WHERE age > 25;",
      difficulty: "Easy"
    },
    {
      title: "JOIN Tables",
      description: "Get users with their orders",
      hint: "SELECT users.name, orders.product FROM users JOIN orders ON users.id = orders.user_id;",
      difficulty: "Medium"
    },
    {
      title: "Aggregation",
      description: "Count total orders per user",
      hint: "SELECT user_id, COUNT(*) as total FROM orders GROUP BY user_id;",
      difficulty: "Medium"
    },
    {
      title: "Subqueries",
      description: "Find users who made more than 3 orders",
      hint: "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders GROUP BY user_id HAVING COUNT(*) > 3);",
      difficulty: "Hard"
    }
  ];

  const handleRunQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/database/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: "Failed to execute query" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden p-2 sm:p-6">
      <div className="p-4 min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-3rem)] border-[3px] sm:border-[8px] border-black rounded-2xl sm:rounded-3xl bg-[#FF6B9D] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative transform transition-transform duration-300">
        <div className="absolute inset-2 sm:inset-4 border-4 border-black rounded-xl sm:rounded-2xl border-dashed opacity-40"></div>

        <div className="absolute top-2.5 left-2  w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>
        <div className="absolute top-2.5 right-2  w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>
        <div className="absolute bottom-2.5 left-2  w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>
        <div className="absolute bottom-2.5 right-2 w-3 h-3 sm:w-6 sm:h-6 bg-white border-6 border-black rounded-full"></div>
        
        <div className="relative z-10 p-3 sm:p-6 lg:p-8">
      <Link href="/" className="text-black inline-block mb-3 sm:mb-6 px-3 sm:px-4 py-2 sm:py-3 bg-[#FF6B9D] hover:bg-[#F1E2E2] border-2 sm:border-[3px] border-transparent hover:border-black rounded-lg sm:rounded-xl font-black text-sm sm:text-base hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
        <div className="flex items-center gap-1 sm:gap-2">
          <BiArrowToLeft className="text-lg sm:text-xl" />
          <span>Back</span>
        </div>
      </Link>

      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <div className="relative inline-block">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-[#F1E2E2] relative z-10">
            <span className="bg-[#F1E2E2] bg-clip-text text-transparent drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">DQE</span>
          </h1>
        </div>
      </div>


      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
        <div className="bg-[#F1E2E2] text-black border-2 sm:border-[3px] lg:border-[5px] border-black rounded-2xl sm:rounded-[20px] lg:rounded-[24px] p-3 sm:p-5 lg:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 sm:mb-5 lg:mb-6 text-center">SQL Exercises</h2>
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {exercises.map((exercise, idx) => (
              <div key={idx} className="bg-[#F1E2E2] border-2 sm:border-[3px] border-black rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="flex xs:justify-between xs:items-start mb-2 sm:mb-3 gap-2 xs:gap-3">
                  <h3 className="font-black text-sm sm:text-base lg:text-lg text-gray-800 flex-1">
                    <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 bg-black border-[#FF6B9D] border-2 sm:border-4 rounded-full mr-2">
                    </span>
                    {exercise.description}
                  </h3>
                  <span className={`rounded-t-3xl py-0.5 sm:py-1 px-2 text-[10px] sm:text-xs font-black border-b-2 self-start flex items-center gap-1 shrink-0 ${
                    exercise.difficulty === "Easy" ? "bg-[#81e4ae] text-[#148547] border-[#148547]" :
                    exercise.difficulty === "Medium" ? "pt-1 sm:pt-2 bg-[#fad47a] text-[#ba8a19] border-[#ba8a19]" : "bg-[#fc8eb3] text-[#d32961] border-[#d32961] pt-1 sm:pt-2"
                  }`}>
                    <span>
                      {exercise.difficulty === "Easy" ? "★" :
                       exercise.difficulty === "Medium" ? "★★" : "★★★"}
                    </span>
                  </span>
                </div>
                
                <details className="group">
                  <summary className="cursor-pointer font-bold flex gap-1 sm:gap-2 items-center text-black py-1.5 sm:py-2 transition-all text-[11px] sm:text-xs lg:text-sm list-none">
                    <span className="text-gray-600 group-hover:text-black">Show Solution</span>
                  </summary>
                    <div className="relative bg-[#FF6B9D] rounded-md sm:rounded-lg border-2 border-black overflow-hidden mt-1 sm:mt-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(exercise.hint)}
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-[#F1E2E2] cursor-pointer border-2 border-black rounded-md sm:rounded-lg font-bold transition-all hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-px active:translate-y-px active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] z-10"
                        title="Copy Query"
                      >
                        <HiPaperClip className="text-sm sm:text-base lg:text-lg"/>
                      </button>
                      <code className="block font-mono text-[#F1E2E2] font-bold text-[10px] sm:text-xs lg:text-sm leading-relaxed p-2 sm:p-3 lg:p-4 pr-10 sm:pr-12 lg:pr-14 overflow-x-auto">
                        {exercise.hint}
                      </code>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-black sm:space-y-6">
          <div className="bg-[#F1E2E2] border-2 sm:border-[3px] lg:border-[5px] border-black rounded-2xl sm:rounded-[20px] lg:rounded-[24px] p-3 sm:p-5 lg:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2 sm:mb-3 lg:mb-4">Query Editor</h2>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your SQL query here..."
              className="w-full h-28 sm:h-36 lg:h-40 p-2.5 sm:p-3 lg:p-4 border-2 sm:border-[3px] border-black rounded-lg sm:rounded-xl font-mono text-[11px] sm:text-xs lg:text-sm resize-none focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-[#FF6B9D]"
            />
            <button
              onClick={handleRunQuery}
              disabled={loading || !query.trim()}
              className="mt-2.5 sm:mt-3 lg:mt-4 w-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-[#FF6B9D] cursor-pointer hover:bg-[#fe96b9] active:bg-[#40B374] border-2 sm:border-[3px] border-black rounded-lg sm:rounded-xl font-black text-sm sm:text-base lg:text-lg transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] sm:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] sm:active:translate-x-[2px] lg:active:translate-x-[3px] active:translate-y-[1px] sm:active:translate-y-[2px] lg:active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Running..." : "Run Query"}
            </button>
          </div>

          {result && (
            <div className={`bg-[#F1E2E2] border-2 sm:border-[3px] lg:border-[5px] border-[#F1E2E2] rounded-2xl sm:rounded-[20px] lg:rounded-[24px] p-3 sm:p-5 lg:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] lg:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
              result.success ? "border-[#60D394]" : "border-[#FF6B9D]"
            }`}>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black mb-2 sm:mb-3 lg:mb-4">
                {result.success ? "✓ Success" : "✗ Error"}
              </h2>
              {result.explanation && (
                <p className="mb-2 sm:mb-3 lg:mb-4 p-2 sm:p-3 bg-[#FFF9E6] border-2 border-black rounded-md sm:rounded-lg text-[11px] sm:text-xs lg:text-sm">
                  {result.explanation}
                </p>
              )}
              {result.error && (
                <p className="text-red-600 font-mono text-[11px] sm:text-xs lg:text-sm wrap-break-word">{result.error}</p>
              )}
              {result.data && (
                <div className="overflow-x-auto -mx-3 sm:-mx-5 lg:mx-0">
                  <div className="min-w-full inline-block align-middle px-3 sm:px-5 lg:px-0">
                    <table className="w-full border-2 sm:border-[3px] border-black text-[10px] sm:text-xs lg:text-sm">
                      <thead>
                      <tr className="bg-[#FEC84D]">
                        {Object.keys(result.data[0] || {}).map((key) => (
                            <th key={key} className="border sm:border-2 border-black p-1 sm:p-2 font-black text-left [#F1E2E2]space-nowrap">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.data.map((row, idx) => (
                        <tr key={idx} className="even:bg-gray-50">
                          {Object.values(row).map((val: any, i) => (
                              <td key={i} className="border sm:border-2 border-black p-1 sm:p-2 [#F1E2E2]space-nowrap">
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
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
