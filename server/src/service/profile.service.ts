import prisma from "../config/prisma.js";

// Get logged-in user's profile
export const getMyProfileService = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      role: true,
    },
  });
};

// Update profile
export const updateProfileService = async (
  userId: number,
  data: {
    name?: string;
    email?: string;
    contact?: string;
  }
) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.contact && { contact: data.contact }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      role: true,
    },
  });

  return updatedUser;
};