"use client"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function Laporansuara() {
    const [dataCaleg, setDataCaleg] = useState([])

    const params = useParams();
    useEffect(() => {
        btnCekData()
    },[])

    const btnCekData = async () => {

        await axios.post(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataLaporanCaleg.php`,{
            "id_caleg" : params.idcaleg,
            "id_kelurahan" : params.idkelurahan,
            "id_kecamatan" : params.idkecamatan
        })
        .then((res) => {
            setDataCaleg(res.data.suara)

            setTimeout(() => {
                console.log("print!");
                window.print()
            }, 2000);
        })
    }
    return (
        <>
            <table className="table w-full mt-3 border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className='border border-slate-600'>Kelurahan</th>
                        <th className='border border-slate-600'>No TPS</th>
                        <th className='border border-slate-600'>Nama Caleg</th>
                        <th className='border border-slate-600'>Suara</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataCaleg.map((d , i) => {
                        return (
                            <tr key={i}>
                                <td className='border border-slate-600'>{d.kelurahan}</td>
                                <td className='border border-slate-600 text-center'>{d.no_tps}</td>
                                <td className='border border-slate-600 text-center'>{d.nama_caleg}</td>
                                <td className='border border-slate-600 text-center'>{d.suara}</td>
                            </tr>
                        )})
                    }
                </tbody>
            </table>
        </>
    )
}