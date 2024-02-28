import { userExists } from "../services/userServices.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMe(req, res) {
    try {
        const { email } = req.user;
        const userStatus = await userExists(email);
        
        if(userStatus)
        {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            return res.status(200).json({ userData: user });
        }
        else{
            return res.status(404).json({ error: "User not found!"})
        }
            
    } 
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
