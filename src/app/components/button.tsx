import Button from "@mui/material/Button";

export function LoadMore_Button({endLoad, noResult, loadmore}:{endLoad:boolean, noResult:boolean, loadmore:any}){
    
    return(
        <>
        {endLoad ? <div className='m-2 text-center text-sky-400'>
                { noResult ? "Không tìm thấy kết quả" : "Đã tải toàn bộ kết quả"} </div>
                : <Button className='m-2 bg-sky-300 hover:bg-sky-400 text-black' onClick={loadmore}> Xem thêm... </Button>}
        </>
    )
    
}