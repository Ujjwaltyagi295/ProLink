import { desc, eq, gt } from "drizzle-orm";
import { db } from "../config/db";
import sessions from "../models/session.model";
import { NOT_FOUND, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { z } from "zod";
import appAssert from "../utils/appAssert";


export const getSessionsHandler = catchErrors(async (req, res) => {
  const userId = req.userId;
  const sessionId = req.sessionId;

  const allSessions = await db
    .select({
      id: sessions.id,
      userAgent: sessions.userAgent,
      createdAt: sessions.createdAt,
    })
    .from(sessions)
    .where(
      eq(sessions.userId, userId) &&
      gt(sessions.expiresAt, new Date())
    )
    .orderBy(desc(sessions.createdAt));

  const result = allSessions.map((session) => ({
    ...session,
    isCurrent: session.id === sessionId,
  }));

  return res.status(OK).json(result);
});
export const deleteSessionHandler = catchErrors(async(req,res)=>{
        const sessionId=z.string().parse(req.params.id)
        const deleted = await db.select().from(sessions).where(eq(sessions.userId,sessionId))
        appAssert(deleted, NOT_FOUND, "Session not found");
        return res.status(OK).json({ message: "Session removed" });
})