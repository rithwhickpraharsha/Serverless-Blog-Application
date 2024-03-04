import zod from 'zod';


export const signup_user = zod.object({
    Email : zod.string().email(),
    Password : zod.string().min(6),
    Username : zod.string().min(4)
});


export const valid_blog = zod.object({
    title:zod.string().min(3),
    content : zod.string().min(10),
    author : zod.string(),
    tags : zod.array(zod.string()).max(10)
});

export const signin_user = zod.object({
    Email:zod.string().email(),
    Password : zod.string().min(4)
});

export const update_blog = zod.object({
    id : zod.string(),
    blog_id : zod.string(),
    title : zod.string(),
    content : zod.string()
});

export type signup_user = zod.infer<typeof signup_user>;
export type signin_user = zod.infer<typeof signin_user>;
