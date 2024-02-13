'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(data) {
    if(data){
        redirect(`/home`)
    }else{
        redirect(`/admin`)
    }
}