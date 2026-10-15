import type { Dish, Slot } from './model';
const rows: [string,string,string,number,number,number,number,number,number,boolean,boolean,string[],string[],Slot[],string][] = [
['oats','Oat pisang & chia','1 mangkuk',320,9,52,9,12000,8,true,true,[],['oat','pisang','chia'],['Sarapan','Camilan'],'🥣'],
['roti-telur','Roti gandum & telur','2 lembar + 1 telur',350,17,39,14,15000,12,true,false,['Gandum','Telur'],['roti gandum','telur','tomat'],['Sarapan'],'🍞'],
['bubur','Bubur ayam sayur','1 mangkuk',390,23,56,8,18000,20,false,false,[],['ayam','beras','wortel','bayam'],['Sarapan','Makan malam'],'🥣'],
['ubi','Ubi kukus & pisang','1 ubi sedang + 1 pisang',310,4,70,2,10000,20,true,true,[],['ubi','pisang'],['Sarapan','Camilan'],'🍠'],
['telur-nasi','Nasi telur & tumis bayam','1 piring',450,19,62,14,16000,15,true,false,['Telur'],['telur','nasi','bayam','bawang'],['Sarapan','Makan siang','Makan malam'],'🍳'],
['nasi-ayam','Nasi ayam panggang & sayur','1 piring',540,35,66,15,28000,25,false,false,[],['nasi','ayam','brokoli','wortel'],['Makan siang','Makan malam'],'🍗'],
['ikan','Nasi ikan kukus & sayur','1 piring',510,32,65,13,30000,25,false,false,['Ikan'],['nasi','ikan nila','sawi','wortel'],['Makan siang','Makan malam'],'🐟'],
['tempe','Nasi tempe panggang & sayur','1 piring',480,23,66,14,18000,20,true,true,['Kedelai'],['nasi','tempe','bayam','wortel'],['Makan siang','Makan malam'],'🥗'],
['tahu','Nasi tahu tumis & buncis','1 piring',430,19,64,12,16000,15,true,true,['Kedelai'],['nasi','tahu','buncis','bawang'],['Makan siang','Makan malam'],'🥗'],
['soto','Soto ayam bening & nasi','1 mangkuk + nasi',470,30,58,12,23000,30,false,false,[],['ayam','nasi','kol','tomat'],['Makan siang','Makan malam'],'🍲'],
['sup','Sup ayam kentang','1 mangkuk besar',410,29,45,13,24000,25,false,false,[],['ayam','kentang','wortel','buncis'],['Makan siang','Makan malam'],'🍲'],
['gado','Gado-gado & lontong','1 piring',490,18,62,20,20000,20,true,true,['Kacang tanah','Kedelai'],['kacang tanah','tahu','lontong','kol','bayam'],['Makan siang','Makan malam'],'🥗'],
['capcay','Capcay tahu & nasi','1 piring',440,18,66,11,20000,15,true,true,['Kedelai'],['tahu','nasi','brokoli','sawi','wortel'],['Makan siang','Makan malam'],'🥦'],
['jagung','Nasi jagung & sayur kacang merah','1 piring',460,16,83,8,18000,25,true,true,[],['jagung','nasi','kacang merah','bayam','wortel'],['Makan siang','Makan malam'],'🌽'],
['kentang','Kentang panggang & kacang merah','1 piring',430,15,74,10,19000,30,true,true,[],['kentang','kacang merah','brokoli','wortel'],['Makan siang','Makan malam'],'🥔'],
['nasi-kacang','Nasi sayur & kacang merah','1 piring',470,17,82,9,17000,20,true,true,[],['nasi','kacang merah','buncis','wortel'],['Makan siang','Makan malam'],'🍚'],
['nasi-ayam-cepat','Nasi ayam suwir & mentimun','1 piring',490,32,65,12,22000,10,false,false,[],['nasi','ayam','mentimun','tomat'],['Makan siang','Makan malam'],'🍚'],
['tahu-cepat','Nasi tahu & sayur siap santap','1 piring',440,20,63,13,18000,10,true,true,['Kedelai'],['nasi','tahu','bayam','wortel'],['Makan siang','Makan malam'],'🥬'],
['kacang-cepat','Nasi kacang merah & sayur siap santap','1 piring',450,16,78,9,18000,10,true,true,[],['nasi','kacang merah','wortel','buncis'],['Makan siang','Makan malam'],'🍚'],
['buah','Pepaya & pisang','1 mangkuk buah',150,2,36,1,8000,5,true,true,[],['pepaya','pisang'],['Sarapan','Camilan'],'🍌'],
['yogurt','Yogurt tawar & buah','1 mangkuk',200,10,30,5,15000,5,true,false,['Susu'],['yogurt','pepaya','pisang'],['Sarapan','Camilan'],'🥛'],
['edamame','Edamame kukus','1 mangkuk kecil',180,17,14,8,10000,10,true,true,['Kedelai'],['edamame'],['Camilan'],'🫛'],
['jagung-snack','Jagung rebus','1 tongkol sedang',160,5,34,2,7000,15,true,true,[],['jagung'],['Sarapan','Camilan'],'🌽'],
['salad-kentang','Salad kentang & kacang merah','1 mangkuk besar',330,12,59,8,16000,15,true,true,[],['kentang','kacang merah','mentimun','tomat'],['Sarapan','Makan siang','Makan malam'],'🥔'],
];
export const CATALOG: Dish[]=rows.map(([id,name,portion,kcal,protein,carbs,fat,cost,prep,vegetarian,vegan,allergens,ingredients,slots,emoji])=>({id,name,portion,kcal,protein,carbs,fat,cost,prep,vegetarian,vegan,halal:true,allergens,ingredients,slots,emoji}));
export const DISHES=Object.fromEntries(CATALOG.map(d=>[d.id,d]));
