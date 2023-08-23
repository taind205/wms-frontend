'use client'

import Link from "next/link";



export default function SideBar({tabs, current_tab_id}:{tabs:any,current_tab_id:number}) {
    // const h = window.screen.availHeight -(16*4) || '';
    // const sidebar_style = {
    //     height: '90%'
    // }

    return(
        <>
            {/* <div className="flex-none h-16 text-center"></div> Topbar is h-16 */}
            <div className="flex flex-col left-0 h-screen w-60 bg-slate-800">
                <div className=" text-sky-300 flex flex-col overflow-y-auto">
                {tabs.map((t:{name:string, link:string, id:number}) => (
                        current_tab_id ==t.id ?
                        <Link id={t.link} className='px-4 py-2 hover:bg-slate-700 bg-slate-600 text-sky-200' key={t.id} href={t.link}>{t.name}</Link>
                        :
                        <Link id={t.link} className='px-4 py-2 hover:bg-slate-700' key={t.id} href={t.link}>{t.name}</Link>
                    ))}
                </div>
                <div className="flex-none h-16 text-center"></div> {/*Topbar is h-16*/}
            </div>
        </>
    )

}