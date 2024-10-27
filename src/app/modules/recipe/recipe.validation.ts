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
        
 
});

export const validateRecipeSchema = {
  createRecipeValidation,
};



