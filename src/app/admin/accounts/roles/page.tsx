import Accounts_Sidebar from "../accounts_sidebar"
import Table from "./table"

export default function Home() {
    return (
      <main className="min-h-screen">
        <Accounts_Sidebar current_tab_id={3}/>
        <div className="ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <h1 className="text-2xl text-center my-8">Danh sách loại tài khoản trong hệ thống</h1>
          <div className="m-8 flex justify-center">
          <Table items={itemData.slice(0,5)}></Table>
          </div>
        </div>
      </main>
    )
  }

const itemData = [
  {
    id:1,
    role_name:"Admin",
    role_description:"Admin có thể tạo tài khoản, khóa tài khoản, phân quyền cho tài khoản, quản lý quyền truy cập, quản lý danh mục kho/ cửa hàng của siêu thị."
  },
  {
    id:2,
    role_name:"Thủ kho",
    role_description:"Thủ kho có thể quản lý kho và vị trí hàng hóa trong kho. Khi hàng hóa đến kho hoặc rời kho, trưởng kho kiểm hàng và xác nhận tình trạng phiếu nhập/phiếu xuất."
  },
  {
    id:3,
    role_name:"Nhân viên kinh doanh",
    role_description:"Nhân viên phòng kinh doanh có thể quản lý danh mục hàng hóa, xem thống kê hàng tồn kho, hàng sắp hết hạn, tạo phiếu xuất hàng từ kho đến một cửa hàng, tạo phiếu nhập hàng vào kho."
  }
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
