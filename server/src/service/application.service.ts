import prisma from "../config/prisma.js";

export const getMyApplicationService = async (candidateId: number) => {
  const myApplication = await prisma.application.findMany({
    where: {
      userId: candidateId,
    },
    include:{
        job:true,
    },
    orderBy:{
        createdAt:"desc",
    },
  });

  return myApplication;

};
