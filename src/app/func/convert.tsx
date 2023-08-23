export function DateDisplay(utcDate:string) {
    return utcDate?  new Date(utcDate).toLocaleString():"-";}

export function DateOnlyDisplay(utcDate:string) {
    return utcDate?  new Date(utcDate).toLocaleDateString():"-";}