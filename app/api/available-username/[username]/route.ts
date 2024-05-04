import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, param: any) {
  const username  = param.params.username;
  //console.log(username);


  try {
    if (typeof username === "string") {
      const user = await db.user.findUnique({
        where: {
          username: username,
        },
        select: {
          username: true
        }
      })
      //console.log(user);


      if (!user?.username) {
        return NextResponse.json({
          message: "Username is available"
        })
      }
    }
    return NextResponse.json({
      error: "Username is not available"
    })

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error"
    }, { status: 500 })
  }
}