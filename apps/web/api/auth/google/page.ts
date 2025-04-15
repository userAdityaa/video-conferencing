import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'; 

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse,
)  { 
    if(req.method != "POST") { 
        return res.status(405).json({message: "Method not allowed."});
    }

    try { 
        const {token} = req.body;

        const response = await axios.post(
            `${process.env.BACKEND_URL}/api/auth/google`,
            { token },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
        );

        res.status(200).json(response.data);
    } catch(error) { 
        console.error('Google auth error', error);
        res.status(500).json({message: "Internal Server Error."})
    }
}
