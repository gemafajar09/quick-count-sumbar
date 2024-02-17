"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import axios from 'axios'
import { Select } from 'antd';

export default function CetakSemua() {
    const [idcaleg, setIdcaleg] = useState("")
    const [idKecamatan, setIdKecamatan] = useState("")
    const [idkelurahan, setIdkelurahan] = useState("")
    const [noTps, setNoTps] = useState("")

    const [caleg, setCaleg] = useState([])
    const [kecamatan, setKecamatan] = useState([])
    const [kelurahan, setKelurahan] = useState([])
    const [tps, setTps] = useState([])

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

    
    var idKecamatans
    var idKelurahan

    useEffect(() => {
        getNamaCaleg()
        getKecamatan()
    },[])

    const handlerCaleg = (e) => {
        setIdcaleg(e);
    };
    
    const handlerKecamatan = (e) => {
        idKecamatans = e
        setIdKecamatan(e);
        getKelurahan()
    };

    const handlerKelurahan = (e) => {
        idKelurahan = e
        setIdkelurahan(e);
        getTPS()
    };

    const handlerTps = (e) => {
        setNoTps(e);
    };

    const getNamaCaleg = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/caleg.php`).then((res) => {
            setCaleg(res.data.caleg)
        }).catch((err) => {
            console.log(err);
        })
    }

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
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/kelurahan.php?id_kecamatan=${idKecamatans}`)
        .then((res) => {
            setKelurahan(res.data.kelurahan)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const getTPS = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/tps.php?id_kecamatan=${idKecamatan}&id_kelurahan=${idKelurahan}`).then((res) => {
            setTps(res.data.tps)
        }).catch((err) => {
            console.log(err);
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
            <div className="text-center font-bold mt-10"> CETAK DATA SUARA PER TPS</div>
            <div className='mt-10 flex justify-center'>
                <div className="grid border rounded-md shadow-xl p-5 md:w-1/3 w-full">
                    <div className="mt-5">
                        <label htmlFor="Nama Caleg">Entry Nama Caleg</label>
                        <Select
                            showSearch
                            popupMatchSelectWidth={false}
                            listHeight={250}
                            className='w-full mt-3'
                            value={idcaleg}
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.label.toLowerCase().includes(input)}
                            filterSort={(optionA, optionB) => {
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }
                            }
                            onChange={handlerCaleg}
                            options={caleg} />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="Nama Caleg">Entry Kecamatan</label>
                        <Select
                            showSearch
                            popupMatchSelectWidth={false}
                            listHeight={250}
                            className='w-full mt-3'
                            value={idKecamatan}
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
                            value={idKelurahan}
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

                    <div className="mt-5 flex justify-end">
                        <a href={`/laporansuaratps/${idcaleg}/${idKecamatan}/${idkelurahan}/${noTps}`} target="_blank" className="p-2 w-1/3 text-center rounded-md bg-blue-500 hover:bg-blue-300 text-white">Cetak</a>
                    </div>

                </div>
            </div>
        </div>
    )
}