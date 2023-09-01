'use client'

import { useEffect, useRef, useState } from "react";

export function Input_Option({label, name, options, form, init_value}:
                {label:string, name:string, options:Array<{value:string | number, name:string}>, form?:string, init_value?:number|string}) {
    return(
        <div style={{minWidth:160, maxWidth:320}} className="my-2 mx-2 flex flex-col justify-start space-y-1">
            <div className="">{label}</div>
            <select className="px-2 py-1.5 rounded bg-slate-300 text-black truncate" name={name} form={form} defaultValue={init_value}>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.name}</option>
                ))}
            </select>
        </div>
    )
}

export function Input_Text({label, placeholder, name, init_value, type}:
            {label:string, placeholder:string, name:string,init_value?:string, type?:string}) {
    //const [value, setValue] = useState('');
    return(
        <div style={{minWidth:160, maxWidth:320}} className="my-2 mx-2 flex flex-col justify-start space-y-1">
            <div className="">{label}</div>
            <input className="px-2 py-1 rounded bg-slate-300 placeholder:text-slate-500 text-black truncate"
                     placeholder={placeholder} name={name} defaultValue={init_value} type={type}
            />
        </div>
    )
}

export function Input_Option_Unit({label, name, init_value, type, option_name, options, option_init_value, form,}:
            {label:string, name:string,init_value?:string, type?:string,
                option_name:string, options:Array<{value:string | number, name:string}>, option_init_value?:string,form?:string,}) {
    //const [value, setValue] = useState('');
    return(
        <div className="my-2 mx-2 flex flex-col justify-start space-y-1">
            <div className="">{label}</div>
            <div className="flex flex-row">
                <input style={{minWidth:40, maxWidth:60}} className="px-2 py-1 rounded bg-slate-300 placeholder:text-slate-500 text-black"
                        name={name} defaultValue={init_value} type={type}
                />
                <select style={{minWidth:120, maxWidth:160}} className="px-2 py-1.5 -translate-x-2 rounded bg-slate-300 text-black truncate" name={option_name}
                            form={form} defaultValue={option_init_value}>
                        {options.map((o) => (
                        <option key={o.value} value={o.value}>{o.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export function Input_Date({label, label2, name, name2, init_value, init_value2}:
            {label:string, label2?:string, name:string, name2?:string, init_value?:string, init_value2?:string}) {
    //const [value, setValue] = useState('');
    return(
        <div style={{minWidth:600}} className="my-2 mx-2 flex flex-row justify-start items-center space-x-2">
            <div className="">{label}</div>
            <input className="px-2 py-1 rounded bg-slate-300 placeholder:text-slate-500 text-black truncate"
                    placeholder="Chọn ngày" name={name} defaultValue={init_value} type={'date'}
            />
            {(label2&&name2)?<>
            <div className="">{label2}</div>
            <input className="px-2 py-1 rounded bg-slate-300 placeholder:text-slate-500 text-black truncate"
                     name={name2} defaultValue={init_value2} type={'date'}
            /></>
            :<></>}
        </div>
    )
}

export function Input_Option_QuickSearch({objectName, placeholder, inputName, init_value, load_API}
                            :{objectName:string, placeholder:string, inputName:string, init_value?:number, load_API:string}) {
    const [select, setSelect] = useState<any>({});
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentOption, setCurrentOption] = useState(0);
    const [Open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    
    useOutsideAlerter(wrapperRef);
    useEffect(() => {
        loadResult('');
      }, []);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
          function handleClickOutside(event: { target: any; }) {
            if (ref.current && !ref.current.contains(event.target)) {
              setOpen(false); setCurrentOption(0);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    const handleKeyboardSelect = (key:string) => {
        if(Open)
            if(key=='ArrowDown')
                setCurrentOption(currentOption+1>options.length ? 0 : currentOption+1);
            else if(key=='ArrowUp')
                setCurrentOption(currentOption-1<0 ? options.length : currentOption-1);
            else if(key=='Enter' && currentOption>0)
                {setSelect(options[currentOption-1]); setInputValue('')}
    }

    const removeSelect = () => {
        setSelect({});
    }

    const loadResult = async (searchKey:string) => {
        console.log("load",searchKey);
        const res = await fetch(load_API +'?name='+ searchKey, 
        { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include"  });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
          }
        else{
            let data = await res.json();
            setInputValue(searchKey);
            setOptions(data);
        }
    }


    return(
        <div style={{minWidth:160, maxWidth:500}} className="my-2 mx-2 flex flex-col justify-start w-full">
            {<input type="hidden" value={select.id} name={inputName}/>}
            <div className="">{objectName}:</div>
            <p className="m-1" style={{maxHeight:300, overflow:'auto'}}>
                {<span className="inline-flex items-baseline rounded bg-slate-600 m-1 p-1">
                    <img src="/icon/user.png" alt="" className="self-center w-4 h-4 mx-1" />
                    <span>{select.fullname}</span>
                    <button type="button" className="self-center w-4 h-4 mx-1 opacity-50 hover:opacity-100" 
                            onClick={()=>removeSelect()}>
                        <img src="/icon/remove.png" alt=""/>
                    </button>
                </span>}
            </p>
            <div ref={wrapperRef} className="m-1 relative">
                <input className="px-2 py-1 rounded bg-slate-300 placeholder:text-slate-500 text-black truncate"
                        placeholder={placeholder}  onClick={()=>setOpen(true)} onKeyDown={(e)=>handleKeyboardSelect(e.key)}
                        onChange={(e)=>{loadResult(e.target.value)}} value={inputValue}/>
                        {/* value={inputValue} onChange={e => setInputValue(e.target.value)} */}
                {Open && ( <div className='absolute top-0 translate-y-8 bg-slate-300 text-black flex flex-col'>
                        {options.length<1? <div className="my-1 mx-4"> Không tìm thấy kết quả </div> : 
                        options.map((v:any,index:number) => (
                            <button type="button" className={'text-left py-1 px-4 w-full hover:bg-sky-300'+ (index+1==currentOption?' bg-sky-300':'')}
                            onClick={()=>{setSelect(v); setInputValue('');} }>
                                {v.fullname}</button>
                    ))}</div>)}
            </div>
        </div>
    )
}

export function Input_ListOption_QuickSearch({objectName, placeholder, inputName, init_value, load_API,
                             loadbyID_API, SelectedItemView, ResultText}
                            :{objectName:string, placeholder:string, inputName:string,init_value?:number,
                             load_API:string, loadbyID_API?:string, SelectedItemView:any, ResultText:any}) {
    const [selects, setSelects] = useState<any[]>([]);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [currentOption, setCurrentOption] = useState(0);
    const [Open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    const newItems = useRef<any[]>([]);
    const deprecatedItems = useRef<any[]>([]);
    useOutsideAlerter(wrapperRef);
    useEffect(() => {
        loadResult('');
        if(init_value) {
            console.log("load by id",init_value);
            fetch(loadbyID_API +'?id='+ init_value, 
            { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include"  }).then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch data') // This will activate the closest `error.js` Error Boundary
            } else res.json().then((v) => {console.log(v); setSelects(v);});
            })
        }
      }, []);

    const categoryName = ['Không xác định', 'Loại hàng hóa', 'Thương Hiệu', 'Đóng gói', 'Thể tích', 'Khối lượng'];

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
          function handleClickOutside(event: { target: any; }) {
            if (ref.current && !ref.current.contains(event.target)) {
              setOpen(false); setCurrentOption(0);
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    const handleKeyboardSelect = (key:string) => {
        if(Open)
            if(key=='ArrowDown')
                setCurrentOption(currentOption+1>options.length ? 0 : currentOption+1);
            else if(key=='ArrowUp')
                setCurrentOption(currentOption-1<0 ? options.length : currentOption-1);
            else if(key=='Enter' && currentOption>0)
                {addSelect(options[currentOption-1]); setInputValue('')}
    }

    const addSelect = (v:any) => {
        if(selects.findIndex((s:any)=>s.id==v.id)==-1)
            {setSelects([...selects,v]); 
                const d_index = deprecatedItems.current.findIndex((dv)=>dv.id==v.id);
                console.log('di',d_index);
                if(d_index==-1) newItems.current.push(v);
                else deprecatedItems.current.splice(d_index,1);
                setOpen(false); setCurrentOption(0);
                console.log(newItems.current);
                console.log(deprecatedItems.current);
        } else alert(objectName+' bị trùng.');
    }

    const removeSelect = (v:any) => {
        setSelects(selects.filter(o => o!==v))
        const n_index = newItems.current.findIndex((nv)=>nv.id==v.id);
        console.log('ni',n_index);
        if(n_index==-1) deprecatedItems.current.push(v);
        else newItems.current.splice(n_index,1);
        console.log(newItems.current);
        console.log(deprecatedItems.current);
    }

    const loadResult = async (searchKey:string) => {
        console.log("load",searchKey);
        const res = await fetch(load_API +'?name='+ searchKey, 
        { method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: "include"  });
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
          }
        else{
            let data = await res.json();
            setInputValue(searchKey);
            setOptions(data);
        }
    }


    return(
        <div style={{minWidth:160, maxWidth:500}} className="my-2 mx-2 flex flex-col justify-start w-full">
            {init_value? <><input type="hidden" value={newItems.current.map(v=>v.id)} name={'new_'+inputName}/>
                            <input type="hidden" value={deprecatedItems.current.map(v=>v.id)} name={'deprecated_'+inputName}/></>
             : <input type="hidden" value={selects.map(v=>v.id)} name={inputName}/>}
            <div className="">{objectName}:</div>
            <p className="m-1" style={{maxHeight:300, overflow:'auto'}}>
                {selects.map((v:any,index) => <SelectedItemView key={v.id} value={v} onRemove={()=>removeSelect(v)}/>)
                // ******************* 'id' attribute is REQUIRED on v **************
                }
                
            </p>
            <div ref={wrapperRef} className="m-1 relative">
                <input className="px-2 py-1 rounded bg-slate-300 placeholder:text-slate-500 text-black truncate"
                        placeholder={placeholder}  onClick={()=>setOpen(true)} onKeyDown={(e)=>handleKeyboardSelect(e.key)}
                        onChange={(e)=>{loadResult(e.target.value)}} value={inputValue}/>
                        {/* value={inputValue} onChange={e => setInputValue(e.target.value)} */}
                {Open && ( <div className='absolute top-0 translate-y-8 bg-slate-300 text-black flex flex-col'>
                        {options.length<1? <div className="my-1 mx-4"> Không tìm thấy kết quả </div> : 
                        options.map((v:any,index:number) => (
                            <button type="button" className={'text-left py-1 px-4 w-full hover:bg-sky-300 whitespace-pre-line'
                                                            + (index+1==currentOption?' bg-sky-300':'')}
                            onClick={()=>{addSelect(v); setInputValue('');} }>
                                <ResultText value={v}/></button>
                    ))}</div>)}
            </div>
        </div>
    )
}

export function Input_OptionPicker_WithView({objectName, inputName, value, displayedItem, openPicker, listItem}
                    :{objectName:string, inputName?:string, value?:string, displayedItem:React.JSX.Element, openPicker:any, listItem?:boolean}) {
    //style={{minWidth:300, maxWidth:600}}
    return(
        <>
        <div className="my-2 mx-2 flex flex-col justify-start max-w-max">
            <div className="mb-1">{objectName}:</div>
            <input type="hidden" value={value} name={inputName}/>
                {displayedItem}
            <div className="bg-slate-900 grid place-items-center">
                
                <button type="button" className="m-4 px-12 py-2 rounded bg-sky-300 hover:bg-sky-400 text-black"
                        onClick={()=>openPicker()} > {(listItem? 'Thêm ':'Chọn ') + objectName} </button>
            </div>
        </div>
        
        </>
    )
}

export function Input_TextArea({label, placeholder,name, init_value}:{label:string, placeholder:string,name:string,init_value?:string}) {
    return(
        <div style={{minWidth:160, maxWidth:600}} className="my-2 mx-2 flex flex-col justify-center space-y-1 w-full">
            <div className="">{label}</div>
            <textarea className="px-2 rounded bg-slate-300 placeholder:text-slate-500 text-black text-clip" 
            rows={5} placeholder={placeholder} name={name} defaultValue={init_value}/>
        </div>
    )
}

export function Input_Image({label, placeholder, name, init_value}:{label:string, placeholder:string, name:string, init_value?:string}) {
    const [file, setFile] = useState(init_value);
    function handleChange(e:any) {
        console.log(e.target.files);
        if(e.target.files[0])
        {
        const fileSize = e.target.files[0].size;
        const type = e.target.files[0].type;
        console.log(type);
        if(fileSize>1000000)//1mb
        {
            alert("Dung lượng file quá lớn.");
            e.target.value=null;
        }
        else if(type!='image/jpeg' && type!='image/png' )
        {
            alert("Kiểu file không hợp lệ.");
            e.target.value=null;
        }
        else
        setFile(URL.createObjectURL(e.target.files[0]));
        }
        else setFile('');
    }
    return(
        <div style={{minWidth:200,maxWidth:400}} className="my-2 mx-2 flex flex-col space-y-2 w-full">
            <div className="">{label}</div>
            <input className="bg-slate-800 self-center max-w-full mx-2" type="file" accept="image/*" onChange={handleChange} name={name}/>
            <input type="hidden" name='new_img_upload_obj_url' value={file}/>
            <input type="hidden" name='useDefaultImage' value={file?'':'true'}/>
            
            <div style={{minHeight:160,maxHeight:320}} className="bg-slate-900 grid place-items-center">
                <img className="max-h-80 w-auto" src={file} alt=""/> 
            </div>
        </div>
    )
}

// module.exports = {Input_Option, Input_Text}

// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { Warehouse_View } from "./image_view";
// import { SearchPickerForm_WithView } from "./searchform_withview";