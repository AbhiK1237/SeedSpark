"use client";
import React, { useActionState, useState } from 'react'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import {z} from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/sanity/lib/actions';
import { parseServerActionResponse } from '@/lib/utils';
const StartupForm = () => {
   
    const [errors,setErrors] = useState<Record<string,string>>({})
    const [pitch,setPitch] = useState('');
   const {toast} = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any ,formdata:FormData) => {
        try{
            const formValues = {
                title: formdata.get('title') as string,
                description: formdata.get('description') as string,
                category: formdata.get('category') as string,
                link: formdata.get('link') as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);
        
            const result = await createPitch(prevState,formdata,pitch);
            
            if(result.status == 'SUCCESS'){
                toast({
                    title: 'Success',
                    description: 'Your idea has been submitted',
                })   
                router.push(`/startup/${result._id}`);
            }
            return result;
        }
        catch(error){
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string,string>);
                toast({
                    title: 'Error',
                    description: "Please check your inputs and try again",
                    variant: 'destructive'
                })
                return {...prevState, status: 'ERROR', error: 'Validation failed'}

            }
            toast({
                title: 'Error',
                description: 'An Unexpected error has occured',
                variant: 'destructive'  
            })
            return {...prevState, status: 'ERROR', error: 'An Unexpected error has occured'}
        }
        finally{

        }
    }

    const [state,formAction,isPending] = useActionState(handleFormSubmit,
        {
            error: "",
            status: "INITIAL",
          }
       ) 

  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor='title' className='startup-form_label'>Title</label>
           <Input 
           id="title"
           name='title'
           className='startup-form_input'
           required
           placeholder='startup title'
           />
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>
        <div>
            <label htmlFor='description' className='startup-form_label'>Description</label>
           <Textarea 
           id="description"
           name='description'
           className='startup-form_textarea'
           required
           placeholder='startup Description'
           />
        {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>
        <div>
            <label htmlFor='category' className='startup-form_label'>Category</label>
           <Input 
           id="category"
           name='category'
           className='startup-form_input'
           required
           placeholder='startup category (Tech, Health, Education ...)'
           />
        {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>
        <div>
            <label htmlFor='link' className='startup-form_label'>Image URL</label>
           <Input 
           id="link"
           name='link'
           className='startup-form_input'
           required
           placeholder='Startup Image URL'
           />
        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>
        <div data-color-mode="light">
            <label htmlFor='pitch' className='startup-form_label'>Pitch</label>
            <MDEditor
        value={pitch}
        onChange={(value) => setPitch(value as string)}
        id='pitch'
        preview='edit'
        height={300}
        style={{borderRadius: '20', overflow: 'hidden'}}
        textareaProps={{
            placeholder: 'Briefly describe your idea and what problem it solves'
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
      />
   
        {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
        </div>

        <Button className='startup-form_btn text-white' type='submit' disabled={isPending}>
            {isPending? 'Submitting...': 'Submit Your Pitch'}
            <Send className='size-6 ml-2' />
        </Button>
    </form>
  )
}

export default StartupForm