import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getExpensesByCategory = async (req: Request, res: Response) => {
  try {
    const expensesSummaryRaw = await prisma.expenseByCategory.findMany({
      where: {
        category: {
          in: req.query.category as string[],
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    const expenseByCategorySummary = expensesSummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    res.status(200).json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};
