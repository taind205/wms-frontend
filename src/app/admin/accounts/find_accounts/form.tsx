'use client'

import { Input_Option, Input_Text } from "@/app/components/input_field";
import Table from "./table";
import { useEffect, useRef, useState } from "react";
import { dark } from "@mui/material/styles/createPalette";

export default function Form({items}:{items:any}) {
    const [stateful_item, setStateful_item] = useState(items);
    // const [load_num, setLoad_num] = useState(0);
    const [endLoad, setEndLoad] = useState(false);
    let searchObjectRef = useRef<any>({n:0});
    const loadSize = 2

    // let searchObject:any;
    useEffect(()=>{
        // loadSize=stateful_item.length || 1;
        //console.log(loadSize);
        // searchObject.n=1;// do stuff here...
        load(true);
    }, [])

    const load = async (clearCurrent:boolean) => {
        console.log("load")
        console.log(searchObjectRef.current);
        const res = await fetch('./api/get', 
        { method: 'POST', body: JSON.stringify(searchObjectRef.current), headers: {'Content-Type': 'application/json'} });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
          }
        else{
            let data = await res.json();
            // console.log(loadSize);
            if(data.length < loadSize) //Alter: data[data.length-1]==null
            {    
                data = data.filter(Boolean)
                setEndLoad(true);
            }
            else setEndLoad(false);
            console.log(data);
            load_new(data,clearCurrent);
            searchObjectRef.current.n++;
        }
    }

    function load_new(itemData:any,clear:boolean) {
        if(clear)
            setStateful_item(itemData);
        else
            setStateful_item(
            stateful_item.concat(itemData)
            );
    }
    
    async function formSubmit(event:any) {
        console.log("submit")
        event.preventDefault();
        const form = event.target;
        const formdata = new FormData(form);
        const new_searchObj = Object.fromEntries(formdata.entries());
        
        searchObjectRef.current = new_searchObj;
        searchObjectRef.current.n = 0;
        console.log("search new:");
        load(true);
      }

    return(
        <>
            <h1 className="text-2xl text-center my-2">Tìm kiếm tài khoản</h1>
            <form className="flex flex-col items-center" method="post" id="form1" onSubmit={formSubmit}>
                <div className="my-4 grid grid-cols-2 gap-x-2 place-content-center">
                    <Input_Text label="Tài khoản:" placeholder="(Bất kỳ)" name='accountID'/>
                    <Input_Text label="Tên người dùng:" placeholder="(Bất kỳ)" name='fullName'/>
                    <Input_Option label="Loại tài khoản:" name="role" form="form1" options={[
                            {value:'',name:"Bất kỳ"}, {value:"1",name:"Admin"}, {value:"2",name:"Thủ kho"},
                            {value:"3",name:"Nhân viên kinh doanh"},
                        ]} />
                    <Input_Option label="Trạng thái tài khoản:" name="status" form="form1" options={[
                            {value:"",name:"Bất kỳ"}, {value:"1",name:"Khả dụng"}, {value:"2",name:"Đã khóa"}, 
                        ]} />
                </div>
                
                <button type="submit" className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">Tìm kiếm</button>
                
            </form>
            
            <h1 className="text-2xl text-center my-8">Danh sách tài khoản</h1>
                <div className="m-8 flex justify-center">
                        <Table stateful_items={stateful_item} endLoad={endLoad} loadMore={() => load(false)} 
                                setStateful_item={setStateful_item}/>
                </div>
        </>
    )
}