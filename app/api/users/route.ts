import { NextRequest, NextResponse } from "next/server";

// Mock database
let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 22 }
];

let nextId = 4;

// GET /api/users - Get all users
export async function GET() {
  return NextResponse.json({
    success: true,
    data: users,
    count: users.length
  });
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, age } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const newUser = {
      id: nextId++,
      name,
      email,
      age: age || null
    };

    users.push(newUser);

    return NextResponse.json(
      { success: true, data: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
