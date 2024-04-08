import { connect } from "@/dbConfig/dbConfig";
import { getDateFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getDateFromToken(req);
        const user = await User.findById({ _id: userId }).select("-password")
        return NextResponse.json({
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}