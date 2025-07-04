"use server";

import prisma from "@/lib/prisma";
import { validate } from "@/lib/validate";
import { InstructorSchema } from "@/schemas/InstructorSchema";
import { z } from "zod";

export const createInstructor = async (
  values: z.infer<typeof InstructorSchema>,
  userId: string
) => {
  try {
    const { data, error } = validate(InstructorSchema, values);
    if (error) return { success: false, message: error };

    const { title, specialization, bio } = data;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return { success: false, message: "User not found!" };
    }

    const existingInstructor = await prisma.instructor.findUnique({
      where: { userId },
    });

    if (existingInstructor) {
      return { success: false, message: "Instructor already exists!" };
    }

    const instructor = await prisma.instructor.create({
      data: {
        userId,
        title,
        specialization,

        bio,
      },
    });

    return {
      success: true,
      message: "Instructor created successfully",
      data: instructor,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const getInstructorByUserId = async (userId: string) => {
  try {
    const instructor = await prisma.instructor.findUnique({
      where: { userId },
      include: {
        user: true,
        webinarsHosted: true,
      },
    });

    if (!instructor) {
      return { success: false, message: "Instructor not found!" };
    }

    return { success: true, data: instructor };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const getAllInstructors = async () => {
  try {
    const instructors = await prisma.instructor.findMany({
      include: {
        user: true,
        webinarsHosted: true,
      },
      orderBy: {
        joinedDate: "desc",
      },
    });

    return { success: true, data: instructors };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
};

export const updateInstructor = async (
  values: z.infer<typeof InstructorSchema>,
  userId: string
) => {
  try {
    // Check if instructor exists

    const { data, error } = validate(InstructorSchema, values);
    if (error) return { success: false, message: error };

    const { title, specialization, bio } = data;
    const instructor = await prisma.instructor.findUnique({
      where: { userId },
    });

    if (!instructor) {
      return { success: false, message: "Instructor not found!" };
    }

    // Update instructor fields
    const updatedInstructor = await prisma.instructor.update({
      where: { userId },
      data: {
        title,
        specialization,
        bio,
      },
    });

    return {
      success: true,
      message: "Instructor updated successfully!",
      data: updatedInstructor,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Update failed!" };
  }
};

export const deleteInstructor = async (userId: string) => {
  try {
    await prisma.instructor.delete({
      where: { userId },
    });

    return { success: true, message: "Instructor deleted successfully!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Delete failed!" };
  }
};
