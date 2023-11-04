import { Image_Text_View1 } from "@/app/components/image_view"
import Products_Sidebar from "../sidebar"
import Table from "./table"
import { Input_Option, Input_Text } from "@/app/components/input_field"
import {SearchForm_WithView} from "@/app/components/searchform_withview"
import {ProductForm} from '../form';
import { Product_ImageList_View } from "@/app/components/imagelist_view"
import { API } from "@/app/api/const"

// bg-white text-slate-700 dark:bg-slate-700 dark:text-slate-300

export default function Home() {
    return (
      <main className="min-h-screen">
        <Products_Sidebar current_tab_id={2}/>
        <div className="flex flex-col items-center ml-60 p-8 bg-slate-700 min-h-screen text-slate-300">
          <SearchForm_WithView View={Product_ImageList_View} UpdateForm={ProductForm} load_API={API.product.load} 
          update_API={API.product.update} 
          objectName="hàng hóa" loadSize={4} InputFields={<>
            <Input_Text label="Tên hàng hóa:" placeholder="(Bất kỳ)" name='name'/>
            <Input_Text label="Mô tả hàng hóa:" placeholder="(Bất kỳ)" name='description'/>
            {/* <Input_Text label="Mô tả kho:" placeholder="(Bất kỳ)" name='description'/> */}
          </>} />
        </div>
      </main>
    )
  }

const itemData = [
  {
    id:1,
    name:"Lốc 4 hộp sữa tươi tiệt trùng ít đường TH true MILK 180ml",
    img_link:"https://cdn.tgdd.vn/Products/Images/2386/80492/bhx/loc-4-hop-sua-tuoi-tiet-trung-it-duong-th-true-milk-180ml-202203042221008284.jpg",
    description:"Sữa tươi TH True Milk đảm bảo không sử dụng thêm hương liệu, mang vị ngon sữa tươi nguyên chất 100%, chứa nhiều vitamin và khoáng chất như Vitamin A, D, B1, B2, canxi, kẽm. Lốc 4 hộp sữa tươi tiệt trùng ít đường TH true MILK 180ml đóng lốc tiện lợi, tiết kiệm.",
    price:"36.600₫",
    exp:"10/6/2024",
    mfg:"10/6/2023"
  },
  {
    id:2,
    name:"Lốc 4 hộp thức uống lúa mạch Milo Active Go 180ml",
    img_link:"https://cdn.tgdd.vn/Products/Images/2945/84361/bhx/loc-4-hop-thuc-uong-lua-mach-milo-active-go-180ml-202104091059593418.jpg",
    description:"Sản phẩm sữa socola thơm ngon, giàu canxi và protein giúp cho cơ thể phát triển. Đặc biệt, thương hiệu sữa ca cao Milo nổi tiếng rất được các bé yêu thích và tin dùng. Lốc 4 hộp thức uống lúa mạch Milo Active Go 180ml thơm ngon, đầy dinh dưỡng, vị ngon kích thích vị giác.",
    price:"31.300₫",
    exp:"16/7/2024",
    mfg:"16/7/2023"
  },
  {
    id:3,
    name:"6 lon nước tăng lực Sting hương dâu 320ml",
    img_link:"https://cdn.tgdd.vn/Products/Images/3226/195238/bhx/6-lon-nuoc-tang-luc-sting-huong-dau-320ml-202111061732537179.jpg",
    description:"Nước tăng lực Sting với mùi vị thơm ngon, sảng khoái cùng hương dâu dễ chịu. Sting giúp cơ thể bù đắp nước, bổ sung năng lượng, vitamin C và E, giúp xua tan cơn khát và cảm giác mệt mỏi cùng dâu cho nhẹ nhàng và dễ chịu. Cam kết chính hãng, chất lượng và an toàn.",
    price:"64.800₫",
  },
  {
    id:4,
    name:"6 chai nước khoáng i-on Pocari Sweat 500ml",
    img_link:"https://cdn.tgdd.vn/Products/Images/3226/200350/bhx/6-chai-nuoc-khoang-i-on-pocari-sweat-500ml-202103272224452960.jpg",
    description:"Nước khoáng Pocari Sweat bổ sung nước và các ion thiết yếu như Na+, K+, Mg2+, Cl-, Ca2+, giúp cơ thể hấp thụ nhanh, tái tạo năng lượng và sức sống ngay từ bên trong. 6 chai nước khoáng i-on Pocari Sweat 500ml được chiết xuất từ nguồn nước khoáng trong thiên nhiên tốt cho sức khỏe.",
    price:"84.000₫",
  },
  {
    id:5,
    name:"6 chai nước tăng lực Warrior hương dâu 330ml",
    img_link:"https://cdn.tgdd.vn/Products/Images/3226/209218/bhx/6-chai-nuoc-tang-luc-warrior-huong-dau-330ml-202306191527242763.jpg",
    description:"Nước tăng lực vị dâu thơm ngon, ngọt dịu mà không gắt cổ, 6 chai nước tăng lực Warrior hương dâu 330ml chính hãng nước tăng lực Warrior chứa vitamin B3, B6, B12 thúc đẩy quá trình trao đổi chất, cung cấp năng lượng bền bỉ cho cả thể chất và não bộ, duy trì tỉnh táo và tập trung.",
    price:"45.000₫",
  },
  {
    id:6,
    name:"6 chai trà chanh với sả Fuze Tea 450ml",
    img_link:"https://cdn.tgdd.vn/Products/Images/8938/204234/bhx/6-chai-tra-chanh-voi-sa-fuze-tea-450ml-202103290413266007.jpg",
    description:"6 chai trà chanh với sả Fuze Tea 450ml với trà xanh tươi mát, quả chanh chua ngọt sảng khoái và hương sả thơm thư giãn. Trà Fuze Tea cho bạn một thức uống giải khát thơm ngon, nước trà tốt cho sức khỏe vị ít ngọt, cùng chất chống oxy hóa TPP-C dồi dào, cùng lượng vitamin C cao.",
    price:"36.000₫",
  },
  {
    id:7,
    name:"Lốc 6 chai trà đen C2 hương đào 230ml",
    img_link:"https://cdn.tgdd.vn/Products/Images/8938/256862/bhx/loc-6-chai-tra-den-c2-huong-dao-230ml-202111271341434630.jpg",
    description:"Chắt lọc từ 100% trà tự nhiên chế biến và đóng chai trong cùng 1 ngày bởi C2, đem đến hương vị trà đậm đà tuyệt vời, lốc 6 chai trà đen C2 hương đào 230ml mang lại cho bạn lựa chọn mới trong thưởng thức trà, giúp giải nhanh cơn khát, bổ sung năng lượng cho ngày dài năng động và sảng khoái.",
    price:"25.000₫",
  },
]