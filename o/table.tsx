'use client'

// import WidgetsIcon from '@mui/icons-material/Widgets';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#334155ff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button className='text-sky-300' onClick={handleOpen}>Chọn</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <h2 id="child-modal-title" className='text-center my-2'>Chọn vị trí xuất kho</h2>
            <p className='grid justify-items-center my-3' id="child-modal-description">
                <div>
                    <div className="mx-1">Số lượng:</div>
                    <input className="m-1 px-0.5 text-sky-950"></input>
                    <div className="mt-1 mx-1">Vị trí kho:</div>
                    <input className="m-1 px-0.5 text-sky-950"></input>
                </div>
            </p>
            <div className='grid justify-items-center my-1'>
                <Button onClick={handleClose} className='self-center'>Thêm</Button>
            </div>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

const cell_classname = "py-2 ";

export default function Table({items}:{items:any}){
    const [stateful_item, setStateful_item] = useState(items);
    const [isPend, setIsPend] = useState(false);
    const [open, setOpen] = useState(false);
    const [load_num, setLoad_num] = useState(0);
    const [endLoad, setEndLoad] = useState(false);
    const [content, setContent] = useState({
        id:0,
        username:"",
        email:"",
        role:"",
        status:"",
        createdDate:""
    });
    const handleOpen = (content:any) => {setOpen(true); setContent(content);}
    const handleClose = () => setOpen(false);

    const loadMore = async () => {
        const res = await fetch('./find_accounts/load?n='+load_num);
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
          }
        else
        {
            const data = await res.json();
            // data.itemData.map( (item:any) => {load_new(item)})
            if(data.loaded_items[data.loaded_items.length-1]==null)
            {    
                data.loaded_items = data.loaded_items.filter(Boolean)
                setEndLoad(true);
            }
            
            load_new(data.loaded_items)
            setLoad_num(load_num+1);
        }
    }


    function load_new(itemData:any) {
        setStateful_item(
        stateful_item.concat(itemData)
        );
    }

    const minw_table = {
        minWidth:"480px",
    }

    const vh80 = {
        height: '80vh'
    }

    const fade_mystyle = {
        top:"0%",
        right:"0%",
        bot:"0%",
        left:"0%",
        width:"100%",
        height:"100%",
        backgroundColor:"#000000b3"
        };

    return(
        <>
            <div style={minw_table} className='flex flex-col justify-center w-5/6'>
                <table className="table-fixed w-full">
                    <thead>
                        <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                            <th className={cell_classname+' w-1/4'}>Email</th>
                            <th className={cell_classname+' w-1/4'}>Tên người dùng</th>
                            <th className={cell_classname}>Loại tài khoản</th>
                            <th className={cell_classname}>Trạng thái</th>
                            <th className={cell_classname}>Ngày tạo</th>
                            <th className={cell_classname+' w-1/12'}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stateful_item.map((item:{id:number, email:string; username:string; role:string; 
                                status:string; createdDate:string}, index:number) => (
                                <tr key={item.id} className={(index%2===0 ? "bg-gray-700" : "bg-gray-900") + " text-center"}>
                                    <td className={cell_classname}>{item.email}</td>
                                    <td className={cell_classname}>{item.username}</td>
                                    <td className={cell_classname}>{item.role}</td>
                                    <td className={cell_classname}>{item.status}</td>
                                    <td className={cell_classname}>{item.createdDate}</td>
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
                {!endLoad && <Button className='bg-sky-300 hover:bg-sky-400 text-black' onClick={() => loadMore()}> Load more </Button>}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                
                <Box sx={style}>
                    <Typography id="modal-modal-title" className='text-center text-2xl my-4' variant="h6" component="h2">
                        Thao tác lên tài khoản
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                        <div className='flex flex-col'>
                            <div className="m-2">
                                Tên người dùng: {content.username} 
                            </div>
                            <div className="m-2">
                                Email: {content.email}
                            </div>
                            <div className="m-2">
                                Ngày tạo: {content.createdDate}
                            </div>
                            <div className="flex flex-row">
                                <div className="m-2">Loại tài khoản:</div>
                                <select className="m-2 text-black truncate" name="" id="">
                                    <option value="">Bất kỳ</option>
                                    <option value="saab" selected={content.role=="Admin"}>Admin</option>
                                    <option value="mercedes" selected={content.role=="Thủ kho"}>Thủ kho</option>
                                    <option value="audi" selected={content.role=="Nhân viên kinh doanh"}>Nhân viên kinh doanh</option>
                                </select>
                            </div>
                            <div className="flex flex-row">
                                <div className="m-2">Trạng thái tài khoản:</div>
                                <select className="m-2 text-black truncate" name="" id="">
                                    <option value="">Bất kỳ</option>
                                    <option value="saab" selected={content.status=="Đã khóa"}>Đã khóa</option>
                                    <option value="mercedes" selected={content.status=="Khả dụng"}>Khả dụng</option>
                                </select>
                            </div>
                            <button className="self-center m-6 px-4 py-1 rounded bg-sky-300 hover:bg-sky-400 text-black">Lưu thay đổi</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}