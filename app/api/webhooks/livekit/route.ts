import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();

  const authorization = headerPayload.get("Authorization");

  // console.log(authorization);


  if (!authorization) {
    return new Response("No authorization header", { status: 400 });
  }

  const event = await receiver.receive(body, authorization);

  if (event.event === "ingress_started") {
    const res = await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true
      }
    });
    // console.log(res);

  }
  if (event.event === "ingress_ended") {
    await db.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false
      }
    })
  }

  return new NextResponse("Success");
}