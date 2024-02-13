"use client"

import { Space, Table } from 'antd';
import axios from 'axios'
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from '../admin/login'
import { useEffect, useState } from 'react';

import Swal from 'sweetalert2'
import { Select } from 'antd';
import { faSignOut, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Admin() {
    // untuk inputan
    const [idcaleg, setIdcaleg] = useState("")
    const [idKecamatan, setIdkecamatan] = useState("")
    const [idkelurahan, setIdkelurahan] = useState("")
    const [notps, setNotps] = useState("")
    const [suara, setSuara] = useState("")

    // unutk data user yg login
    const [idUser, setIdUser] = useState()
    var id

    const [caleg, setCaleg] = useState([])
    const [kelurahan, setKelurahan] = useState([])
    const [kecamatan, setKecamatan] = useState([])
    const [data, setData] = useState([])

    const [errors, setErrors] = useState({});

    useEffect(() => {
        id = localStorage.getItem("id_user")
        setIdUser(localStorage.getItem("id_user"))

        getNamaCaleg()
        getKecamatan()
        getDataInputan(id)

        if (!localStorage.getItem("id_user")) {
            navigate(false)
        }

    }, [])

    useEffect(() => {

        window.socket = io("https://web-socket-server.fly.dev", {
            auth: {
                appId: "RECORD_DATA_SUARA",
            },
        });

        socket.on("connect", () => {
            console.log("Connected to the socket.io server");
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    const getNamaCaleg = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/caleg.php`).then((res) => {
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

    const getKelurahan = async (idKecamatans) => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/kelurahan.php?id_kecamatan=${idKecamatans}`)
            .then((res) => {
                setKelurahan(res.data.kelurahan)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getDataInputan = async (idd) => {
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/getDataInputan.php?id=${idd}`)
            .then((res) => {
                setData(res.data.suara)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const validateForm = () => {
        let errors = {};

        if (!idcaleg) {
            errors.idcaleg = '* Wajib Di Isi.';
        }

        if (!idkelurahan) {
            errors.idkelurahan = '* Wajib Di Isi.';
        }

        if (!idKecamatan) {
            errors.idKecamatan = '* Wajib Di Isi.';
        }

        if (!notps) {
            errors.notps = '* Wajib Di Isi.';
        }

        if (!suara) {
            errors.suara = '* Wajib Di Isi.';
        }
        setErrors(errors);
        return (Object.keys(errors).length === 0);
    };

    const simpadnDataInputan = (e) => {
        // e.preventDefault()

        const isValid = validateForm()
        if (!isValid) return

        axios.post(`${process.env.NEXT_PUBLIC_URL}/simpanDataInputan.php`, {
            "id_caleg": idcaleg,
            "id_kelurahan": idkelurahan,
            "id_kecamatan": idKecamatan,
            "no_tps": notps,
            "suara": suara,
            "id_user": idUser
        })
            .then((res) => {
                if (res.data.pesan == 'success') {
                    clearInputan()
                    var idd = localStorage.getItem("id_user")
                    getDataInputan(idd)
                    // console.log(window.socket);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Berhasil Tersimpan!",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    socket.emit("event", {
                        name: "KIRIM_DATA",
                        payload: true,
                    });

                } else if(res.data.pesan = 'error'){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Data Error!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: res.data.pesan,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const clearInputan = () => {
        setIdcaleg("")
        setIdkelurahan("")
        setIdkecamatan("")
        setNotps("")
        setSuara("")
    }

    const handleSelectChange = (selectedOption) => {
        setIdcaleg(selectedOption);
    };

    const handleSelectChangekelurahan = (selectedOption) => {
        setIdkelurahan(selectedOption);
    };

    const handleSelectChangekecamatan = (selectedOption) => {
        setIdkecamatan(selectedOption);
        getKelurahan(selectedOption)
    };

    const handlerHapusSuara = (record) => {
        Swal.fire({
            title: "Anda Yakin?",
            text: "Apakah Sudah Yakin Ingin Menghapus Data!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Hapus!"
          }).then((result) => {
            if (result.isConfirmed) {
                axios.get(`${process.env.NEXT_PUBLIC_URL}/hapusDataSuara.php?id=${record.id}`)
                .then((res) => {
                    if(res.data.pesan){
                        var idd = localStorage.getItem("id_user")
                        getDataInputan(idd)
                        socket.emit("event", {
                            name: "KIRIM_DATA",
                            payload: true,
                        });
        
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Berhasil Terhapus!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "Gagal Terhapus!",
                            title: res.data.pesan,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            }
        });
        
    }

    const columns = [
        {
            title: 'Nama Caleg',
            dataIndex: 'nama_caleg',
            key: 'nama_caleg'
        },
        {
            title: 'Kecamatan',
            dataIndex: 'kecamatan',
            key: 'kecamatan'
        },
        {
            title: 'Kelurahan',
            dataIndex: 'kelurahan',
            key: 'kelurahan'
        },
        {
            title: 'No TPS',
            dataIndex: 'no_tps',
            key: 'no_tps',
        },
        {
            title: 'Suara',
            dataIndex: 'suara',
            key: 'suara',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button type='button' onClick={() => handlerHapusSuara(record)} className='bg-red-500 hover:bg-red-400 w-8 text-white text-sm p-2 rounded-md'><FontAwesomeIcon icon={faTrash}/></button>
                </Space>
            ),
        },
    ];

    const logOut = () => {
        Swal.fire({
            title: "LogOut?",
            text: "Apakah Sudah Yakin Ingin Keluar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya Keluar!",
            cancelButtonText: "Tidak"
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                navigate(false)
            }
        });
        
    }

    return (
        <>
            <div className="absolute top-3 right-3">
                <button onClick={() => logOut()} type="button" className='rounded-full bg-gray-400 text-white w-10 h-10 hover:bg-gray-200'><FontAwesomeIcon icon={faSignOut}/></button>
            </div>
            <div className="container mx-auto md:mt-11 mt-3">
                <div className="grid md:grid-cols-3 grid-cols-1 md:h-[700px]">
                    <div className="p-5 border rounded-l-xl pt-5 pb-5 ">
                        <span className='text-xl font-bold'>Entry Data</span>
                        <hr />
                        <div className="mt-5">
                            <label htmlFor="Nama Caleg">Entry Nama Caleg <span className='text-red-500 text-sm'>{errors.idcaleg}</span></label>
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
                                onChange={handleSelectChange}
                                options={caleg} />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="Kelurahan">Entry Kecamatan <span className='text-red-500 text-sm'>{errors.idkecamatan}</span></label>

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
                                }}
                                onChange={handleSelectChangekecamatan}
                                options={kecamatan} />

                        </div>
                        <div className="mt-5">
                            <label htmlFor="Kelurahan">Entry Kelurahan <span className='text-red-500 text-sm'>{errors.idkelurahan}</span></label>

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
                                onChange={handleSelectChangekelurahan}
                                options={kelurahan} />

                        </div>

                        <div className="mt-5">
                            <label htmlFor="TPS">Entry Tps <span className='text-red-500 text-sm'>{errors.notps}</span></label>
                            <input value={notps} onChange={(e) => setNotps(e.target.value)} type="number" className="text-xs w-full p-2 rounded-md mt-2 border-1 border-gray-300 outline-1" />
                        </div>

                        <div className="mt-5">
                            <label htmlFor="Suara">Entry Suara <span className='text-red-500 text-sm'>{errors.suara}</span></label>
                            <input value={suara} onChange={(e) => setSuara(e.target.value)} type="number" className="text-xs w-full p-2 rounded-md mt-2 border-1 border-gray-300 outline-1" />
                        </div>
                        <div className="mt-5 flex justify-end">
                            <button onClick={(e) => simpadnDataInputan(e)} type="button" className='p-2 w-1/2 bg-blue-600 hover:bg-blue-400 text-white rounded-md'>Kirim</button>
                        </div>
                    </div>
                    <div className="col-span-2 border rounded-r-xl p-3">
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
            {/* footer */}
        </>
    )
}