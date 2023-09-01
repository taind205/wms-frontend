'use client'

export const postFormData = async (event:any,link:string, list?:Array<any>, HTTP_method?:string) => {
    console.log("Post form & receive msg...")
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let res:any
    if(event.target.getAttribute("enctype")!="multipart/form-data")
    {
      let formJson:any;
      formJson = Object.fromEntries(formData.entries());
      if(list!=undefined && list.length>0)
        formJson.list = list;

      res = await fetch(link, 
      { method: HTTP_method||'POST', body: JSON.stringify(formJson), headers: {'Content-Type': 'application/json'}, 
      credentials: "include" });
    }
    else
    {
      console.log('form with file')
      res = await fetch(link, 
      { method: HTTP_method||'POST', body: formData, credentials: "include"  });
    }
    const d = await res.json();
    console.log(d);
    alert(d.msg);
    location.reload();
  }

export const postFormData_UpdateState = async (event:any,link:string, states:Array<any>, setStates:(value:any)=>void, 
              HTTP_method?:string) => {
    console.log("Post form & receive msg...", link);
    event.preventDefault();
    if(!link) {console.log("link==null, no action doing"); return}
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formData);
    console.log(formJson.new_tags);
    console.log(formJson.deprecated_tags);
    let res:any
    if(event.target.getAttribute("enctype")!="multipart/form-data")
    {
    res = await fetch(link, 
    {method: HTTP_method||'POST', body: JSON.stringify(formJson), headers: {'Content-Type': 'application/json'},
     credentials: "include" });
    }
    else
    {
      console.log('form with file');
      res = await fetch(link, 
    { method: HTTP_method||'POST', body: formData, credentials: "include"  });
    }
    const d = await res.json();
    console.log(d);
    alert(d.msg);

    if(!d.err)
      {
        const newStates = states.map((v,i) => {
          if(v.id==formJson.id)
            {
              if(formJson.role)
                v.Role.name = rolename_list[Number(formJson.role)|0];
              if(formJson.status)
                v.Status.name = statusname_list[Number(formJson.status)|0];
              if(formJson.new_img_upload_obj_url)
                v.new_img_upload_obj_url = formJson.new_img_upload_obj_url;
              return {...v,...formJson};
            }
          else return v;
        })
        
        setStates(newStates);
        console.log(newStates);
      }
  }

const rolename_list = [
  'Không xác định',
  'Admin',
  'Thủ Kho',
  'Nhân viên phòng kinh doanh'
]

const statusname_list = [
  'Không xác định',
  'Khả dụng',
  'Đã khóa'
]