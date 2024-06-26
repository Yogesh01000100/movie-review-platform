import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getReview(req, res) {
    try {
        const { movieId } = req.params;

        const reviews = await prisma.review.findMany({
            where: { movieId },
            //include: { user: true },
        });

        return res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getAllReviews(req, res) {
    try {
        const reviews = await prisma.review.findMany({
            // include: { user: true },
        });
        return res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export async function createReview(req, res) {
    try {
        const { movieId, rating, comment } = req.body;
        const { email } = req.user;
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const review = await prisma.review.create({
            data: {
                movieId,
                userId: user.id,
                rating,
                comment,
            },
            include: { user: true },
        });

        return res.status(201).json({ review });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}