'use server'
import  slugify  from "slugify";
import { auth } from "@/auth"
import  {parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "./write-client";

export const createPitch = async (state: any, formData: FormData, pitch: string) => {
        const session = await auth();
        if(!session){
            return parseServerActionResponse({
                status: 'ERROR',
                error: 'Not signed in'
            })
        }
        const {title,description,category,link} = Object.fromEntries(
            Array.from(formData).filter(([key])=> key !== 'pitch'),
        );
        const slug = slugify(title as string,{lower: true,strict: true});
        try{
            const startup = {
                title,
                description,
                category,
                image:link,
                slug:{
                    _type: 'slug',
                    current: slug,
                },
                author:{
                    _type: 'reference',
                    _ref: session?.id 
                },
                pitch
            
            }
            const result = await writeClient.create({_type: 'startup', ...startup});
            return parseServerActionResponse({...result,error: "",status: 'SUCCESS'});
        }
        catch (error){
            console.log(error);
            return parseServerActionResponse({
                status: 'ERROR',
                error: JSON.stringify(error)
            })
        }

}