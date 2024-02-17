"use client"
import Image from 'next/image' 
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Select } from 'antd';

export default function Cetak() {

    const [kecamatanId, setKecamatanId] = useState()
    const [kelurahanId, setKelurahanId] = useState()
    const [noTps, setNoTps] = useState()
    const [pilihan, setPilihan] = useState()
    
    const [tps, setTps] = useState([])
    const [kelurahan, setKelurahan] = useState([])
    const [kecamatan, setKecamatan] = useState([])
    const [dataCaleg, setDataCaleg] = useState([])

    const [dpr, setDpr] = useState()
    const [namaKecamatan, setNamaKecamatan] = useState()
    const [kodeTps, setKodeTps] = useState()
    const [tanggal, setTanggal] = useState()
    const [total, setTotal] = useState()
    const [namaKelurahan, setNamaKelurahan] = useState()

    var idKecamatan
    var idKelurahan

    const handlerPilihan = (e) => {
        setPilihan(e);
        getKecamatan()
    };
    
    const handlerKecamatan = (e) => {
        idKecamatan = e
        setKecamatanId(e);
        getKelurahan()
    };

    const handlerKelurahan = (e) => {
        idKelurahan = e
        setKelurahanId(e);
        getTPS()
    };

    const handlerTps = (e) => {
        setNoTps(e);
    };

    const getKecamatan = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/kecamatan.php`)
        .then((res) => {
            setKecamatan(res.data.kecamatan)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getKelurahan = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/kelurahan.php?id_kecamatan=${idKecamatan}`)
        .then((res) => {
            setKelurahan(res.data.kelurahan)
        })
        .catch((err) => {
            console.log(err);
        })
    }    

    const getTPS = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/tps.php?id_kecamatan=${kecamatanId}&id_kelurahan=${idKelurahan}`).then((res) => {
            setTps(res.data.tps)
        }).catch((err) => {
            console.log(err);
        })
    }

    const btnCekData = async () => {

        await axios.post(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataLaporanRiDanProvinsi.php`,{
            "pilihan" : pilihan,
            "id_kelurahan" : kelurahanId,
            "id_kecamatan" : kecamatanId,
            "no_tps" : noTps
        })
        .then((res) => {
            setDataCaleg(res.data.isi.suara)
            setNamaKelurahan(res.data.isi.nama_kelurahan)
            setNamaKecamatan(res.data.isi.nama_kecamatan)
            setKodeTps(res.data.isi.tps)
            setTanggal(res.data.isi.tanggal)
            setTotal(res.data.isi.total)
            setDpr(res.data.isi.title)
        })
    }

    const [suara, setSuara] = useState(0)
    const [totals, setTotals] = useState(0)

    const jumlahSuara = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataTotalSuara.php`)
        .then((res) => {
          setTotals(res.data.suara.total)
          setSuara(res.data.suara.suara)
        })
    }

    useEffect(() => {
        jumlahSuara()
    },[suara, totals])
    
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
                <div className="md:flex grid justify-center items-center">
                <span className='md:block hidden'>Total Suara Masuk :</span> 
                <div className="text-white text-xl bg-blue-500 p-3 w-36 text-center md:rounded-l-xl rounded-t-xl">{suara}</div>
                <div className="text-white text-xl bg-red-500 p-3 w-36 text-center md:rounded-r-xl rounded-b-xl">{totals}</div>
                </div>
            </div>
            <div className="border-b-2 mt-3 border-gray-500"></div>
            
            <div className="text-center font-bold mt-10">FORM CETAK DATA SUARA</div>
            <div className="grid md:grid-cols-3 p-5">
                <div className="border p-2 rounded-l-md">
                    <div className="grid mt-5">
                        <label htmlFor="">Pilihan</label>
                        <select onChange={(e) => handlerPilihan(e.target.value)} value={pilihan} className='rounded-md mt-3 p-1'>
                            <option value="0">- PILIHAN -</option>
                            <option value="ri">DPR RI</option>
                            <option value="prov">DPRD PROVINSI</option>
                        </select>
                    </div>
                    <div className="mt-5">
                        <label htmlFor="Nama Caleg">Entry Kecamatan</label>
                        <Select
                            showSearch
                            popupMatchSelectWidth={false}
                            listHeight={250}
                            className='w-full mt-3'
                            value={kecamatanId}
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.label.toLowerCase().includes(input)}
                            filterSort={(optionA, optionB) => {
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }
                            }
                            onChange={handlerKecamatan}
                            options={kecamatan} />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="Kelurahan">Entry Kelurahan</label>

                        <Select
                            showSearch
                            popupMatchSelectWidth={false}
                            listHeight={250}
                            className='w-full mt-3'
                            value={kelurahanId}
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.label.toLowerCase().includes(input)}
                            filterSort={(optionA, optionB) => {
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }}
                            onChange={handlerKelurahan}
                            options={kelurahan} />

                    </div>
                    <div className="mt-5">
                        <label htmlFor="Kelurahan">Entry TPS</label>

                        <Select
                            showSearch
                            popupMatchSelectWidth={false}
                            listHeight={250}
                            className='w-full mt-3'
                            value={noTps}
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.label.toLowerCase().includes(input)}
                            filterSort={(optionA, optionB) => {
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }}
                            onChange={handlerTps}
                            options={tps} />

                    </div>
                    <div className="flex justify-end mt-5">
                        <button onClick={(_) => btnCekData()} className="w-1/2 bg-yellow-300 hover:bg-yellow-200 p-2 text-white rounded-md">Cek Data</button>
                    </div>
                </div>
                <div className="md:col-span-2 border p-2 rounded-r-md">
                    <div className='flex justify-center'>
                        <Image src={"/golkar.png"} width={100} height={100} alt="golkar"/>
                    </div>
                    <div className="grid mt-3">
                        <span className='text-center'>PEROLEHAN SUARA {dpr} KOTA PADANG</span>
                        <span className='text-center'>{ namaKecamatan ?? "......"}</span>
                        <span className='text-center'>{ namaKelurahan ?? "......."}</span>
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
                        <a href={`laporan/${pilihan}/${kecamatanId}/${kelurahanId}/${noTps}`} target='_blank' className="w-1/2 bg-blue-400 hover:bg-blue-200 p-2 rounded-md text-white">Donwload PDF</a>
                    </div>
                </div>
            </div>
        </div>
    )
}