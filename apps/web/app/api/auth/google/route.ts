import { NextResponse } from "next/server";
import axios from 'axios';


export async function POST(req: Request) {
    try {
        const body = await req.json(); 
        const { token } = body;

        console.log("this is the request url:", `${process.env.BACKEND_URL}/api/auth/google`);

        const response = await axios.post(
            `${process.env.BACKEND_URL}/api/auth/google`,
            { token },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json(response.data, { status: 200 });

    } catch (error) {
        console.error('Google auth error', error);
        return NextResponse.json({ message: "Internal Server Error." }, { status: 500 });
    }
}
