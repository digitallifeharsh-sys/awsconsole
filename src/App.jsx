import { useState } from 'react';
import { X } from 'lucide-react';
import Header from './components/Header.jsx';
import Sidebar, { ServiceNavigator } from './components/Sidebar.jsx';
import Home from './components/Home.jsx';
import ServicePage from './components/ServicePage.jsx';
import TwoFactorConfigPage from './components/TwoFactorConfigPage.jsx';
export default function App(){const [activeId,setActiveId]=useState('home');const [mobileOpen,setMobileOpen]=useState(false);const select=id=>{setActiveId(id);setMobileOpen(false)};return <div className="min-h-screen bg-[#f6f8fb]"><Header onMenu={()=>setMobileOpen(true)}/><div className="flex"><Sidebar activeId={activeId} setActiveId={select}/>{activeId!=='home'&&<ServiceNavigator activeId={activeId} setActiveId={select}/ >}{activeId==='home'?<Home onSelect={select}/>:activeId==='sms-otp-api'?<TwoFactorConfigPage/>:<ServicePage serviceId={activeId} onSelect={select}/>}</div>{mobileOpen&&<div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={()=>setMobileOpen(false)}><div className="h-full w-[310px] overflow-y-auto bg-white" onClick={e=>e.stopPropagation()}><div className="flex h-16 items-center justify-between border-b px-4"><b>Service Console</b><button onClick={()=>setMobileOpen(false)} aria-label="Close menu"><X/></button></div><Sidebar activeId={activeId} setActiveId={select} mobile/></div></div>}</div>}
