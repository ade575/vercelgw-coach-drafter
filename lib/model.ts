import { z } from 'zod';
export const SLOT_NAMES = ['Sarapan', 'Makan siang', 'Makan malam', 'Camilan'] as const;
export type Slot = typeof SLOT_NAMES[number];
export const ALLERGENS = ['Kacang tanah','Susu','Telur','Ikan','Kerang','Gandum','Kedelai'];
export const profileSchema = z.object({
  goal: z.string().min(1).max(200), allergyStatus: z.enum(['none','listed','unknown']), allergies: z.array(z.string().max(80)).max(15),
  diet: z.enum(['Seimbang','Vegetarian','Vegan']), halal: z.boolean(), dislikes: z.string().max(500),
  budget: z.number().int().min(20000).max(500000), foodAccess: z.enum(['Campuran','Masak sendiri','Beli makanan']),
  prepMinutes: z.number().int().min(5).max(120), mealsPerDay: z.union([z.literal(3),z.literal(4)]),
  breakfast: z.string().regex(/^\d{2}:\d{2}$/), lunch: z.string().regex(/^\d{2}:\d{2}$/), dinner: z.string().regex(/^\d{2}:\d{2}$/),
  constraints: z.string().max(1000), height: z.number().min(0).max(250), weight: z.number().min(0).max(400),
});
export type Preferences = z.infer<typeof profileSchema>;
export const historyRowSchema = z.object({date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),meals:z.array(z.string().min(1).max(150)).max(8),calories:z.number().min(0).max(10000).nullable(),vegetables:z.boolean().nullable(),boughtLunch:z.boolean().nullable(),sleepHours:z.number().min(0).max(24).nullable(),steps:z.number().min(0).max(100000).nullable()});
export type HistoryRow = z.infer<typeof historyRowSchema>;
export type Dish = {id:string;name:string;portion:string;kcal:number;protein:number;carbs:number;fat:number;cost:number;prep:number;vegetarian:boolean;vegan:boolean;halal:boolean;allergens:string[];ingredients:string[];slots:Slot[];emoji:string};
export const planContentSchema = z.object({
  title:z.string().min(1).max(150), summary:z.string().min(1).max(1000),
  insights:z.array(z.object({source:z.enum(['preferensi','riwayat','pelatih']),observation:z.string().max(350),adaptation:z.string().max(350)})).min(1).max(5),
  assumptions:z.array(z.string().max(350)).max(6),
  days:z.array(z.object({day:z.number().int().min(1).max(7),meals:z.array(z.object({slot:z.enum(SLOT_NAMES),dishId:z.string().max(80),servings:z.number().min(0.5).max(2),note:z.string().max(250)})).min(3).max(4)})).length(7),
});
export type PlanContent = z.infer<typeof planContentSchema>;
export type Plan = PlanContent & {id:string;createdAt:string;sentAt?:string;mode:'example'|'ai';profileVersion:number;profileSnapshot:Preferences;historySnapshot:HistoryRow[];brief:{instructions:string;calorieTarget:number|null;startDate:string};usage?:{inputTokens:number;outputTokens:number;reasoningTokens:number;model:string};reviewed:boolean};
export type Person = {id:string;name:string;initials:string;color:string;subtitle:string;age:number;profile:Preferences;profileVersion:number;updatedAt:string;history:HistoryRow[];historySource:'sample'|'import';draft:Plan|null;sentPlans:Plan[]};
export type Store = {version:1;selectedId:string;people:Person[]};
export const generationSchema=z.object({profile:profileSchema,history:z.array(historyRowSchema).max(14),instructions:z.string().max(2000),calorieTarget:z.number().int().min(1000).max(4000).nullable(),startDate:z.string().regex(/^\d{4}-\d{2}-\d{2}$/)});
export type GenerationInput=z.infer<typeof generationSchema>;
