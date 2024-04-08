import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import Product from '@/models/productModel'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const { title, description,
            price, discountPercentage, rating, stock, category, thumbnail, brand
        } = reqBody
        const product = new Product({
            title, description,price, discountPercentage, rating, stock, category, thumbnail, brand
        })
        await product.save()
        return NextResponse.json({
            message: 'Product added successfully',
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false,
        })
    }
}