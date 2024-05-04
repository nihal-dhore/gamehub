import { User, UserSchema } from "@/schema/userSchema";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/libs/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
  const body: User = await req.json();

  console.log(body);

  const session: Session | null = await getServerSession(authOptions);
  //console.log(session);


  if (!session) {
    return NextResponse.json({ error: "Unauthorized Request" }, { status: 400 })
  }
  const userValidation = UserSchema.safeParse(body);

  if (!userValidation.success) {
    return NextResponse.json({ message: userValidation.error.issues[0].message }, { status: 403 });
  }

  try {

    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    })
    console.log(user);
    

    if (!user) {
      return NextResponse.json({
        error: "User not found"
      }, { status: 404 })
    }

    const userUpdate = await db.user.update({
      where: {
        email: user.email
      },
      data: {
        username: body.username || undefined,
        bio: body.bio || undefined
      }
    })
    console.log(userUpdate);
    

    return NextResponse.json({
      message: "User Updated successfully"
    })

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Internal server error"
    })
  }
}