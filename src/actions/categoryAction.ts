import { getUserById } from "@/data/user";
import prisma from "@/lib/prisma";
import { CategorySchema } from "@/schemas/CategorySchema";
import { z } from "zod";

export const createCategory = async (
  values: z.infer<typeof CategorySchema>,
  id: string
) => {
  try {
    // Validate user existence
    const user = await getUserById(id);

    if (!user) {
      return { success: false, message: "Invalid credentials!" };
    }

    // Validate input values with Zod (in case you want double safety here too)
    const result = CategorySchema.safeParse(values);

    if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors };
    }

    const { title } = result.data;

    // Create the category
    await prisma.category.create({
      data: {
        title,
        createdBy: id,
      },
    });

    return { success: true, message: "Successfully created category!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const getCategory = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, categories };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return { success: false, message: "Category not found!" };
    }

    return { success: true, category };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const updateCategory = async (
  categoryId: string,
  values: z.infer<typeof CategorySchema>,
  id: string
) => {
  try {
    const user = await getUserById(id);
    if (!user) return { success: false, message: "Invalid credentials!" };

    const result = CategorySchema.safeParse(values);
    if (!result.success)
      return { success: false, errors: result.error.flatten().fieldErrors };

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory)
      return { success: false, message: "Category not found!" };

    await prisma.category.update({
      where: { id: categoryId },
      data: {
        title: values.title,
      },
    });

    return { success: true, message: "Category updated successfully!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};

export const deleteCategory = async (categoryId: string, id: string) => {
  try {
    const user = await getUserById(id);
    if (!user) return { success: false, message: "Invalid credentials!" };

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!existingCategory)
      return { success: false, message: "Category not found!" };

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return { success: true, message: "Category deleted successfully!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Something went wrong!" };
  }
};
