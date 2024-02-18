"use client"
import Image from 'next/image'
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from 'axios'
import Chart from 'chart.js/auto';
import { Carousel } from 'antd';

import io from 'socket.io-client';

var socket
export default function Home() {
  const [suara, setSuara] = useState(0)
  const [total, setTotal] = useState(0)

  const [suaraKecamatan, setSuaraKecamatan] = useState([])
  const [caleg, setCaleg] = useState([])
  const [suaraCaleg, setSuaraCaleg] = useState([])
  const [golkar, setGolkar] = useState([])
  const [suaraGolkar, setSuaraGolkar] = useState([])
  const [provinsi, setProvinsi] = useState([])
  const [suaraProvinsi, setSuaraProvinsi] = useState([])

  const [kecamatanCaleg1, setKecamatanCaleg1] = useState([])
  const [kecamatanCaleg2, setKecamatanCaleg2] = useState([])
  const [kecamatanCaleg3, setKecamatanCaleg3] = useState([])
  const [kecamatanCaleg4, setKecamatanCaleg4] = useState([])
  const [kecamatanCaleg5, setKecamatanCaleg5] = useState([])
  const [kecamatanCaleg6, setKecamatanCaleg6] = useState([])
  const [kecamatanCaleg7, setKecamatanCaleg7] = useState([])
  const [kecamatanCaleg8, setKecamatanCaleg8] = useState([])
  const [kecamatanCaleg9, setKecamatanCaleg9] = useState([])
  const [kecamatanCaleg10, setKecamatanCaleg10] = useState([])
  const [kecamatanCaleg11, setKecamatanCaleg11] = useState([])

  const [totalSuara, setTotalSuara] = useState()
  const [jumlahTps, setJumlahTps] = useState()
  const [totalTps, setTotalTps] = useState()

  const [golkarRi1, setGolkarRi1] = useState()
  const [golkarRi2, setGolkarRi2] = useState()
  const [golkarRi3, setGolkarRi3] = useState()
  const [golkarRi4, setGolkarRi4] = useState()
  const [golkarRi5, setGolkarRi5] = useState()
  const [golkarRi6, setGolkarRi6] = useState()
  const [golkarRi7, setGolkarRi7] = useState()
  const [golkarRi8, setGolkarRi8] = useState()
  const [golkarRi9, setGolkarRi9] = useState()
  const [golkarRi10, setGolkarRi10] = useState()
  const [golkarRi11, setGolkarRi11] = useState()

  const [golkarProv1, setGolkarProv1] = useState()
  const [golkarProv2, setGolkarProv2] = useState()
  const [golkarProv3, setGolkarProv3] = useState()
  const [golkarProv4, setGolkarProv4] = useState()
  const [golkarProv5, setGolkarProv5] = useState()
  const [golkarProv6, setGolkarProv6] = useState()
  const [golkarProv7, setGolkarProv7] = useState()
  const [golkarProv8, setGolkarProv8] = useState()
  const [golkarProv9, setGolkarProv9] = useState()
  const [golkarProv10, setGolkarProv10] = useState()
  const [golkarProv11, setGolkarProv11] = useState()
  
  const [tps, setTps] = useState([])

  useEffect(() => {
    jumlahSuara()
    jumlahSuaraKecamatan()
  },[suara, total])


  useEffect(() => {
    socket = io("https://web-socket-server.fly.dev", {
        auth: {
            appId: "RECORD_DATA_SUARA",
        },
    });

    socket.on("connect", () => {
        console.log("Connected to the socket.io server");
    });

    socket.on("event", function (e) {
        jumlahSuara()
        jumlahSuaraKecamatan()
    });

    return () => {
        socket.disconnect();
      }
  },[]);

  const jumlahSuara = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataTotalSuara.php`)
    .then((res) => {
      setTotal(res.data.suara.total)
      setSuara(res.data.suara.suara)
      //  suara per kecamatan
      setSuaraKecamatan(res.data.suarakecamatan)
      setCaleg(res.data.caleg)
      setSuaraCaleg(res.data.suaracaleg)
      setGolkar(res.data.golkar)
      setSuaraGolkar(res.data.suaraGolkar)
      setProvinsi(res.data.provinsi)
      setSuaraProvinsi(res.data.suaraprov)
      // suara tps
      setTps(res.data.totaltps)
      // total suara
      setTotalTps(res.data.total_tps)
      setTotalSuara(res.data.total_suara)
      setJumlahTps(res.data.jumlah_tps)
    })
  }

  const jumlahSuaraKecamatan = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataSuaraCalegKecamatan.php`)
    .then((res) => {
      setKecamatanCaleg1(res.data.kecamatancaleg1)
      setKecamatanCaleg2(res.data.kecamatancaleg2)
      setKecamatanCaleg3(res.data.kecamatancaleg3)
      setKecamatanCaleg4(res.data.kecamatancaleg4)
      setKecamatanCaleg5(res.data.kecamatancaleg5)
      setKecamatanCaleg6(res.data.kecamatancaleg6)
      setKecamatanCaleg7(res.data.kecamatancaleg7)
      setKecamatanCaleg8(res.data.kecamatancaleg8)
      setKecamatanCaleg9(res.data.kecamatancaleg9)
      setKecamatanCaleg10(res.data.kecamatancaleg10)
      setKecamatanCaleg11(res.data.kecamatancaleg11)

      setGolkarRi1(res.data.golkarri1)
      setGolkarRi2(res.data.golkarri2)
      setGolkarRi3(res.data.golkarri3)
      setGolkarRi4(res.data.golkarri4)
      setGolkarRi5(res.data.golkarri5)
      setGolkarRi6(res.data.golkarri6)
      setGolkarRi7(res.data.golkarri7)
      setGolkarRi8(res.data.golkarri8)
      setGolkarRi9(res.data.golkarri9)
      setGolkarRi10(res.data.golkarri10)
      setGolkarRi11(res.data.golkarri11)

      setGolkarProv1(res.data.golkarprov1)
      setGolkarProv2(res.data.golkarprov2)
      setGolkarProv3(res.data.golkarprov3)
      setGolkarProv4(res.data.golkarprov4)
      setGolkarProv5(res.data.golkarprov5)
      setGolkarProv6(res.data.golkarprov6)
      setGolkarProv7(res.data.golkarprov7)
      setGolkarProv8(res.data.golkarprov8)
      setGolkarProv9(res.data.golkarprov9)
      setGolkarProv10(res.data.golkarprov10)
      setGolkarProv11(res.data.golkarprov11)
    })
  }
  
  return (
    <>
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

      <Carousel autoplaySpeed={9000} autoplay draggable={true}>
          <div>
              
            <div className="border p-3">
              <Bar
                  data={{
                    labels: caleg,
                    datasets: [
                      {
                        data: suaraCaleg,
                        backgroundColor: ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow","yellow"],
                        borderColor: "white",
                        borderWidth: 1,

                      },
                    ]
                  }}
                  height={800}
                  width={600}
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                        position: 'right',
                      },
                      title: {
                        display: true,
                        text: ''
                      }
                    }
                  }}
                />
            </div>
              
          </div>

          <div>
              
            <div className="border p-3">
              <Bar
                  data={{
                    labels: provinsi,
                    datasets: [
                      {
                        data: suaraProvinsi,
                        backgroundColor: ["yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow","yellow"],
                        borderColor: "white",
                        borderWidth: 1,

                      },
                    ]
                  }}
                  height={800}
                  width={600}
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                        position: 'right',
                      },
                      title: {
                        display: true,
                        text: ''
                      }
                    }
                  }}
                />
            </div>
              
          </div>

          <div>
              
            <div className="border p-3">
              <Bar
                  data={{
                    labels: golkar,
                    datasets: [
                      {
                        data: suaraGolkar,
                        backgroundColor: ["yellow", "yellow"],
                        borderColor: "white",
                        borderWidth: 1,

                      },
                    ]
                  }}
                  height={800}
                  width={600}
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                        position: 'right',
                      },
                      title: {
                        display: true,
                        text: ''
                      }
                    }
                  }}
                />
            </div>
              
          </div>

          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Bungus Teluk Kabung</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi1}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv1}</td>
                        </tr>
                      {
                        kecamatanCaleg1.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Lubuk Kilangan</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi2}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv2}</td>
                        </tr>
                      {
                        kecamatanCaleg2.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

            </div>
          </div>

          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Lubuk Begalung</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi3}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv3}</td>
                        </tr>
                      {
                        kecamatanCaleg3.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Padang Selatan</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi4}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv4}</td>
                        </tr>
                      {
                        kecamatanCaleg4.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

            </div>
          </div>
          
          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Padang Timur</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi5}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv5}</td>
                        </tr>
                      {
                        kecamatanCaleg5.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Padang Barat</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi6}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv6}</td>
                        </tr>
                      {
                        kecamatanCaleg6.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

            </div>
          </div>
          
          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Padang Utara</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi7}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv7}</td>
                        </tr>
                      {
                        kecamatanCaleg7.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Naggalo</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi8}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv8}</td>
                        </tr>
                      {
                        kecamatanCaleg8.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

            </div>
          </div>
          
          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Kuranji</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi9}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv9}</td>
                        </tr>
                      {
                        kecamatanCaleg9.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Pauh</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi10}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv10}</td>
                        </tr>
                      {
                        kecamatanCaleg10.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

            </div>
          </div>
          
          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kecamatan Koto Tangah</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        kecamatanCaleg11.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.nama_kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Total Suara Masuk Per Kecamatan</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Suara Masuk</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-left">GOLKAR RI</td>
                          <td className="text-center">{golkarRi11}</td>
                        </tr>
                        <tr>
                          <td className="text-center">0</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-left">GOLKAR PROVINSI</td>
                          <td className="text-center">{golkarProv11}</td>
                        </tr> */}
                      {
                        suaraKecamatan.map((val, i) => (
                          <tr key={i}>
                            <td>{val.kecamatan}</td>
                            <td className="text-center">{val.suara}</td>
                            <td className="text-center">{val.jumlah_pemilih}</td>
                          </tr>
                        ))
                      }
                      
                    </tbody>
                  </table>
                </div>

            </div>
          </div>

          <div>
            <div className='grid md:grid-cols-4 mt-5'>
              <div></div>
              <div className="border p-3 col-span-2">
                <span className="text-xl font-bold">Total Suara TPS Per Kecamatan</span>
                <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                    <tr>
                      <th className="border border-slate-600">No</th>
                      <th className="border border-slate-600">Nama Kecamatan</th>
                      <th className="border border-slate-600 w-56">Jumlah Tps</th>
                      <th className="border border-slate-600 w-56">Total Tps</th>
                      <th className="border border-slate-600 w-56">Total Suara</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tps.map((val, i) => (
                        <tr key={i}>
                          <td className="text-center">{i+1}</td>
                          <td className="text-left">{val.nama_kecamatan}</td>
                          <td className="text-center">{val.total_tps}</td>
                          <td className="text-center">{val.jumlah_tps}</td>
                          <td className="text-center">{val.total_suara}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={2} className="border border-slate-600">TOTAL</th>
                      <th className="border border-slate-600 w-56">{totalTps}</th>
                      <th className="border border-slate-600 w-56">{jumlahTps}</th>
                      <th className="border border-slate-600 w-56">{totalSuara}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div></div>

            </div>

          </div>
      </Carousel>
        
    </div>

    {/* <div className="md:absolute bottom-0 w-full flex md:justify-center">
        <div className="md:flex md:justify-center bg-blue-600 w-full p-4">
            <span className="text-sm text-white">© 2024 <a href="https://mediatamaweb.co.id" className="hover:underline">Design By Mediaatama Web Indonesia</a>. All Rights Reserved.
            </span>
        </div>
    </div> */}
    </>
  );
}
