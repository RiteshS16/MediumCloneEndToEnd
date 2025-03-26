// We are putting some common things in common folder such as zod validation type inference as it will be used by both frontend and backend.
//Here we will do it in traditional way without monorepos/turorepo and will upload our types/variables over npm module

import z from "zod"

export const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})


export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
})


export const createBlogInput=z.object({
    title:z.string(),
    content:z.string(),
})


export const updateBlogInput=z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})


//Types my frontend will need to check for valid inputs by the user
export type SignupInput=z.infer<typeof signupInput>
export type SigninInput=z.infer<typeof signinInput>
export type CreateBlogInput=z.infer<typeof createBlogInput>
export type UpdateBlogInput=z.infer<typeof updateBlogInput>

//QUESTION: How to import variables to backend and frontend from here?
//One way: use absolute paths like ../../../common inside index.ts in backend. But this is not the ideal way of doing it.
//But above logic might give error when uploading backend on cloudfare bec cloudfare may not understand anything outside backend folder.
//Ideal way: Conver this common folder into an nmp module and import that NPM module in backend folder.
//See online how to publish an npm module
//The above way is ideal untill you run monorepos.