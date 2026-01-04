import { NextRequest, NextResponse } from "next/server";

// Mock database (shared with parent route)
let users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34 },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 22 }
];

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = parseInt(id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: user });
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    const body = await request.json();
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    users[userIndex] = { ...users[userIndex], ...body, id: userId };

    return NextResponse.json({
      success: true,
      data: users[userIndex],
      message: "User updated successfully"
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = parseInt(id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json(
      { success: false, error: "User not found" },
      { status: 404 }
    );
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  return NextResponse.json({
    success: true,
    data: deletedUser,
    message: "User deleted successfully"
  });
}
