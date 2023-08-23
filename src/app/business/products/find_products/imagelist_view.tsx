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
import { Image_Text_View1 } from '@/app/components/image_view';
import { LoadMore_Button } from '@/app/components/button';


const modal_style = {
    position: 'absolute' as 'absolute',
    width:'70%',
    height:'90%',
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

