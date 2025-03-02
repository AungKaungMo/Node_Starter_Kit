import HTTP from "../../../constants/http";
import prisma from "../../../prisma/client";
import AppError from "../../../utils/app-error";

export const getAllSession = async () => {
  const sessions = await prisma.session.findMany();

  return {
    sessions,
  };
};

export const deleteSession = async (id: string) => {
  if (!id) {
    throw new AppError(HTTP.NOT_FOUND, "Invalid id.");
  }

  await prisma.session.delete({
    where: { id },
  });
  return;
};
