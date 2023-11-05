// import Button from "@mui/material/Button";
// import { ReactNode, useState } from "react";

// export function App_Table({head, items, buttons, load_link}:
//                 {head:Array<{head_name:string,className:string}>, items:any, buttons:Array<JSX.Element>, load_link:string}){
//     const [load_num, setLoad_num] = useState(0);
//     const [endLoad, setEndLoad] = useState(false);
//     const [stateful_item, setStateful_item] = useState(items);


//     const loadMore = async () => {
//         const res = await fetch('./find_accounts/load?n='+load_num);
//         if (!res.ok) {
//             // This will activate the closest `error.js` Error Boundary
//             throw new Error('Failed to fetch data')
//           }
//         else
//         {
//             const data = await res.json();
//             // data.itemData.map( (item:any) => {load_new(item)})
//             if(data.loaded_items[data.loaded_items.length-1]==null)
//             {    
//                 data.loaded_items = data.loaded_items.filter(Boolean)
//                 setEndLoad(true);
//             }
            
//             load_new(data.loaded_items)
//             setLoad_num(load_num+1);
//         }
//     }

    
//     function load_new(itemData:any) {
//         setStateful_item(
//         stateful_item.concat(itemData)
//         );
//     }


//     const minw_table = {
//         minWidth:"480px",
//     }

//     const cell_classname = "py-2 ";

//     return(
//         <div style={minw_table} className='flex flex-col justify-center w-5/6'>
//                 <table className="table-fixed w-full">
//                     <thead>
//                         <tr className="sticky top-16 bg-slate-300 text-gray-900 text-xl">
//                             {
//                                 head.map((h)=>(
//                                 <th className={cell_classname+' '+h.className}>{h.head_name}</th>
//                             ))}
//                             {
//                                 buttons.map(()=>(
//                                 <th className={cell_classname+'w-1/12'}></th>
//                             ))}
//                             {/* <th className={cell_classname+' w-1/4'}>Email</th>
//                             <th className={cell_classname+' w-1/4'}>Tên người dùng</th>
//                             <th className={cell_classname}>Loại tài khoản</th>
//                             <th className={cell_classname}>Trạng thái</th>
//                             <th className={cell_classname}>Ngày tạo</th>
//                             <th className={cell_classname+' w-1/12'}></th> */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             stateful_item.map((item:any, index:number) => (
//                                 <tr key={item[Object.keys(item)[0]]} className={(index%2===0 ? "bg-gray-700" : "bg-gray-900") + " text-center"}>
//                                     {
//                                         Object.entries(item).map((i:any) => (
//                                             <td className={cell_classname}>{i.value}</td>
//                                         ))
//                                     }
//                                     {
//                                         buttons.map((b)=>(
//                                             <td className={cell_classname}>
//                                                 {b}
//                                             </td>
//                                         ))
//                                     }
//                                     {/* <td className={cell_classname}>{item[Object.keys(item)[1]]}</td>
//                                     <td className={cell_classname}>{item.username}</td>
//                                     <td className={cell_classname}>{item.role}</td>
//                                     <td className={cell_classname}>{item.status}</td>
//                                     <td className={cell_classname}>{item.createdDate}</td>
//                                     <td className={cell_classname}>
//                                         <button onClick={() => {handleOpen(item)}}>
//                                             <Image className='self-center' src='/icon/settings.png' width={32} height={32} alt="Detail"/>
//                                         </button>
//                                     </td> */}
//                                     {/* <td className={cell_classname}>{item.idstt=="2" ?
//                                         <button className='text-sky-300' onClick={() => {handleOpen(item.pblist), setIsPend(true)}}>Duyệt</button>
//                                         :<button onClick={() => {handleOpen(item.pblist), setIsPend(false)}}>
//                                             <Image className='self-center' src='/icon/read_more.png' width={32} height={32} alt="Detail"/>
//                                         </button>}
//                                     </td> */}
//                                 </tr>
//                             )
//                             )
//                         }
//                     </tbody>
//                 </table>
//                 {!endLoad && <Button className='bg-sky-300 hover:bg-sky-400 text-black' onClick={() => loadMore()}> Xem thêm... </Button>}
//             </div>
//     )
// }