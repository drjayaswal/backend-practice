import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, error: "Missing or invalid authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);

  // Simple token validation (for learning purposes)
  if (token !== "your-token-here" && token !== "secret-token-123") {
    return NextResponse.json(
      { success: false, error: "Invalid token" },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Access granted to protected resource",
    data: {
      secretData: "This is protected information",
      timestamp: new Date().toISOString()
    }
  });
}
