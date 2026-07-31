import type { Request, Response } from "express";
import { getMyApplicationService } from "../service/application.service.js";
import { success } from "zod";

export const getMyApplication = async (req: Request, res: Response) => {
  try {
    const candidateId = req.user.userId;

    const myApplication = await getMyApplicationService(candidateId);

    return res.status(200).json({
        success:true,
        message:"Applications fetched successfully",
        data:{
            myApplication,
        },
    })
  } catch (error) {
     if (error instanceof Error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCandidates  = async (req: Request , res: Response) => {
}