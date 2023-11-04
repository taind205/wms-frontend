'use client'

import { Input_Option, Input_Text } from "@/app/components/input_field";
//import Table from "./table";
import React, { useEffect, useRef, useState } from "react";
import { dark } from "@mui/material/styles/createPalette";
import { JsxElement } from "typescript";
import { LoadMore_Button } from "./button";
import { postFormData_UpdateState } from "../func/form_action";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function SearchForm_WithView({View, UpdateForm, CustomForm, InputFields, load_API, update_API,
             objectName, loadSize=2, init_searchObj={n:0}}
        :{View:any, UpdateForm?:any, CustomForm?:any, InputFields:React.JSX.Element, load_API:string,
             update_API?:string, objectName:string, loadSize?:number, init_searchObj?:any}) {
    const [stateful_items, setStateful_items] = useState([]);

    const [endLoad, setEndLoad] = useState(false);
    //const [isPend, setIsPend] = useState(false);
    const [open, setOpen] = useState(false);
    const item = useRef<any>({});
    let searchObjectRef = useRef<any>(init_searchObj);

    const handleOpen = (content:any) => {item.current=content; console.log(item.current); setOpen(true); }
    const handleClose = () => setOpen(false);
    //let loadSize = useRef<any>(2);
    // const loadSize = loadSize? loadSize : 2;

    // let searchObject:any;
    useEffect(()=>{
        // loadSize=stateful_item.length || 1;
        // const loadFirstDataPage = async () => await load(true);
        load(true);
        // loadSize = loadFirstDataPage;
        // console.log(loadSize);
        // searchObject.n=1;// do stuff here...
    }, [])

    const load = async (clearCurrent:boolean) => {
        console.log("load")
        console.log(searchObjectRef.current);
        const res = await fetch(load_API +'?'+ new URLSearchParams(searchObjectRef.current).toString(), 
        { method: 'GET', headers: {'Content-Type': 'application/json', 
        // 'Access-Control-Allow-Credentials': 'true', 
        // 'Access-Control-Allow-Origin':'http://localhost:8080'
        }, credentials: "include" });
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
            setStateful_items(itemData);
        else
            setStateful_items(
            stateful_items.concat(itemData)
            );
    }
    
    function search(event:any) {
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

    const modal_style = {
    overflow: 'auto',
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

    return(
        <>
            <h1 className="text-2xl text-center my-2">Tìm kiếm {objectName}</h1>
            <form method="post" id="searchform_withview" onSubmit={search}>
                <div className="my-4 flex flex-row justify-center space-x-8">
                <div className="">
                    {InputFields}
                </div>
                </div>
                <div className="flex justify-center	">
                <button type="submit" className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">Tìm kiếm</button>
                </div>
            </form>
            
            <h1 className="text-2xl text-center my-8">Danh sách {objectName}</h1>
           
            <div className="m-8 flex flex-col self-center w-4/5">
                    {/* <Table stateful_items={stateful_item} endLoad={endLoad} loadMore={() => load(false)} 
                            setStateful_item={setStateful_item}/> */}
            <View stateful_items={stateful_items} openForm={(content:any)=>handleOpen(content)}/>
            <LoadMore_Button endLoad={endLoad} noResult={stateful_items?.length==0} loadmore={() => load(false)}/>
            </div>
            
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={modal_style}>
                    <Typography id="modal-modal-title" className='text-center text-2xl my-4' variant="h6" component="h2">
                        Chi tiết {objectName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component="span">
                        {UpdateForm?
                            <UpdateForm init_value={item.current} button_title='Lưu thay đổi' onSubmit={(e:any) => {
                                postFormData_UpdateState(e,update_API||'',stateful_items,setStateful_items),handleClose()} }/>
                        :   <CustomForm item={item.current}/> }
                    </Typography>
                </Box>
            </Modal>
            
        </>
    )
}

export function SearchPickerForm_WithView({View, onPickItem, searchInputFields, load_API, objectName, loadSize=2, initSearchObj={n:0}}
    :{View:any, onPickItem:any, searchInputFields:React.JSX.Element, load_API:string, objectName:string, loadSize?:number, initSearchObj?:any}) {
    const [stateful_items, setStateful_items] = useState([]);
    const [endLoad, setEndLoad] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>({});
    let searchObjectRef = useRef<any>(initSearchObj);

    useEffect(()=>{
        load(true);
    }, [])

    const load = async (clearCurrent:boolean) => {
        console.log("load")
        console.log(searchObjectRef.current);
        const res = await fetch(load_API +'?'+ new URLSearchParams(searchObjectRef.current).toString(), 
        { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include" });
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
            setStateful_items(itemData);
        else
            setStateful_items(
            stateful_items.concat(itemData)
            );
    }

    function search(event:any) {
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
            <h1 className="text-2xl text-center my-4">Tìm kiếm {objectName}</h1>
            <form method="post" id="searchForm" onSubmit={search}>
                <div className="my-4 flex flex-row justify-center space-x-8">
                <div className="">
                    {searchInputFields}
                </div>
                </div>
                <div className="flex justify-center	">
                <button type="submit" form='searchForm' className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black">Tìm kiếm</button>
                </div>
            </form>
            
            <h1 className="text-2xl text-center my-8">Danh sách {objectName}</h1>
        
            <div className="p-4 flex flex-col items-center w-full">
                    {/* <Table stateful_items={stateful_item} endLoad={endLoad} loadMore={() => load(false)} 
                            setStateful_item={setStateful_item}/> */}
                <View stateful_items={stateful_items} onSelectItem={(i:any)=>setSelectedItem(i)} selectItemId={selectedItem.id}/>
                <LoadMore_Button endLoad={endLoad} noResult={stateful_items?.length==0} loadmore={() => load(false)}/>
            </div>
            {onPickItem?
            <div className="sticky flex bottom-0 bg-sky-600 text-white justify-end items-center translate-y-1">
                <div className="w-5/6 text-right mx-4 text-xl">Đã chọn: {selectedItem.name}</div>
                <button type="button" className="m-4 p-3 w-1/6 rounded bg-sky-500 hover:bg-sky-400 text-white text-xl"
                onClick={()=>onPickItem(selectedItem)}>
                    <span className="inline-flex items-baseline">Xác nhận 
                    <img className="self-center mx-2 h-6 w-auto" src='/icon/next.png'/></span>
                </button>
            </div>:<></>}
        </>
    )
}