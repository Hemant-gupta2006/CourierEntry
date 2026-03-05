import { connectDB } from "@/lib/db";
import Courier from "@/models/Courier";

export async function POST(req) {

    try {

        await connectDB();

        const body = await req.json();

        // get last courier entry
        const lastCourier = await Courier.findOne().sort({ challanNo: -1 });

        let challanNumber;
        let courierDate;

        // ---------- CHALLAN NUMBER LOGIC ----------

        if (body.challanNo && body.challanNo !== "") {
            challanNumber = Number(body.challanNo);
        }
        else {
            if (lastCourier) {
                challanNumber = lastCourier.challanNo + 1;
            }
            else {
                challanNumber = 1;
            }
        }

        // ---------- DATE AUTO-FILL LOGIC ----------

        if (body.date && body.date !== "") {
            courierDate = new Date(body.date);
        }
        else {
            if (lastCourier) {
                courierDate = lastCourier.date;
            }
            else {
                courierDate = new Date(); // first entry default today
            }
        }

        const courier = await Courier.create({

            date: courierDate,

            challanNo: challanNumber,

            senderName: body.senderName,

            receiverName: body.receiverName,

            address: body.address,

            weight: body.weight || "0.100 GM",

            amount: body.amount,

            status: body.status,

            transportMode: body.transportMode || "Surface"

        });

        return Response.json(courier);


    }
    catch (error) {


        return Response.json({ error: error.message });


    }

}
