'use client'

import { Input_Option, Input_Text } from "@/app/components/input_field";
import Table from "../../../components/imagelist_view";
import { useEffect, useRef, useState } from "react";
import { dark } from "@mui/material/styles/createPalette";

export default function Form({items}:{items:any}) {
    const [stateful_item, setStateful_item] = useState(items);
    // const [load_num, setLoad_num] = useState(0);
    const [endLoad, setEndLoad] = useState(false);
    let searchObjectRef = useRef<any>({n:1});
    const loadSize = 2

    // let searchObject:any;
    // useEffect(()=>{
    //     // loadSize=stateful_item.length || 1;
    //     console.log(loadSize);
    //     // searchObject.n=1;// do stuff here...
    // }, [])

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
            <h1 className="text-2xl text-center my-2">Tìm kiếm kho</h1>
            <form method="post" id="form1" onSubmit={formSubmit}>
                <div className="my-4 flex flex-row justify-center space-x-8">
                <div className="">
                    <Input_Text label="Tên kho:" placeholder="(Bất kỳ)" name='name'/>
                    <Input_Text label="Mô tả kho:" placeholder="(Bất kỳ)" name='desciption'/>
                </div>
                <div className="">
                    <Input_Text label="Địa chỉ kho:" placeholder="(Bất kỳ)" name='address'/>
                </div>
                </div>
                <div className="flex justify-center	">
                <button type="submit" className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">Tìm kiếm</button>
                </div>
            </form>
            
            <h1 className="text-2xl text-center my-8">Danh sách kho</h1>
                <div className="m-8 flex justify-center">
                        <Table stateful_items={stateful_item} endLoad={endLoad} loadMore={() => load(false)} 
                                setStateful_item={setStateful_item}/>
                </div>
        </>
    )
}