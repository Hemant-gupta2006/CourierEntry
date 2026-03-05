import { connectDB } from "@/lib/db";
import Courier from "@/models/Courier";

export async function DELETE(req, context) {

  await connectDB();

  const { id } = await context.params;

  await Courier.findByIdAndDelete(id);

  return Response.json({ message: "Deleted successfully" });

}