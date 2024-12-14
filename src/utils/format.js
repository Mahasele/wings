export default function stringFormat(str,size=3) {
	let format;
    let ending;
    if(str.indexOf('.')===-1) {
        format =str;
        ending='';
    }else{
        format = String(str.slice(0,str.indexOf('.')))
        ending=String(str.slice(str.indexOf('.')))
}
    let str2 = String(format).split('');
				
    let result=[];
    let copy;
    let str3 =[];
    let result2 ='';
    let formatedNumber='';
    
    for(let i=str2.length-1;i>=0;i--) {
        str3.push(str[i])
    }
    for(let i=0;i<str3.length;i+=size) {
        copy = str3.slice(i,i+size);
        result.push(copy.join(''));
    }
    result2 = result.join(',');
				
    for(let i=result2.length-1;i>=0;i--) {
        formatedNumber+=result2[i];
    }
    return formatedNumber+ending;
}