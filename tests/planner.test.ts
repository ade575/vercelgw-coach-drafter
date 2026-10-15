import test from 'node:test';
import assert from 'node:assert/strict';
import { seedStore } from '../lib/seeds';
import { examplePlan,validatePlan,eligibleDishes,summarizeHistory,dayTotals,dateAdd } from '../lib/planner';
import { DISHES } from '../lib/catalog';
import type { GenerationInput } from '../lib/model';
function input(index=0):GenerationInput{const p=seedStore().people[index];return {profile:p.profile,history:p.history,instructions:'Makan siang praktis',calorieTarget:null,startDate:'2026-10-16'};}
test('all three sample profiles produce complete, dietary-compatible seven day drafts',()=>{for(let i=0;i<3;i++){const data=input(i);const plan=examplePlan(data);assert.equal(plan.days.length,7);for(const day of plan.days){assert.equal(day.meals.length,data.profile.mealsPerDay);for(const meal of day.meals){const dish=DISHES[meal.dishId];assert(!dish.allergens.some(a=>data.profile.allergies.includes(a)));if(data.profile.diet==='Vegetarian')assert(dish.vegetarian);if(data.profile.foodAccess==='Masak sendiri')assert(dish.prep<=data.profile.prepMinutes);}assert(dayTotals(day.meals).kcal>0);}}});
test('missing history stays unknown and never becomes zero observed intake',()=>{const h=summarizeHistory(input().history.map(r=>({...r,meals:[],calories:null,vegetables:null,boughtLunch:null,sleepHours:null,steps:null})));assert.equal(h.foodDays,0);assert.equal(h.recordedAverageKcal,null);assert.equal(h.averageSleepHours,null);assert.equal(h.averageSteps,null);});
test('unknown allergy prevents generation',()=>{const data=input();data.profile.allergyStatus='unknown';assert.throws(()=>examplePlan(data),/alergi/);});
test('contradictory allergy status is rejected',()=>{const data=input();data.profile.allergyStatus='none';assert.throws(()=>examplePlan(data),/alergi/);});
test('AI output cannot introduce catalog items that conflict with allergies',()=>{const data=input();const p=examplePlan(data);p.days[0].meals[1].dishId='gado';assert.throws(()=>validatePlan(p,data),/batasan/);});
test('duplicate days and slots are rejected',()=>{const data=input();const p=examplePlan(data);p.days[1].day=1;assert.throws(()=>validatePlan(p,data),/tujuh hari/);p.days[1].day=2;p.days[0].meals[1].slot='Sarapan';assert.throws(()=>validatePlan(p,data),/Jadwal/);});
test('disliked ingredients and vegan preference filter the candidate catalog',()=>{const p=input().profile;p.diet='Vegan';p.dislikes='tomat, kacang merah';const options=eligibleDishes(p);assert(options.length>0);for(const d of options){assert(d.vegan);assert(!d.ingredients.some(i=>i.includes('tomat')||i.includes('kacang merah')));}});
test('date arithmetic crosses month boundaries without timezone shifts',()=>{assert.equal(dateAdd('2026-10-31',1),'2026-11-01');});
