import type { Request, Response } from "express";

import {
  getMyProfileService,
  updateProfileService,
} from "../service/profile.service.js";

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const user = await getMyProfileService(userId);

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const updatedUser = await updateProfileService(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};