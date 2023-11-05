'use client'
import { cookies } from 'next/dist/client/components/headers';
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';
import { getCookies } from '../func/cookies';
import { Personal_Info_Form } from './input_form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { postFormData } from '../func/form_action';
import { API } from '../api/const';

export default function TopBar({pages, childpages}:{pages:any, childpages:Array<any>}) {
    const [open, setOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [isShown2, setIsShown2] = useState(false);
    const [name, setName] = useState('');
    const [inputValue, setInputValue] = useState('');
    
    const [options, setOptions] = useState<any[]>(childpages);
    const [openSearch, setOpenSearch] = useState(false);
    
    useEffect(()=>{
        // getCookies('fullName').then((v)=>{
        //     setName(v);})     
        setName(sessionStorage.getItem('fullName')||'');
    }, [])

    const handleOpen = () => {setOpen(true);}
    const handleClose = () => setOpen(false);

      const loadResult = async (searchKey:string) => {
        console.log("load",searchKey);
        let data = childpages.filter((v)=>v.name.includes(searchKey))
        setInputValue(searchKey);
        setOptions(data);
    }

    const account_action = [
        {id:1, name:'Đăng xuất', link:'/logout'},
      ]

      const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#334155ff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    return(<>
            <div className="bg-slate-900 h-16 flex">
                {/* <div className='place-items-center flex-none flex'>
                    <Image className='mx-8 self-center' src='/icon/menu.png' width={40} height={40} alt="Menu icon"/>
                </div> */}
                <div className='place-items-center flex-none flex'>
                    <Image className='mx-8 self-center' src='/icon/warehouse.png' width={120} height={40} alt="App icon"/>
                </div>
                <div className="mx-4 relative flex-auto flex justify-center self-center min-w-60"
                 onBlur={()=>setTimeout(() => { setOpenSearch(false); }, 100)}>
                    <input className="px-2 rounded-lg bg-slate-300 placeholder:text-slate-500 text-slate-900 h-8" placeholder="Tìm kiếm..."
                    onClick={()=>setOpenSearch(true)}  onChange={(e)=>{loadResult(e.target.value)}} value={inputValue}/>
                    {openSearch && ( <div className='absolute top-0 translate-y-8 bg-slate-300 text-black flex flex-col w-60'>
                            {options.length<1? <div className="my-1 mx-4"> Không tìm thấy kết quả </div> : 
                            options.map((v:any,index:number) => (
                                <Link className={'text-left py-1 px-4 w-full hover:bg-sky-300'} key={index} 
                                onClick={()=>{setInputValue(''); setOpenSearch(false)} } href={v.link}>
                                    {v.name}</Link>
                        ))}</div>)}
                </div>
                <div className="text-sky-400 flex-auto flex justify-center">
                    {pages.length < 5 ?
                    <>{pages.map((p:{name:string, link:string, id:number}) => (
                    <Link className='mx-4 self-center' key={p.id} href={p.link}>{p.name}</Link>
                ))}</>
                    :
                    <>{pages.slice(0,4).map((p:{name:string, link:string}, index:number) => (
                        <Link className='mx-4 self-center' href={p.link} key={index}>{p.name}</Link>
                    ))}
                    <div className='px-6 py-2 self-center shrink-0' onMouseLeave={() => setIsShown(false)}>
                        <button onMouseEnter={() => setIsShown(true)}>
                            <Image className='' src='/icon/menu.png' width={40} height={40} alt="More"/>
                        </button>
                            {isShown && ( <div className='absolute flex flex-col text-sky-300 bg-slate-800 -translate-x-12'>
                                  {pages.slice(4).map((p:{name:string, link:string}) => (
                                    <Link key={p.link} className='my-2 mx-4 self-center' href={p.link}>{p.name}</Link>
                                    ))}
                            </div>)}
                    </div>
                    </>
                }
                    {/* <Link className='mx-4' href="">Kho và cửa hàng</Link>
                    <Link className='mx-4' href="">Thêm</Link> */}
                </div>
                <div className='place-items-center flex-none flex'>
                    
                    <div className='px-6 py-2 self-center' onMouseLeave={() => setIsShown2(false)}>
                        <button onMouseEnter={() => setIsShown2(true)}>
                            <Image className='' src='/icon/user.png' width={40} height={40} alt="User icon"/>
                        </button>
                            {isShown2 && ( <div className='absolute flex flex-col text-sky-300 bg-slate-800 -translate-x-28 w-40'>
                                    <div className='my-2 mx-4 self-center'>{name}</div>
                                    <button type='button' className='my-2 mx-4 self-center' onClick={()=>handleOpen()}>
                                        Thông tin cá nhân</button>
                                  {account_action.map((p:{name:string, link:string}) => (
                                    <Link key={p.link} className='my-2 mx-4 self-center' href={p.link}>{p.name}</Link>
                                    ))}
                            </div>)}
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" className='text-center text-2xl my-4' variant="h6" component="h2">
                    Cập nhật thông tin cá nhân
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                    <Personal_Info_Form button_title='Cập nhật thông tin' onSubmit={(e:any) => 
                              postFormData(e,API.userinfo.update)}/>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}