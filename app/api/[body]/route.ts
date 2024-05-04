import { NextApiRequest } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: any) {
  //const param = req.nextUrl;
  console.log(params);
  
  return NextResponse.json("success");
}