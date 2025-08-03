"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { ProfileSchema } from "@/schemas/ProfileSchema";

export const ProfileUpdate = async (
  values: z.infer<typeof ProfileSchema>,
  userId: string
) => {
  try {
    const {
      name,

      phone,
      college,
      bio,
      collegeLocation,
      company,
      designation,
      linkedinUrl,
      currentYear,
      location,
      website,
    } = values;

    const updateProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,

        phone: phone,
        location: location,
        website: website,
        linkedin: linkedinUrl,
        company: company,
        designation: designation,

        collegeName: college,

        collegeLocation,
        currentYear,
        Bio: bio,
      },
    });

    return { sucess: true, data: updateProfile };
  } catch (error) {
    console.error("Profile update failed:", error);
    throw new Error("Could not update profile");
  }
};
