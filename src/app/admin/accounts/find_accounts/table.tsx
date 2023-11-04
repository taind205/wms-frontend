'use client'

// import WidgetsIcon from '@mui/icons-material/Widgets';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image'
import { Input_Option, Input_Text } from '@/app/components/input_field';
import { postFormData, postFormData_UpdateState } from '@/app/func/form_action';
import { DateDisplay } from '@/app/func/convert';
import { API } from '@/app/api/const';

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

//   function ChildModal() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => {
//       setOpen(true);
//     };
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     return (
//       <React.Fragment>
//         <Button className='text-sky-300' onClick={handleOpen}>Chọn</Button>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="child-modal-title"
//           aria-describedby="child-modal-description"
//         >
//           <Box sx={{ ...style, width: 500 }}>
//             <h2 id="child-modal-title" className='text-center my-2'>Chọn vị trí xuất kho</h2>
//             <p className='grid justify-items-center my-3' id="child-modal-description">
//                 <div>
//                     <div className="mx-1">Số lượng:</div>
//                     <input className="m-1 px-0.5 text-sky-950"></input>
//                     <div className="mt-1 mx-1">Vị trí kho:</div>
//                     <input className="m-1 px-0.5 text-sky-950"></input>
//                 </div>
//             </p>
//             <div className='grid justify-items-center my-1'>
//                 <Button onClick={handleClose} className='self-center'>Thêm</Button>
//             </div>
//           </Box>
//         </Modal>
//       </React.Fragment>
//     );
//   }
//

// const vh80 = {
//     height: '80vh'
// }

// const fade_mystyle = {
//     top:"0%",
//     right:"0%",
//     bot:"0%",
//     left:"0%",
//     width:"100%",
//     height:"100%",
//     backgroundColor:"#000000b3"
//     };

const cell_classname = "py-2 ";

export default function Table({stateful_items, endLoad, loadMore, setStateful_item}:
                {stateful_items:any, endLoad:boolean, loadMore: () => Promise<void>, setStateful_item: any}){
    
    //const [isPend, setIsPend] = useState(false);
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState({
        id:'', 
        User:{fullname:''},
        Role:{name:''},
        Status:{name:''},
        createdAt:''});
    const handleOpen = (content:any) => {setOpen(true); setContent(content);}
    const handleClose = () => setOpen(false);

    

    return(
        <>
        <div style={{minWidth:"480px"}} className='flex flex-col justify-center w-5/6'>
            <table className="table-fixed w-full">
                <thead>
                    <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                        {/* <th className={cell_classname+' w-1/4'}>Email</th> */}
                        <th className={cell_classname+' w-1/5'}>Tài khoản</th>
                        <th className={cell_classname+' w-1/5'}>Tên người dùng</th>
                        <th className={cell_classname}>Loại tài khoản</th>
                        <th className={cell_classname}>Trạng thái</th>
                        <th className={cell_classname+' '}>Ngày tạo</th>
                        <th className={cell_classname+' w-1/12'}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stateful_items.map((item:{id:string, User:{fullname:string}, Role:{name:string}, 
                            Status:{name:string}, createdAt:string}, index:number) => (
                            <tr key={item.id} className={(index%2!=0 ? "bg-gray-700" : "bg-gray-900") + " text-center"}>
                                {/* <td className={cell_classname}>{item.email}</td> */}
                                <td className={cell_classname}>{item.id}</td>
                                <td className={cell_classname}>{item.User.fullname}</td>
                                <td className={cell_classname}>{item.Role.name}</td>
                                <td className={cell_classname}>{item.Status.name}</td>
                                <td className={cell_classname}>{DateDisplay(item.createdAt)}</td>
                                <td className={cell_classname}>
                                    <button onClick={() => {handleOpen(item)}}>
                                        <Image className='self-center' src='/icon/settings.png' width={32} height={32} alt="Detail"/>
                                    </button>
                                </td>
                                {/* <td className={cell_classname}>{item.idstt=="2" ?
                                    <button className='text-sky-300' onClick={() => {handleOpen(item.pblist), setIsPend(true)}}>Duyệt</button>
                                    :<button onClick={() => {handleOpen(item.pblist), setIsPend(false)}}>
                                        <Image className='self-center' src='/icon/read_more.png' width={32} height={32} alt="Detail"/>
                                    </button>}
                                </td> */}
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
            {endLoad ? <div className='m-2 text-center text-sky-400'>
                { stateful_items.length==0 ? "Không tìm thấy kết quả" : "Đã tải toàn bộ kết quả"} </div>
             : <Button className='bg-sky-300 hover:bg-sky-400 text-black' onClick={() => loadMore()}> Xem thêm... </Button>}
        </div>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" className='text-center text-2xl my-4' variant="h6" component="h2">
                    Thao tác lên tài khoản
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                    <div className='flex flex-col'>
                        <div className="m-2">
                            Tên tài khoản: {content.id} 
                        </div>
                        <div className="m-2">
                            Tên người dùng: {content.User.fullname} 
                        </div>
                        <div className="m-2">
                            Ngày tạo: {content.createdAt?.replace("T",' ').replace(".000Z","")}
                        </div>
                        <form method="post" id="form2" onSubmit={(e) => 
                                    { postFormData_UpdateState(e,API.acc.update,stateful_items,setStateful_item); handleClose() }}>
                            <input name='id' value={content.id} type='hidden'/>
                            <div className="flex flex-row">
                                <div className="m-2">Loại tài khoản:</div>
                                <select className="m-2 text-black truncate" name="role" id="" form="form2">
                                    <option value="1" selected={content.Role.name=="Admin"}>Admin</option>
                                    <option value="2" selected={content.Role.name=="Thủ kho"}>Thủ kho</option>
                                    <option value="3" selected={content.Role.name=="Nhân viên phòng kinh doanh"}>Nhân viên phòng kinh doanh</option>
                                </select>
                            </div>
                            <div className="flex flex-row">
                                <div className="m-2">Trạng thái tài khoản:</div>
                                <select className="m-2 text-black truncate" name="status" id="" form="form2">
                                    <option value="2" selected={content.Status.name=="Khóa"}>Khóa</option>
                                    <option value="1" selected={content.Status.name=="Khả dụng"}>Khả dụng</option>
                                </select>
                            </div>
                            <button type="submit" className="self-center m-6 px-4 py-1 rounded bg-sky-300 hover:bg-sky-400 text-black">Lưu thay đổi</button>
                        </form>
                    </div>
                </Typography>
            </Box>
        </Modal>
        </>
    )
}