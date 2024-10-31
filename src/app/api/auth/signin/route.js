import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, pass } = reqBody;
    const res = await fetch("http://localhost:8001/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, pass }),
    });
    const resBod = await res.json();
    return NextResponse.json({
      status: res.status,
      message: resBod.message,
      data: resBod.data,
    });
  } catch (err) {
    return NextResponse.json({ status: 500, message: `Err Occurred: ${err}` });
  }
}
