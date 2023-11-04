'use client'

// import { useState } from "react";
import Products_Sidebar from "../sidebar"
import {ProductForm, ProductTagForm} from "../form"
import { postFormData } from "@/app/func/form_action"
import {SearchForm_WithView} from "@/app/components/searchform_withview"
import { Input_Option, Input_Text } from "@/app/components/input_field"
import { Tag_Table } from "@/app/components/table"
import { API } from "@/app/api/const"

const categoryName = ['Loại hàng hóa', 'Thương Hiệu', 'Đóng gói', 'Thể tích', 'Khối lượng'];
export default function Home() {
    // 
    
    return (
      <main className="min-h-screen">
        <Products_Sidebar current_tab_id={3}/>
        <div className="flex flex-col ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-2">Thêm nhãn hàng hóa mới</h1>
          <ProductTagForm button_title='Thêm nhãn hàng hóa' onSubmit={(e:any) => 
                            postFormData(e,API.product_tag.add)}/>
          <SearchForm_WithView  View={Tag_Table} UpdateForm={ProductTagForm} load_API={API.product_tag.load} 
          update_API={API.product_tag.update}
          objectName="nhãn hàng hóa" loadSize={5} InputFields={<>
            <Input_Text label="Tên nhãn hóa:" placeholder="(Bất kỳ)" name='name'/>
            <Input_Option label="Loại nhãn hàng hóa:" name='CategoryId' options={categoryName.map((v,i)=>({name:v,value:i+1}))}/>
          </>} />

        </div>
      </main>
    )
  }

const itemData = [
  {
    id:1,
    email:"nguyen123@gmail.com",
    username:"Nguyễn Văn A",
    role:"Admin",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:2,
    email:"tran123@gmail.com",
    username:"Trần Văn B",
    role:"Thủ kho",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:3,
    email:"le123@gmail.com",
    username:"Lê Văn C",
    role:"Nhân viên kinh doanh",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:4,
    email:"nguyen123@gmail.com",
    username:"Nguyễn Văn A",
    role:"Admin",
    status:"Đã khóa",
    createdDate:"1/7/2023"
  },
  {
    id:5,
    email:"tran123@gmail.com",
    username:"Trần Văn B",
    role:"Thủ kho",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:6,
    email:"le123@gmail.com",
    username:"Lê Văn C",
    role:"Nhân viên kinh doanh",
    status:"Đã khóa",
    createdDate:"1/7/2023"
  },
  {
    id:7,
    email:"nguyen123@gmail.com",
    username:"Nguyễn Văn A",
    role:"Admin",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:8,
    email:"tran123@gmail.com",
    username:"Trần Văn B",
    role:"Thủ kho",
    status:"Đã khóa",
    createdDate:"1/7/2023"
  },
  {
    id:9,
    email:"le123@gmail.com",
    username:"Lê Văn C",
    role:"Nhân viên kinh doanh",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
]

//   const itemData = [
//     {
//       "registerBorrowId": "P1",
//       "registerDate": "2023-07-05",
//       "receivedDate": "2023-07-12",
//       "note": "Đã xuất kho",
//       "idstt": "5",
//       "pblist":
//       [
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Sữa milo lốc 180ml"
//             },
//             "exp":"1/1/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":24
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Coca chai 1,5l"
//             },
//             "exp":"1/2/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":20
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Pepsi lon 330ml"
//             },
//             "exp":"1/3/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":30
//         },
//       ]
//     },
//     {
//       "registerBorrowId": "P2",
//       "registerDate": "2023-07-07",
//       "receivedDate": " ",
//       "note": "Đã hủy, chưa xuất kho",
//       "idstt": "4",
//       "pblist":
//       [
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Sữa milo lốc 180ml"
//             },
//             "exp":"1/1/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":24
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Coca chai 1,5l"
//             },
//             "exp":"1/2/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":20
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Pepsi lon 330ml"
//             },
//             "exp":"1/3/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":30
//         },
//       ]
//     },
//     {
//       "registerBorrowId": "P3",
//       "registerDate": "2023-07-08",
//       "receivedDate": " ",
//       "note": "Đã duyệt, chờ vận chuyển",
//       "idstt": "3",
//       "pblist":
//       [
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Sữa milo lốc 180ml"
//             },
//             "exp":"1/1/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":24
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Coca chai 1,5l"
//             },
//             "exp":"1/2/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":20
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Pepsi lon 330ml"
//             },
//             "exp":"1/3/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":30
//         },
//       ]
//     },
//     {
//       "registerBorrowId": "P4",
//       "registerDate": "2023-07-15",
//       "receivedDate": " ",
//       "note": "Chưa duyệt",
//       "idstt": "2",
//       "pblist":
//       [
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Sữa milo lốc 180ml"
//             },
//             "exp":"1/1/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":24
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Coca chai 1,5l"
//             },
//             "exp":"1/2/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":20
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Pepsi lon 330ml"
//             },
//             "exp":"1/3/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":30
//         },
//       ]
//     },
//     {
//       "registerBorrowId": "P5",
//       "registerDate": "2023-07-18",
//       "receivedDate": " ",
//       "note": "Chưa duyệt",
//       "idstt": "2",
//       "pblist":
//       [
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Sữa milo lốc 180ml"
//             },
//             "exp":"1/1/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":24
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Coca chai 1,5l"
//             },
//             "exp":"1/2/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":20
//         },
//         {
//           "pb":
//           {
//             "p":
//             {
//               "name":"Nước ngọt Pepsi lon 330ml"
//             },
//             "exp":"1/3/2024",
//             "mfg":"1/1/2023"
//           },
//           "num":30
//         },
//       ]
//     },
// ]
