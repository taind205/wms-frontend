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


const cell_classname = "py-2 ";

export default function Table({items}:{items:any}){
    const [stateful_item, setStateful_item] = useState(items);



    const minw_table = {
        minWidth:"480px",
    }

    return(
        <>
            <div style={minw_table} className='flex flex-col justify-center w-5/6'>
                <table className="table-fixed w-full">
                    <thead>
                        <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
                            <th className={cell_classname+' w-1/6'}>Mã loại tài khoản</th>
                            <th className={cell_classname+' w-1/5'}>Tên Loại tài khoản</th>
                            <th className={cell_classname}>Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stateful_item.map((item:{id:number, role_name:string; role_description:string}, index:number) => (
                                <tr key={item.id} className={(index%2===0 ? "bg-gray-700" : "bg-gray-900") + " text-center"}>
                                    <td className={cell_classname}>{item.id}</td>
                                    <td className={cell_classname}>{item.role_name}</td>
                                    <td className={cell_classname}>{item.role_description}</td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}