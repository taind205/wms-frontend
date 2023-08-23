'use client'

export async function getCookies(name:string) {
    console.log("get info...")
    let res:any;
    res = await fetch('/server/cookies?name='+name, 
    { headers: {'Content-Type': 'application/json'} });
    
    const d = await res.json();
    console.log('getcookies from cliet',d);
    return(d);
}