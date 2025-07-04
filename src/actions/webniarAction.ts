import { getUserById } from "@/data/user";
import prisma from "@/lib/prisma";
import { WebniarSchema } from "@/schemas/webniarSchema";
import { z } from "zod";

export const createWebniar = async (
  values: z.infer<typeof WebniarSchema>,
  userId: string
) => {
  try {
    // User validate
    const user = await getUserById(userId);
    if (!user) {
      return { success: false, message: "Invalid credentials!" };
    }

    // Zod validation
    const result = WebniarSchema.safeParse(values);
    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const {
      title,
      instructor,
      instructorTitle,
      date,
      time,
      duration,
      description,
      level,
      maxAttendees,
      price,
      categoryId,
      status,
    } = result.data;

    await prisma.webniar.create({
      data: {
        title,
        instructor,
        instructorTitle,
        date: new Date(date),
        time,
        duration,
        description,
        level,
        maxAttendees: Number(maxAttendees),
        price,
        categoryId,
        creatorId: userId,
        status,
        category: categoryId,
      },
    });

    return { success: true, message: "Webinar created successfully!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const getWebniarById = async (webniarId: string) => {
  try {
    const webniar = await prisma.webniar.findUnique({
      where: {
        id: webniarId,
      },
      include: {
        Category: true,
        creator: true,
        attendees: {
          include: {
            user: true, // attendee ka user data bhi chahiye to
          },
        },
      },
    });

    if (!webniar) {
      return { success: false, message: "Webinar not found!" };
    }

    return { success: true, webniar };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const getAllWebniars = async () => {
  try {
    const webniars = await prisma.webniar.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Category: true, // category ka title bhi chahiye to
        creator: true, // webinar creator ka data bhi chahiye to
        attendees: true, // attendees ka list
      },
    });

    return { success: true, webniars };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const updateWebniar = async (
  webniarId: string,
  values: z.infer<typeof WebniarSchema>,
  userId: string
) => {
  try {
    // User check
    const user = await getUserById(userId);
    if (!user) return { success: false, message: "Invalid credentials!" };

    // Webniar exist check
    const existingWebniar = await prisma.webniar.findUnique({
      where: { id: webniarId },
    });
    if (!existingWebniar)
      return { success: false, message: "Webinar not found!" };

    // Zod validation
    const result = WebniarSchema.safeParse(values);
    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const {
      title,
      instructor,
      instructorTitle,
      date,
      time,
      duration,
      description,
      level,
      maxAttendees,
      price,
      categoryId,
      status,
    } = result.data;

    // Update webinar
    await prisma.webniar.update({
      where: { id: webniarId },
      data: {
        title,
        instructor,
        instructorTitle,
        date: new Date(date),
        time,
        duration,
        description,
        level,
        maxAttendees: Number(maxAttendees),
        price,
        categoryId,
        status,
      },
    });

    return { success: true, message: "Webinar updated successfully!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const deleteWebniar = async (webniarId: string, userId: string) => {
  try {
    // User check
    const user = await getUserById(userId);
    if (!user) return { success: false, message: "Invalid credentials!" };

    // Webniar exist check
    const existingWebniar = await prisma.webniar.findUnique({
      where: { id: webniarId },
    });
    if (!existingWebniar)
      return { success: false, message: "Webinar not found!" };

    // Delete webinar
    await prisma.webniar.delete({
      where: { id: webniarId },
    });

    return { success: true, message: "Webinar deleted successfully!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};
