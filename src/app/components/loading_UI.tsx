'use client' 
import { Skeleton } from "@mui/material";

export default function LoadingSkeleton1() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div className="w-screen h-screen" style={{backgroundColor:"#00000080"}}></div>
  //<></>
  // <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" className="w-screen h-screen"/>
  // <main className="flex min-h-screen flex-col items-center justify-normal p-6">
  //   <Skeleton sx={{ bgcolor: 'grey.900' }} variant="rectangular" width={800} height={560} />
  //   </main>
}