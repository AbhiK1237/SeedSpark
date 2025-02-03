
import { defineType,defineField } from "sanity";
import { author } from "./author";
export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    
    fields:[
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options:{
                source:'title'
            }
        }),
        defineField({
            name: 'author',
            type: 'reference', // Ensure type is 'reference'
            to: [{ type: 'author' }], // Define the valid reference types
        }),
        defineField({
            name: 'views',
            type: 'number',
        }),
        defineField({
            name: 'description',
            type: 'string',
        }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule)=> Rule.min(1).max(20).required().error('Category is required'),
        }),
        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule)=> Rule.required()
        }),
        defineField({
            name: 'pitch',
            type: 'markdown',
        }),

    ],
})