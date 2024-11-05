import { z } from 'zod';



export const createRecipeValidation = z.object({
        title: z.string({
       required_error: "Title is required",
        }),
        image: z.string({
       required_error: "image is required",
        }),
        cookingTime: z.number({
       required_error: "cooking is required",
        }),
        
       isPremium: z.boolean({
       required_error: "isPremium is required",
        }),
       ingredient: z.string({
       required_error: "ingredient is required",
        }).optional(),
       description: z.string({
       required_error: "description is required",
        }).optional(),
        
 
});

export const validateRecipeSchema = {
  createRecipeValidation,
};



