import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username, email, password: hashedPassword
        })
        const savedUser = await newUser.save()
        
        //create token data
        const tokenData = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "User created Successfully",
            success: true,
            savedUser
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
