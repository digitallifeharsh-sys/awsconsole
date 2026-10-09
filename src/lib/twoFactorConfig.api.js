let consoleAdminToken='';
export const setConsoleAdminToken=token=>{consoleAdminToken=String(token||'').trim()};
const API_BASE_URL=(import.meta.env.VITE_API_BASE_URL||'/api/v1').replace(/\/$/,'');
const ROOT='/sms/2factor';
const request=async(path,options={})=>{const response=await fetch(API_BASE_URL+ROOT+path,{credentials:'include',headers:{'Content-Type':'application/json','X-Console-Admin-Key':consoleAdminToken,...(options.headers||{})},...options});const data=await response.json().catch(()=>({}));if(!response.ok||data.success===false)throw new Error(data.message||('Request failed ('+response.status+')'));return data};
export const twoFactorConfigApi={list:()=>request('/config'),create:data=>request('/config',{method:'POST',body:JSON.stringify(data)}),update:(id,data)=>request('/config/'+id,{method:'PUT',body:JSON.stringify(data)}),remove:id=>request('/config/'+id,{method:'DELETE'}),testSms:(id,data)=>request('/config/'+id+'/test-sms',{method:'POST',body:JSON.stringify(data)}),testCall:(id,data)=>request('/config/'+id+'/test-call',{method:'POST',body:JSON.stringify(data)})};
