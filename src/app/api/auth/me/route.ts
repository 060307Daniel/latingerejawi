import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    return NextResponse.json(decoded);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Token tidak valid",
      },
      {
        status: 401,
      }
    );
  }
}