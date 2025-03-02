import HTTP from "../../../constants/http";
import prisma from "../../../prisma/client";
import { UpdateUserType } from "../../../types/user";
import AppError from "../../../utils/app-error";

export const getAllUser = async () => {
  const users = await prisma.user.findMany({
    where: { deleted_at: null },
    include: {
      mediaLinks: {
        include: { media: true },
      },
    },
  });

  /****************************
        GETTING IMAGE FOR USER
    *******************************/

  const userWithMedia = users?.map((user) => {
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      media: user?.mediaLinks.map((link) => link.media)?.[0],
    };
  });

  return {
    users: userWithMedia,
  };
};

export const getDetailUser = async (id: string) => {
  if (!id) throw new AppError(HTTP.NOT_FOUND, "Id Not found.");
  const user = await prisma.user.findFirst({
    where: { id: id, deleted_at: null },
    include: {
      mediaLinks: {
        include: { media: true },
      },
    },
  });

  if (!user) {
    throw new AppError(HTTP.NOT_FOUND, "User Not found with that id.");
  }

  /****************************
        GETTING IMAGE FOR USER
    *******************************/

  const userWithMedia = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    media: user?.mediaLinks.map((link) => link.media)?.[0],
  };

  return {
    user: userWithMedia,
  };
};

export const updateUser = async ({
  userId,
  name,
  phone,
  mediaId,
}: UpdateUserType) => {
  if (!userId) throw new AppError(HTTP.NOT_FOUND, "Id Not found.");

  const user = await prisma.user.findUnique({
    where: { id: userId, deleted_at: null },
  });

  if (!user) {
    throw new AppError(HTTP.NOT_FOUND, "User Not found with that id.");
  }

  const updatedUser = await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
      },
    });

    if (mediaId) {
      await prisma.mediaAssignment.upsert({
        where: { mediaId: mediaId },
        update: { userId: user.id },
        create: { mediaId: mediaId, userId: user.id },
      });
    }

    /****************************
        GETTING IMAGE FOR USER
    *******************************/

    const userWithMedia = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        mediaLinks: {
          include: { media: true },
        },
      },
    });

    const updatedUser = {
      id: userWithMedia?.id,
      name: userWithMedia?.name,
      email: userWithMedia?.email,
      phone: userWithMedia?.phone,
      media: userWithMedia?.mediaLinks.map((link) => link.media)?.[0],
    };

    return updatedUser;
  });

  return { user: updatedUser };
};

export const deleteUser = async (id: string) => {
  if (!id) {
    throw new AppError(HTTP.NOT_FOUND, "Id Not found.");
  }

  const isUserExist = await prisma.user.findFirst({ where: { id } });
  if (!isUserExist)
    throw new AppError(HTTP.NOT_FOUND, "There's no data with that id.");

  await prisma.user.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
  return;
};
