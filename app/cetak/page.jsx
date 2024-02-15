"use client"
import Image from 'next/image' 
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Cetak() {

    const [dapil, setDapil] = useState()
    const [kecamatanId, setKecamatanId] = useState()
    const [kelurahanId, setKelurahanId] = useState()
    const [noTps, setNoTps] = useState()
    
    const [tps, setTps] = useState([])
    const [kecamatan, setKecamatan] = useState([])
    const [kelurahan, setKelurahan] = useState([])
    const [dataCaleg, setDataCaleg] = useState([])

    const [title, setTitle] = useState()
    const [dapilNama, setDapilNama] = useState()
    const [namaKelurahan, setNamaKelurahan] = useState()
    const [kodeTps, setKodeTps] = useState()
    const [tanggal, setTanggal] = useState()
    const [total, setTotal] = useState()

    var dapils = 0
    const handleSelectChange = (e) => {
        dapils = e
        setDapil(e);
        kecamatanCek()
    };

    var kecamatans = 0
    const handleSelectChangekecamatan = (e) => {
        kecamatans = e
        setKecamatanId(e);
        kelurahanCek()
    };
    
    var kelurahans = 0
    const handleSelectChangekelurahan = (e) => {
        kelurahans = e
        setKelurahanId(e);
        tpsCek()
    };
    const handleSelectChangeTps = (e) => {
        setNoTps(e);
    };

    const kecamatanCek = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/kecamatan.php`)
        .then((res) => {
            setKecamatan(res.data.kecamatan)
        })
    }

    const kelurahanCek = async () => {
        console.log(kecamatans);
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataCetak.php?id=${kecamatans}`)
        .then((res) => {
          setKelurahan(res.data.kelurahan)
        })
    }

    const tpsCek = async (id) => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataTps.php?dapil=${dapil}&kelurahan=${kelurahans}`)
        .then((res) => {
            setTps(res.data.tps)
        })
    }

    const btnCekData = async () => {

        await axios.post(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataSuaraCalegTps.php`,{
            "dapil" : dapil,
            "id_kecamatan" : kecamatanId,
            "id_kelurahan" : kelurahanId,
            "no_tps" : noTps
        })
        .then((res) => {
            setDataCaleg(res.data.isi.suara)
            setDapilNama(res.data.isi.nama_dapil)
            setTitle(res.data.isi.title)
            setNamaKelurahan(res.data.isi.nama_kelurahan)
            setKodeTps(res.data.isi.tps)
            setTanggal(res.data.isi.tanggal)
            setTotal(res.data.isi.total)
        })
    }
    
    return (
        <div className="container mx-auto p-5">
            <div className="text-center font-bold">FORM CETAK DATA SUARA</div>
            <div className="grid grid-cols-3 p-5">
                <div className="border p-2 rounded-l-md">
                    <div className="grid mt-3">
                        <label htmlFor="">Pilih Kategori</label>
                        <select onChange={(e) => handleSelectChange(e.target.value)} value={dapil} className='rounded-md mt-3'>
                            <option value="0">- PILIH DATA -</option>
                            <option value="1">RI</option>
                            <option value="2">PROVINSI</option>
                        </select>
                    </div>
                    <div className="grid mt-3">
                        <label htmlFor="">Pilih KEcamatan</label>
                        <select onChange={(e) => handleSelectChangekecamatan(e.target.value)} value={kecamatanId} className='rounded-md mt-3'>
                            <option value="0">- PILIH KECAMATAN -</option>
                            {
                                kecamatan.map((val, i) => (
                                    <option key={i} value={val.value}>{val.label}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="grid mt-3">
                        <label htmlFor="">Pilih Kelurahan</label>
                        <select onChange={(e) => handleSelectChangekelurahan(e.target.value)} value={kelurahanId} className='rounded-md mt-3'>
                            <option value="0">- PILIH KELURAHAN -</option>
                            {
                                kelurahan.map((val, i) => (
                                    <option key={i} value={val.id}>{val.nama_kelurahan}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="grid mt-3">
                        <label htmlFor="">Pilih TPS</label>
                        <select onChange={(e) => handleSelectChangeTps(e.target.value)} value={noTps} className='rounded-md mt-3'>
                            <option value="0">-PILIH TPS-</option>
                            {
                                tps.map((val, i) => (
                                    <option key={i} value={val.no_tps}>{val.no_tps}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button onClick={(_) => btnCekData()} className="w-1/2 bg-yellow-300 hover:bg-yellow-200 p-2 text-white rounded-md">Cek Data</button>
                    </div>
                </div>
                <div className="col-span-2 border p-2 rounded-r-md">
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

                    <div className="flex justify-center mt-5">
                        <a href={`laporan/${dapil}/${kecamatanId}/${kelurahanId}/${noTps}`} target='_blank' className="w-1/2 bg-blue-400 hover:bg-blue-200 p-2 rounded-md text-white">Donwload PDF</a>
                    </div>
                </div>
            </div>
        </div>
    )
}