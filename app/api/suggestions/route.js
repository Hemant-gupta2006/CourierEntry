import { connectDB } from "@/lib/db";
import Courier from "@/models/Courier";

export async function GET() {

  await connectDB();

  const parties = await Courier.distinct("senderName");
  const destinations = await Courier.distinct("address");

  return Response.json({
    parties,
    destinations
  });

}