"use client"

import LineChart from '../components/Chart'
import 'tailwindcss/tailwind.css'
import ScrollBox from '../components/ScrollArea'
import DropDownMenu from '../components/DropDownMenu'

export default function Home() {

  return (
    <main className="px-8 font-sans">
      <div className="flex items-center justify-between pt-[60px]">
        <ScrollBox />
        <ScrollBox />
        <ScrollBox />
      </div> 

       <div className='w-[60%] h-[400px] mt-8 relative border border-text'>
        <LineChart />
        <div className='absolute top-0 right-0'>
          <DropDownMenu/>
        </div>
      
      </div>
    </main>
  )
}