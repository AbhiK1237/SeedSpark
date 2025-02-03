import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { Startup_views_query } from '@/sanity/lib/queries'
import { formatNumber } from '@/lib/formatNumber'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'
const View = async ({id}:{id: string}) => {
    const {views: totalViews} = await client.withConfig({useCdn:false}).fetch(Startup_views_query,{id});

    after(async () => await writeClient
    .patch(id)
    .set({views: totalViews + 1})
    .commit());


   let view =  formatNumber(totalViews)
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <div className='view-text'>
            <span className='font-black'>{totalViews} {view}</span>
        </div>
    </div>
  )
}

export default View