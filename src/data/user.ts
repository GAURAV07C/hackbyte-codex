"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByUserName = async (userName: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { userName },
      select: {
        id: true,

        name: true,
        image: true,
        userName: true,

        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,

        name: true,
        image: true,
        userName: true,
        role:true,
        Bio:true,
        company:true,
         linkedin:true,
         location:true,
          phone:true,
          collegeLocation:true,
          collegeName:true,
          currentYear:true,
          designation:true,
          website:true,
  

        email: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getRandomUsers = async (id: string) => {
  try {
    const randomusers = await prisma.user.findMany({
      where: {
        AND: [{ NOT: { id: id } }],
      },
      select: {
        id: true,
        name: true,
        userName: true,
        image: true,
      },
      take: 3,
    });

    return randomusers;
  } catch {
    return [];
  }
};

export const getAllUsers = async () => {
  try {
    const randomusers = await prisma.user.findMany();

    return { success: true, data: randomusers };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
  }
}

export const getAllCampusLead = async () => {
  try {

    const user = await prisma.user.findMany({
      where: {
        role:"LEAD"
      }

    })

    return {sucess:true, data:user}

  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong!" };
    }
}

export async function updateProfile(formData: FormData, userId: string) {
  try {
    const name = formData.get("name") as string;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });

    revalidatePath("/");
    return { success: true, user };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}






//  useEffect(() => {
//     async function fetchInstructors() {
//       const result = await getAllWebniars();
//       console.log("data", result?.webniars);

//       if (result && result.success && Array.isArray(result.webniars)) {
//         setWebinars(result.webniars);
//       }
//     }

//     fetchInstructors();
//   }, []);

//   console.log("wejkn", webinars);