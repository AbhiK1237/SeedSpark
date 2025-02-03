import React from 'react'
import {Startup_by_author} from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import StartupCard,{ StartupTypeCard } from '../StartupCard';


const User_startups = async({id}:{id:string}) => {
    const startups = await client.fetch(Startup_by_author,{id});
  return (
    <>
    {startups.length>0 ? startups.map((startup:StartupTypeCard)=>(
     <StartupCard key={startup._id} post={startup} />
    )):(
        <p className='no-result'>No posts yet</p>
    )
}

    
    </>
  )
}

export default User_startups