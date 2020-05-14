function getCookie(key){
    let str = document.cookie;
    let arr = str.split("; ");
    for(let i = 0;i<arr.length;i++){
        if(arr[i].indexOf(key+"=")==0){
            return arr[i].split("=")[1];
        }
    }
    return null
}
function removeCookie(key){
    let d = new Date();
    d.setHours(d.getHours()-1);
    document.cookie = `${key}=byebye;expires=${d.toGMTString()}`
}
export default{
    getCookie,
    removeCookie
}