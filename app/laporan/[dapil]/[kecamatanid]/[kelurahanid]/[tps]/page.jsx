"use client"
import Image from 'next/image' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

export default function Laporan() {
    const [dataCaleg, setDataCaleg] = useState([])

    const [title, setTitle] = useState()
    const [dapilNama, setDapilNama] = useState()
    const [namaKelurahan, setNamaKelurahan] = useState()
    const [kodeTps, setKodeTps] = useState()
    const [tanggal, setTanggal] = useState()
    const [total, setTotal] = useState()

    const params = useParams();
    console.log(params.tps);
    useEffect(() => {
        btnCekData()
    },[])

    const btnCekData = async () => {

        await axios.post(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataSuaraCalegTps.php`,{
            "dapil" : params.dapil,
            "id_kecamatan" : params.kecamatanid,
            "id_kelurahan" : params.kelurahanid,
            "no_tps" : params.tps
        })
        .then((res) => {
            setDataCaleg(res.data.isi.suara)
            setDapilNama(res.data.isi.nama_dapil)
            setTitle(res.data.isi.title)
            setNamaKelurahan(res.data.isi.nama_kelurahan)
            setKodeTps(res.data.isi.tps)
            setTanggal(res.data.isi.tanggal)
            setTotal(res.data.isi.total)

            setTimeout(() => {
                console.log("print!");
                window.print()
            }, 2000);
        })
    }

    return (
        <div>
            <div className='flex justify-center'>
                <Image src={"/golkar.png"} width={100} height={100} alt="golkar"/>
            </div>
            <div className="grid mt-3">
                <span className='text-center'>{title ?? "......"}</span>
                <span className='text-center'>{ dapilNama ?? "......"}</span>
                <span className='text-center'>{ namaKelurahan ?? "........"}</span>
            </div>
            <table className="table w-full mt-3 border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className='border border-slate-600'>NO</th>
                        <th className='border border-slate-600'>NAMA CALEG</th>
                        <th className='border border-slate-600'>HASIL SUARA</th>
                        <th className='border border-slate-600'>JUMLAH</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataCaleg.map((d , i) => {
                        return (
                            <tr key={i}>
                                <td className='border border-slate-600 text-center'>{i+1}</td>
                                <td className='border border-slate-600'>{d.nama_caleg}</td>
                                <td className='border border-slate-600'></td>
                                <td className='border border-slate-600 text-center'>{d.suara}</td>
                            </tr>
                        )})
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td className='border border-slate-600 text-center' colSpan={3}>TOTAL SUARA</td>
                        <td className='border border-slate-600 text-center'>{total}</td>
                    </tr>
                </tfoot>
            </table>

            <div className="flex justify-center mt-4">
                <div className="grid w-full">
                    <span className='text-center'>Mengetahui,</span>
                    <span className='text-center'>KPPS TPS { kodeTps ?? "......"}</span>
                    <span className='mt-16 text-center'>..................................</span>
                </div>
                <div className="grid w-full">
                    <span className='text-center'>Padang, { tanggal ?? "00-00-0000"}</span>
                    <span className='text-center'>Saksi TPS { kodeTps ?? "......"}</span>
                    <span className='mt-16 text-center'>..................................</span>
                </div>
            </div>
        </div>
    )
}