'use client';
import { createContext,useContext,useEffect,useRef,useState,type ReactNode } from 'react';
import type { Person,Store } from '@/lib/model';
import { profileSchema,historyRowSchema,planContentSchema } from '@/lib/model';
import { seedStore } from '@/lib/seeds';
import { validatePlan } from '@/lib/planner';
const KEY='gw-coach-drafter-v1';
type StoreContext={store:Store|null;error:string;select:(id:string)=>void;updatePerson:(id:string,fn:(p:Person)=>Person)=>void;clearError:()=>void};
const Context=createContext<StoreContext|null>(null);
function parseStore(text:string):Store{const s=JSON.parse(text);if(s.version!==1||!Array.isArray(s.people)||s.people.length!==3)throw Error('Invalid version');const ids=new Set();for(const p of s.people){if(!['alya','bima','citra'].includes(p.id)||ids.has(p.id)||!Number.isInteger(p.profileVersion)||!Array.isArray(p.sentPlans))throw Error('Invalid profile');ids.add(p.id);profileSchema.parse(p.profile);historyRowSchema.array().max(14).parse(p.history);for(const plan of [p.draft,...p.sentPlans].filter(Boolean)){planContentSchema.parse(plan);profileSchema.parse(plan.profileSnapshot);if(!plan.brief||!plan.id)throw Error('Invalid plan');validatePlan(plan,{profile:plan.profileSnapshot,history:plan.historySnapshot,...plan.brief});}}if(!ids.has(s.selectedId))throw Error('Invalid selection');return s;}
export function StoreProvider({children}:{children:ReactNode}){const [store,setStore]=useState<Store|null>(null);const [error,setError]=useState('');const current=useRef<Store|null>(null);
 useEffect(()=>{try{const saved=localStorage.getItem(KEY);const initial=saved?parseStore(saved):seedStore();current.current=initial;setStore(initial);}catch{const initial=seedStore();current.current=initial;setStore(initial);setError('Data browser tidak dapat dibaca. Contoh dimuat; data lama tidak ditimpa sampai Anda menyimpan perubahan.');}const onStorage=(event:StorageEvent)=>{if(event.key!==KEY||!event.newValue)return;try{const next=parseStore(event.newValue);current.current=next;setStore(next);}catch{setError('Perubahan dari tab lain tidak dapat dibaca.');}};window.addEventListener('storage',onStorage);return()=>window.removeEventListener('storage',onStorage);},[]);
 function commit(next:Store){try{localStorage.setItem(KEY,JSON.stringify(next));current.current=next;setStore(next);}catch{setError('Perubahan belum tersimpan. Penyimpanan browser tidak tersedia atau penuh.');throw new Error('Penyimpanan browser tidak tersedia.');}}
 return <Context.Provider value={{store,error,clearError:()=>setError(''),select:(id)=>{if(current.current)commit({...current.current,selectedId:id});},updatePerson:(id,fn)=>{if(current.current)commit({...current.current,people:current.current.people.map(p=>p.id===id?fn(p):p)});}}}>{children}</Context.Provider>;
}
export function useStore(){const c=useContext(Context);if(!c)throw Error('Missing store');return c;}
