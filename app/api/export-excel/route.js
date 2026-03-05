import { connectDB } from "@/lib/db";
import Courier from "@/models/Courier";
import ExcelJS from "exceljs";

export async function GET() {

  try {

    await connectDB();

    const couriers = await Courier.find().sort({ challanNo: 1 });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Courier Register");

    sheet.addRow([
      "Sr.No.",
      "Date",
      "Challan No.",
      "From Party",
      "To Party",
      "Weight",
      "Destination",
      "Amount",
      "Status",
      "Mode"
    ]);

    sheet.getRow(1).font = { bold: true };

    couriers.forEach((c, index) => {

      sheet.addRow([
        index + 1,
        c.date ? new Date(c.date).toLocaleDateString() : "",
        c.challanNo || "",
        c.senderName || "",
        c.receiverName || "",
        c.weight || "",
        c.address || "",
        c.amount || "",
        c.status || "",
        c.transportMode || ""
      ]);

    });

    sheet.columns = [
      { width: 8 },
      { width: 12 },
      { width: 14 },
      { width: 20 },
      { width: 20 },
      { width: 12 },
      { width: 18 },
      { width: 12 },
      { width: 12 },
      { width: 12 }
    ];

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          "attachment; filename=courier-register.xlsx"
      }
    });

  } catch (error) {

    return Response.json({ error: error.message });

  }

}