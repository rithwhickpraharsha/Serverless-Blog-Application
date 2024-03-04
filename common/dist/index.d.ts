import zod from 'zod';
export declare const signup_user: zod.ZodObject<{
    Email: zod.ZodString;
    Password: zod.ZodString;
    Username: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    Email: string;
    Password: string;
    Username: string;
}, {
    Email: string;
    Password: string;
    Username: string;
}>;
export declare const valid_blog: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    author: zod.ZodString;
    tags: zod.ZodArray<zod.ZodString, "many">;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    author: string;
    tags: string[];
}, {
    title: string;
    content: string;
    author: string;
    tags: string[];
}>;
export declare const signin_user: zod.ZodObject<{
    Email: zod.ZodString;
    Password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    Email: string;
    Password: string;
}, {
    Email: string;
    Password: string;
}>;
export declare const update_blog: zod.ZodObject<{
    id: zod.ZodString;
    blog_id: zod.ZodString;
    title: zod.ZodString;
    content: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
    blog_id: string;
}, {
    title: string;
    content: string;
    id: string;
    blog_id: string;
}>;
export type signup_user = zod.infer<typeof signup_user>;
export type signin_user = zod.infer<typeof signin_user>;
