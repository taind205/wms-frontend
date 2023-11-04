'use client'

import { Image_Text_View1 } from "@/app/components/image_view"
import Accounts_Sidebar from "../sidebar"
import { Input_Option, Input_Text } from "@/app/components/input_field"
import {SearchForm_WithView} from "@/app/components/searchform_withview"
import { Warehouse_ImageList_View } from "@/app/components/imagelist_view"
import { InputForm_Warehouse } from "@/app/components/input_form"
import { API } from "@/app/api/const"

export default function Home() {
    return (
      <main className="min-h-screen">
        <Accounts_Sidebar current_tab_id={2}/>
        <div className="flex flex-col items-center ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <SearchForm_WithView View={Warehouse_ImageList_View} UpdateForm={InputForm_Warehouse} load_API={API.warehouse.load} 
          update_API={API.warehouse.update} 
          objectName="kho" InputFields={<>
            <Input_Text label="Tên kho:" placeholder="(Bất kỳ)" name='name'/>
            <Input_Text label="Địa chỉ kho:" placeholder="(Bất kỳ)" name='address'/>
            <Input_Text label="Mô tả kho:" placeholder="(Bất kỳ)" name='description'/>
          </>} />
          {/*<h1 className="text-2xl my-2">Tìm kiếm kho</h1>

            <div className="flex flex-row space-x-8">
              <div className="my-4">
                <Input_Text label="Tìm kiếm theo tên kho:" placeholder="(Bất kỳ)" name='name'/>
                <Input_Option label="Sắp xếp kết quả theo:" name="sort_by" options={[
                  {value:"", name:"Tên kho"}, {value:"", name:"Ngày tạo"}, {value:"", name:"Ngày sửa đổi"},
                ]}/>
              </div>
              <div className="my-4">
                <Input_Text label="Tìm kiếm theo địa chỉ kho:" placeholder="(Bất kỳ)" name='address'/>
              
                 <div className="flex flex-row">
                  <div className="m-2">Trạng thái tài khoản:</div>
                  <select className="m-2 text-black truncate" name="" id="">
                    <option value="">Bất kỳ</option>
                    <option value="saab">Đã khóa</option>
                    <option value="mercedes">Khả dụng</option>
                  </select>
                </div> 
              </div>
            </div>
            <div className="flex ">
              <button className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">Tìm kiếm</button>
            </div>

          <h1 className="text-2xl my-8">Danh sách kho</h1>
            <div className="flex flex-col w-3/4">
                {itemData.map((i) => (
                  <Warehouse_View item={i}/>
                ))}
            </div>*/}
        </div>
      </main>
    )
  }

  // const itemData = [
  //     {
  //       id:'1',
  //       name: 'Kho 3',
  //       User:{fullname:"Nguyễn Văn A"},
  //       address:"123A",
  //       description:"Khả dụng",
  //       updatedAt:"1/7/2023"
  //     },
  //   ]
//       {
//         id:'tk2',
//         User:{fullname:"nguyen123@gmail.com"},
//         Role:{name:"Admin"},
//         Status:{name:"Khả dụng"},
//         createdAt:"1/7/2023"
//       }, 
//       {
//         id:'tk3',
//         User:{fullname:"nguyen123@gmail.com"},
//         Role:{name:"Admin"},
//         Status:{name:"Khả dụng"},
//         createdAt:"1/7/2023"
//       },
// ]

// const itemData = [
//   {
//     id:1,
//     name:"Kho hàng Q.7",
//     img_link:"http://localhost:8080/admin/warehouse/img/32",//"https://cdn.vietnambiz.vn/2019/10/24/tieu-chuan-chat-luong-min-15718907409811664827358.jpg",
//     description:"Sở hữu vị trí kho đẹp bậc nhất Quận 7, giao thông liên kết vùng cực kỳ thuận lợi để phát triển giao thương, phân phối hàng hóa dễ dàng, nhanh chóng: \n✅ Nằm ngay mặt tiền đường Đào Trí, đường xe Cont 24/24 \n✅ Cách cầu Phú Mỹ chưa đến 2km \n✅ Cách trục đường Nguyễn Văn Linh đi Quốc Lộ 1A chỉ 1,5km \n✅ Cách KCX Tân Thuận chỉ 6km \n✅ Gần các khu vực Cảng Cát Lái, Cảng VICT, Cảng Lotus…",
//     address:"Huỳnh Tấn Phát, Quận 7, TP.HCM",
//     mod_by:"Nguyễn Văn A",
//     mod_date:"1/7/2023"
//   },
//   {
//     id:2,
//     name:"Kho hàng Q.9",
//     img_link:"https://bds123.cdn.static123.com/images/thumbs/900x600/fit/2022/05/27/1_1653645014.jpg",
//     description:"Diện tích kho xưởng: 1000m2, khuôn viên rộng, kho riêng biệt, kết cấu vững chắc, nền chịu tải tốt. Có sẵn điện ba pha, nước thủy cục, PCCC bình, bảo vệ 24/24, đường xe container lưu thông thoải mái. Hợp đồng cho thuê dài hạn, thích hợp sản xuất nhiều ngành nghề hoặc làm kho chứa hàng.",
//     address:"Man Thiện, Quận 9, TP.HCM",
//     mod_by:"Nguyễn Văn B",
//     mod_date:"16/7/2023"
//   },
//   {
//     id:3,
//     name:"Kho hàng Q.1",
//     img_link:"https://avaco.com.vn/data/Product/thiet-ke-nha-xuong-nha-kho.jpg",
//     description:"Sở hữu vị trí kho đẹp bậc nhất Quận 7, giao thông liên kết vùng cực kỳ thuận lợi để phát triển giao thương, phân phối hàng hóa dễ dàng, nhanh chóng: \n✅ Nằm ngay mặt tiền đường Đào Trí, đường xe Cont 24/24 \n✅ Cách cầu Phú Mỹ chưa đến 2km \n✅ Cách trục đường Nguyễn Văn Linh đi Quốc Lộ 1A chỉ 1,5km \n✅ Cách KCX Tân Thuận chỉ 6km \n✅ Gần các khu vực Cảng Cát Lái, Cảng VICT, Cảng Lotus…",
//     address:"Hàm nghi, Quận 1, TP.HCM",
//     mod_by:"Lê Văn C",
//     mod_date:"22/7/2023"
//   },
// ]

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
