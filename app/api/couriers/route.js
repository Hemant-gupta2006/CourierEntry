import { connectDB } from "@/lib/db";
import Courier from "@/models/Courier";

export async function GET(){

await connectDB();

const couriers = await Courier.find().sort({ challanNo: 1 });

return Response.json(couriers);

}