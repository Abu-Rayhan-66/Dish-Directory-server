import { z } from 'zod';



export const createRecipeValidation = z.object({
        title: z.string({
       required_error: "Title is required",
        }),
        image: z.string({
       required_error: "image is required",
        }),
        content: z.string({
       required_error: "content is required",

})
 
});

export const validateRecipeSchema = {
  createRecipeValidation,
};



