import type {Answers,Dish,Slot} from './model';
import {value} from './questionnaire';
// Match the main ingredients represented in this prototype's catalogue.
const GROUPS:Record<string,Record<string,string[]>>={
 Pokok:{Nasi:['nasi','beras'],Kentang:['kentang'],'Ubi/singkong':['ubi','singkong'],Roti:['roti'],'Oatmeal':['oat'],Jagung:['jagung'],'Mi/bihun':['mi','bihun']},
 Lauk:{Ayam:['ayam'],Ikan:['ikan'],Telur:['telur'],Tahu:['tahu'],Tempe:['tempe'],'Daging sapi':['sapi'],'Seafood':['udang','kerang','cumi'],'Kacang-kacangan':['kacang']},
 Sayur:{'Sayur daun':['bayam','kangkung','sawi','selada'],Wortel:['wortel'],Kol:['kol'],Buncis:['buncis'],Timun:['timun']},
 Buah:{Pisang:['pisang'],Pepaya:['pepaya'],Jeruk:['jeruk'],Apel:['apel'],'Semangka/melon':['semangka','melon'],'Buah musiman':['pisang','pepaya','jeruk','apel','semangka','melon']},
};
const contains=(ingredient:string,word:string)=>(' '+ingredient.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()+' ').includes(' '+word.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()+' ');
export function accessAllows(d:Dish,a:Answers|undefined,slot?:Slot){if(!a||a.access!=='Ada beberapa keterbatasan')return true;
 const scope=value(a,'availability.scope');if(slot&&scope!=='Semua makan'&&scope!==slot)return true;if(!slot&&scope!=='Semua makan')return true;
 for(const [g,items] of Object.entries(GROUPS)){const prefix='availability.'+g;if(a[prefix+'.status']!=='Pilih bahan'||a[prefix+'.strength']!=='Ya, hanya ini')continue;
 const chosen=Array.isArray(a[prefix+'.foods'])?a[prefix+'.foods'] as string[]:[];
 const allowed=[...chosen.flatMap(v=>items[v]||[]),...value(a,prefix+'.other').toLowerCase().split(',').map(s=>s.trim()).filter(Boolean)];
 const all=Object.values(items).flat();const present=d.ingredients.filter(ingredient=>all.some(word=>contains(ingredient,word)));
 if(present.some(ingredient=>!allowed.some(word=>contains(ingredient,word))))return false;
 }return true;
}
