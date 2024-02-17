"use client"
import Image from "next/image"
import { useEffect, useState } from "react";
import axios from 'axios'
import Link from 'next/link'

export default function Detail() {
    const [suara, setSuara] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        jumlahSuara()
    },[suara, total])
    
    const jumlahSuara = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataTotalSuara.php`)
        .then((res) => {
            setTotal(res.data.suara.total)
            setSuara(res.data.suara.suara)
        })
    }
    return (
        <div className="pl-5 pb-5 pr-5 pt-3">
            <div className="flex justify-between">
                <div className="flex font-bold gap-3 items-end">
                <Image 
                    width={60} 
                    height={60} 
                    src={"/golkar.png"} 
                    alt="image" />
                    <div className="grid">
                    <div className=' text-sm'>
                    DPD GOLKAR
                    </div>
                    <div className=' text-xl'>
                        Kota Padang
                    </div>
                    </div>
                </div>
                <div className="hidden md:flex text-xl justify-center mb-3 font-bold gap-3 items-end">
                <Image width={180} height={180} src={"/mediatama.png"} alt="image" />
                <Image width={120} height={120} src={"/digital.png"} alt="image" />
                <Image width={150} height={150} src={"/training.png"} alt="image" />
                </div>
                <div className="md:flex grid md:justify-center items-center">
                <span className='md:block hidden'>Total Suara Masuk :</span> 
                <div className="text-white text-xl bg-blue-500 p-3 w-36 text-center md:rounded-l-xl">{suara}</div>
                <div className="text-white text-xl bg-red-500 p-3 w-36 text-center md:rounded-r-xl">{total}</div>
                </div>
            </div>
            <div className="border-b-2 mt-3 border-gray-500"></div>

            <div className="mt-10 mb-10 w-full text-center font-bold">
                MENU CETAK DATA SUARA
            </div>

            <div className="grid grid-cols-6 gap-3 mt-10 justify-items-stretch">
                <Link href={"/cetaksuara"} className="bg-blue-400 hover:bg-blue-300 border shadow-md rounded-md">
                    <div className="grid content-center h-24">
                        <span className="text-center text-white font-bold">
                            Cetak Semua Data TPS
                        </span>
                    </div>
                </Link>
                <Link href={"/cetaksuaratps"} className="bg-blue-400 hover:bg-blue-300 border shadow-md rounded-md">
                    <div className="grid content-center h-24">
                        <span className="text-center text-white font-bold">
                            Cetak Per Data TPS
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}