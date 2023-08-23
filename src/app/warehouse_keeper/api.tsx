// export const getAccount = async (loadnum:string, accountID:string, username:string, role:number | null, status:number|null) => {
//     const q1 = loadnum ? loadnum : 0;
//     const q2 = accountID ? '&accountID='+accountID : '';
//     const q3 = accountID ? '&username='+username : '';
//     const q4 = accountID ? '&role='+role : '';
//     const q5 = accountID ? '&status='+status : '';

//     const res = await fetch('http://localhost:8080/admin/account/load/'+q1+'?'+q2+q3+q4+q5, {
//             headers: {'Content-Type': 'application/json',}, });
//     const data = await res.json();
//     console.log("Fetch complete ! ... "+data);
//     return data
// }

// export const createAccount = async (accountID:any, password:any, role:any, username:any, gender: any, email:any) => {
//     if(!accountID || !password || !role || !username || !gender || !email)
//         return 'invalid input';

//     const reqbody= {
//         "account_info":{
//             "fullName":username,
//             "gender":gender,
//             "email":email,
//             "accountID":accountID,
//             "role":role,
//             "password":password }
//         }

//     const res = await fetch('http://localhost:8080/admin/account/create', {
//                 method: 'POST', body: JSON.stringify(reqbody), headers: {'Content-Type': 'application/json',}, });
                
//     const data = await res.json();
//     console.log("createAccount:");
//     console.log(data);
//     return data
// }