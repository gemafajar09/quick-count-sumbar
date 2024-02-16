"use client"

import { useEffect, useState } from "react"
import axios from 'axios'
import { Select } from 'antd';

export default function CetakSemua() {
    const [idcaleg, setIdcaleg] = useState("")
    const [idKecamatan, setIdKecamatan] = useState("")
    const [idkelurahan, setIdkelurahan] = useState("")

    const [caleg, setCaleg] = useState([])
    const [kecamatan, setKecamatan] = useState([])
    const [kelurahan, setKelurahan] = useState([])

    
    var idKecamatans

    useEffect(() => {
        getNamaCaleg()
        getKecamatan()
    },[])

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

    const handlerCaleg = (e) => {
        setIdcaleg(e);
    };
    
    const handlerKecamatan = (e) => {
        idKecamatans = e
        setIdKecamatan(e);
        getKelurahan()
    };

    const handlerKelurahan = (e) => {
        setIdkelurahan(e);
    };

    return (
        <div className="container mx-auto p-5">
            <div className="text-center font-bold"> CETAK DATA SUARA</div>
            <div className='mt-10 flex justify-center'>
                <div className="grid border p-5 md:w-1/3 w-full">
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
                            value={idkelurahan}
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.label.toLowerCase().includes(input)}
                            filterSort={(optionA, optionB) => {
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }}
                            onChange={handlerKelurahan}
                            options={kelurahan} />

                    </div>

                    <div className="mt-5 flex justify-end">
                        <a href={`/laporansuara/${idcaleg}/${idKecamatan}/${idkelurahan}`} target="_blank" className="p-2 w-1/3 text-center rounded-md bg-blue-500 hover:bg-blue-300 text-white">Cetak</a>
                    </div>

                </div>
            </div>
        </div>
    )
}