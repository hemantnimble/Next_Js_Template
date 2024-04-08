import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";

connect();

export async function GET(req: NextRequest) {
    try {
        const products = await Product.find()
        return NextResponse.json({
        data: products
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}