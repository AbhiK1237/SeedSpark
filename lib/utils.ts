import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(date: string){
  return new Date().toLocaleDateString("en-US",  {
    day: "numeric",
     month: "long",
      year: "numeric"
  })
}

export const parseServerActionResponse = <T>(response : T) =>{
  return JSON.parse(JSON.stringify(response));
}