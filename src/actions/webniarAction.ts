import { getUserById } from "@/data/user";
import prisma from "@/lib/prisma";
import { validate } from "@/lib/validate";
import { WebniarSchema } from "@/schemas/webniarSchema";
import { z } from "zod";

export const createWebniar = async (
  values: z.infer<typeof WebniarSchema>,
  userId: string,
  instructorId: string
) => {
  try {
    // User validate
    const { data, error } = validate(WebniarSchema, values);
    if (error) return { success: false, message: error };

    const {
      title,
      date,
      time,
      duration,
      description,
      level,
      category, // yaha string aayi
      maxAttendees,
      price,
      status,
    } = data;
    const user = await getUserById(userId);
    if (!user) {
      return { success: false, message: "Invalid credentials!" };
    }

    // Zod validation
    const result = WebniarSchema.safeParse(values);
    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    await prisma.webniar.create({
      data: {
        title,
        instructorId,
        date: new Date(date),
        time,
        duration,
        description,
        level,
        maxAttendees: Number(maxAttendees),
        price,

        creatorId: userId,
        status,
        category,
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
        creator: true,
        instructor: true,
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
        instructor: true,
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
      date,
      time,
      duration,
      description,
      level,
      maxAttendees,
      price,
      category,
      status,
    } = result.data;

    // Update webinar
    await prisma.webniar.update({
      where: { id: webniarId },
      data: {
        title,
        date: new Date(date),
        time,
        duration,
        description,
        level,
        maxAttendees: Number(maxAttendees),
        price,
        category,
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
