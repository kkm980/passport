"use client"
import * as React from "react"

import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import DialogueBox from "./DialogueBox"
import {useTheme} from 'next-themes'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function ScrollBox() {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <ScrollArea className={`h-72 w-[30%] rounded-lg border ${resolvedTheme==='dark'?'bg-[#27374D] border-[#1F6E8C] text-[#9DB2BF] shadow-teal-300 shadow-md':'bg-white border-black shadow-2xl shadow-blue-300'} rounded-lg`}>
      <div className="p-4 relative rounded-lg">
        <h4 className="mb-4 text-xl font-medium leading-none sticky top-0">Tags</h4>
        {tags.map((tag) => (
          <>
            <div key={tag} className="text-sm">
              {/* {tag} */}
              <DialogueBox tag={tag}/>
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}
