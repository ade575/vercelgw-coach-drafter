import type { Metadata } from 'next';
import { StoreProvider } from '@/components/store';
import './globals.css';
export const metadata:Metadata={title:'GorryWell — Ruang Rencana',description:'Prototipe preferensi pengguna dan penyusunan rencana makan oleh pelatih.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="id"><body><StoreProvider>{children}</StoreProvider></body></html>;}
