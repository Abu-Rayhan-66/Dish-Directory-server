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



// import { z } from "zod";

// export const createFacilityValidationSchema = z.object({
//   name: z.string({
//     required_error: "Name is required",
//   }),
//   description: z.string({
//     required_error: "Description is required",
//   }),
//   pricePerHour: z.number({
//     required_error: "Price per hour is required",
//   }),
//   location: z.string({
//     required_error: "Location is required",
//   }),
//   image: z.string({
//     required_error: "image is required",
//   }),
// });

// export const updateFacilityValidationSchema = z.object({
//   name: z.string().optional(),
//   description: z.string().optional(),
//   pricePerHour: z.number().optional(),
//   location: z.string().optional(),
//   image: z.string().optional(),
// })