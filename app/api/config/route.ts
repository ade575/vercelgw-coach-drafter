export const dynamic='force-dynamic';
export async function GET(){return Response.json({aiConfigured:!!process.env.OPENAI_API_KEY,accessCodeConfigured:!!process.env.COACH_ACCESS_CODE,model:process.env.OPENAI_MODEL||'gpt-6-luna'},{headers:{'Cache-Control':'no-store'}});}
