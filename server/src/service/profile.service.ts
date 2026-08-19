import prisma from "../config/prisma.js";

export const getMyProfileService = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      role: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const updateProfileService = async (
  userId: number,
  data: {
    name?: string;
    email?: string;
    contact?: string;
  }
) => {
  // ❗ 1. Prevent empty updates
  if (Object.keys(data).length === 0) {
    throw new Error("No data provided for update");
  }

  // ❗ 2. Email uniqueness check
  if (data.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new Error("Email already in use");
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },

      // ✅ Only send defined fields
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.contact !== undefined && { contact: data.contact }),
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

  } catch (error) {
    throw new Error("Failed to update profile");
  }
};