import { NextRequest, NextResponse } from "next/server";

const mockDatabase = {
  users: [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34 },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 22 },
    { id: 4, name: "Diana Prince", email: "diana@example.com", age: 29 },
    { id: 5, name: "Eve Wilson", email: "eve@example.com", age: 31 }
  ],
  orders: [
    { id: 1, user_id: 1, product: "Laptop", price: 1200, quantity: 1 },
    { id: 2, user_id: 1, product: "Mouse", price: 25, quantity: 2 },
    { id: 3, user_id: 2, product: "Keyboard", price: 75, quantity: 1 },
    { id: 4, user_id: 3, product: "Monitor", price: 300, quantity: 2 },
    { id: 5, user_id: 1, product: "Headphones", price: 150, quantity: 1 },
    { id: 6, user_id: 4, product: "Webcam", price: 80, quantity: 1 },
    { id: 7, user_id: 2, product: "Desk Lamp", price: 45, quantity: 1 },
    { id: 8, user_id: 5, product: "USB Cable", price: 10, quantity: 5 }
  ]
};

function parseAndExecuteQuery(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery.match(/^select \* from users;?$/)) {
    return {
      success: true,
      data: mockDatabase.users,
      explanation: "Retrieved all users from the database"
    };
  }

  // SELECT * FROM orders
  if (normalizedQuery.match(/^select \* from orders;?$/)) {
    return {
      success: true,
      data: mockDatabase.orders,
      explanation: "Retrieved all orders from the database"
    };
  }

  // WHERE age > X
  const whereMatch = normalizedQuery.match(/select \* from users where age ([><=]+) (\d+);?$/);
  if (whereMatch) {
    const operator = whereMatch[1];
    const value = parseInt(whereMatch[2]);
    let filtered = mockDatabase.users;

    if (operator === ">") filtered = filtered.filter(u => u.age > value);
    else if (operator === "<") filtered = filtered.filter(u => u.age < value);
    else if (operator === "=") filtered = filtered.filter(u => u.age === value);

    return {
      success: true,
      data: filtered,
      explanation: `Filtered users where age ${operator} ${value}`
    };
  }

  // JOIN
  if (normalizedQuery.includes("join")) {
    const joined = mockDatabase.orders.map(order => {
      const user = mockDatabase.users.find(u => u.id === order.user_id);
      return {
        user_name: user?.name,
        user_email: user?.email,
        product: order.product,
        price: order.price,
        quantity: order.quantity
      };
    });

    return {
      success: true,
      data: joined,
      explanation: "Joined users and orders tables"
    };
  }

  // COUNT and GROUP BY
  if (normalizedQuery.includes("count") && normalizedQuery.includes("group by")) {
    const counts: Record<number, number> = {};
    mockDatabase.orders.forEach(order => {
      counts[order.user_id] = (counts[order.user_id] || 0) + 1;
    });

    const result = Object.entries(counts).map(([user_id, total]) => ({
      user_id: parseInt(user_id),
      total
    }));

    return {
      success: true,
      data: result,
      explanation: "Counted orders grouped by user_id"
    };
  }

  // Subquery - users with more than X orders
  const subqueryMatch = normalizedQuery.match(/having count\(\*\) ([><=]+) (\d+)/);
  if (subqueryMatch) {
    const operator = subqueryMatch[1];
    const threshold = parseInt(subqueryMatch[2]);

    const counts: Record<number, number> = {};
    mockDatabase.orders.forEach(order => {
      counts[order.user_id] = (counts[order.user_id] || 0) + 1;
    });

    const qualifyingUserIds = Object.entries(counts)
      .filter(([_, count]) => {
        if (operator === ">") return count > threshold;
        if (operator === "<") return count < threshold;
        return count === threshold;
      })
      .map(([id]) => parseInt(id));

    const result = mockDatabase.users.filter(u => qualifyingUserIds.includes(u.id));

    return {
      success: true,
      data: result,
      explanation: `Found users with ${operator} ${threshold} orders using subquery`
    };
  }

  return {
    success: false,
    error: "Query not recognized. Try: SELECT * FROM users; or SELECT * FROM orders;",
    explanation: "This is a learning environment with limited SQL support"
  };
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { success: false, error: "Query is required" },
        { status: 400 }
      );
    }

    const result = parseAndExecuteQuery(query);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
