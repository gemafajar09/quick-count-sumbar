"use client"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function Laporansuara() {
    const [dataCaleg, setDataCaleg] = useState([])

    const [title, setTitle] = useState()
    const [kecamatan, setKecamatan] = useState()
    const [kelurahan, setKelurahan] = useState()
    const [totalSuara, setTotalSuara] = useState()
    const [totalTps, setTotalTps] = useState()

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

            setTitle(res.data.title)
            setKecamatan(res.data.nama_kecamatan)
            setKelurahan(res.data.nama_kelurahan)
            setTotalSuara(res.data.total_suara)
            setTotalTps(res.data.total_tps)

            setTimeout(() => {
                console.log("print!");
                window.print()
            }, 2000);
        })
    }
    return (
        <>
            <div className="grid">
                <span className="text-xl font-bold text-center">{title}</span>
                <span className="font-bold mt-3">Kecamatan : {kecamatan}</span>
                <span className="font-bold">Kelurahan : {kelurahan}</span>
            </div>
            <table className="table w-full mt-3 border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600">No</th>
                        <th className='border border-slate-600'>Nama Caleg</th>
                        <th className='border border-slate-600'>No TPS</th>
                        <th className='border border-slate-600'>Suara</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataCaleg.map((d , i) => {
                        return (
                            <tr key={i}>
                                <td className='border border-slate-600 text-left'>{i+1}</td>
                                <td className='border border-slate-600 text-left'>{d.nama_caleg}</td>
                                <td className='border border-slate-600 text-center'>{d.no_tps}</td>
                                <td className='border border-slate-600 text-center'>{d.suara}</td>
                            </tr>
                        )})
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th className='border border-slate-600' colSpan={2}>TOTAL</th>
                        <th className='border border-slate-600'>{totalTps}</th>
                        <th className='border border-slate-600'>{totalSuara}</th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}