import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const n = searchParams.get('n')
  const loaded_items = []
  for (let i=0; i<2; i++)
  { 
    loaded_items.push(itemData[Number(n)*2+i+5])
  }
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   const data = await res.json()
 
  return NextResponse.json({ loaded_items })
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
  {
    id:10,
    email:"nguyen123@gmail.com",
    username:"Nguyễn Văn A",
    role:"Admin",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:11,
    email:"tran123@gmail.com",
    username:"Trần Văn B",
    role:"Thủ kho",
    status:"Đã khóa",
    createdDate:"1/7/2023"
  },
  {
    id:12,
    email:"le123@gmail.com",
    username:"Lê Văn C",
    role:"Nhân viên kinh doanh",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:13,
    email:"nguyen123@gmail.com",
    username:"Nguyễn Văn A",
    role:"Admin",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
  {
    id:14,
    email:"tran123@gmail.com",
    username:"Trần Văn B",
    role:"Thủ kho",
    status:"Đã khóa",
    createdDate:"1/7/2023"
  },
  {
    id:15,
    email:"le123@gmail.com",
    username:"Lê Văn C",
    role:"Nhân viên kinh doanh",
    status:"Khả dụng",
    createdDate:"1/7/2023"
  },
]

// const itemData = [
//   {
//     "registerBorrowId": "P6",
//     "registerDate": "2023-07-05",
//     "receivedDate": "2023-07-12",
//     "note": "Đã nhập kho #1",
//     "idstt": "5",
//     "pblist":
//     [
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Sữa milo lốc 180ml #1"
//           },
//           "exp":"1/1/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":24
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Coca chai 1,5l"
//           },
//           "exp":"1/2/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":20
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Pepsi lon 330ml"
//           },
//           "exp":"1/3/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":30
//       },
//     ]
//   },
//   {
//     "registerBorrowId": "P6",
//     "registerDate": "2023-07-05",
//     "receivedDate": "2023-07-12",
//     "note": "Đã nhập kho #2",
//     "idstt": "5",
//     "pblist":
//     [
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Sữa milo lốc 180ml"
//           },
//           "exp":"1/1/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":24
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Coca chai 1,5l #2"
//           },
//           "exp":"1/2/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":20
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Pepsi lon 330ml"
//           },
//           "exp":"1/3/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":30
//       },
//     ]
//   },
//   {
//     "registerBorrowId": "P6",
//     "registerDate": "2023-07-05",
//     "receivedDate": "2023-07-12",
//     "note": "Đã nhập kho #3",
//     "idstt": "5",
//     "pblist":
//     [
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Sữa milo lốc 180ml"
//           },
//           "exp":"1/1/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":24
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Coca chai 1,5l #2"
//           },
//           "exp":"1/2/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":20
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Pepsi lon 330ml"
//           },
//           "exp":"1/3/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":30
//       },
//     ]
//   },
//   {
//     "registerBorrowId": "P6",
//     "registerDate": "2023-07-05",
//     "receivedDate": "2023-07-12",
//     "note": "Đã nhập kho #4",
//     "idstt": "5",
//     "pblist":
//     [
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Sữa milo lốc 180ml"
//           },
//           "exp":"1/1/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":24
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Coca chai 1,5l #2"
//           },
//           "exp":"1/2/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":20
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Pepsi lon 330ml"
//           },
//           "exp":"1/3/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":30
//       },
//     ]
//   },
//   {
//     "registerBorrowId": "P6",
//     "registerDate": "2023-07-05",
//     "receivedDate": "2023-07-12",
//     "note": "Đã nhập kho #5",
//     "idstt": "5",
//     "pblist":
//     [
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Sữa milo lốc 180ml"
//           },
//           "exp":"1/1/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":24
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Coca chai 1,5l #2"
//           },
//           "exp":"1/2/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":20
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Pepsi lon 330ml"
//           },
//           "exp":"1/3/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":30
//       },
//     ]
//   },
//   {
//     "registerBorrowId": "P6",
//     "registerDate": "2023-07-05",
//     "receivedDate": "2023-07-12",
//     "note": "Đã nhập kho #6",
//     "idstt": "5",
//     "pblist":
//     [
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Sữa milo lốc 180ml"
//           },
//           "exp":"1/1/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":24
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Coca chai 1,5l #2"
//           },
//           "exp":"1/2/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":20
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Pepsi lon 330ml"
//           },
//           "exp":"1/3/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":30
//       },
//     ]
//   },
//   {
//     "registerBorrowId": "P6",
//     "registerDate": "2023-07-05",
//     "receivedDate": "2023-07-12",
//     "note": "Đã nhập kho #7",
//     "idstt": "5",
//     "pblist":
//     [
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Sữa milo lốc 180ml"
//           },
//           "exp":"1/1/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":24
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Coca chai 1,5l #2"
//           },
//           "exp":"1/2/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":20
//       },
//       {
//         "pb":
//         {
//           "p":
//           {
//             "name":"Nước ngọt Pepsi lon 330ml"
//           },
//           "exp":"1/3/2024",
//           "mfg":"1/1/2023"
//         },
//         "num":30
//       },
//     ]
//   },
// ]