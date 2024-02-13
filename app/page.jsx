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
  const [partai, setPartai] = useState([])
  const [suarapartai, setSuarapartai] = useState([])
  const [suaraKecamatan, setSuaraKecamatan] = useState([])
  const [suaraCaleg1, setSuaraCaleg1] = useState([])
  const [suaraCaleg2, setSuaraCaleg2] = useState([])

  const [calegDapil1, setCalegDapil1] = useState([])
  const [calegDapil11, setCalegDapil11] = useState([])

  const [calegDapil2, setCalegDapil2] = useState([])
  const [calegDapil22, setCalegDapil22] = useState([])

  const [calegDapil3, setCalegDapil3] = useState([])
  const [calegDapil33, setCalegDapil33] = useState([])

  const [calegDapil4, setCalegDapil4] = useState([])
  const [calegDapil44, setCalegDapil44] = useState([])

  const [calegDapil5, setCalegDapil5] = useState([])
  const [calegDapil55, setCalegDapil55] = useState([])

  const [calegDapil6, setCalegDapil6] = useState([])
  const [calegDapil66, setCalegDapil66] = useState([])

  const [partaiDapil1, setPartaiDapil1] = useState([])
  const [partaiDapil2, setPartaiDapil2] = useState([])
  const [partaiDapil3, setPartaiDapil3] = useState([])
  const [partaiDapil4, setPartaiDapil4] = useState([])
  const [partaiDapil5, setPartaiDapil5] = useState([])
  const [partaiDapil6, setPartaiDapil6] = useState([])

  useEffect(() => {
    jumlahSuara()
    jumlahSuaraDapilCaleg()
    jumlahSuaraDapilPartai()
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
      console.log(e);
        jumlahSuara()
        jumlahSuaraDapilPartai()
        jumlahSuaraDapilCaleg()
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
      setPartai(res.data.partai)
      //  suara per kecamatan
      setSuaraKecamatan(res.data.suarakecamatan)
      // suara partai
      setSuarapartai(res.data.suarapartai)
      // suara caleg
      setSuaraCaleg1(res.data.suaracaleg1)
      setSuaraCaleg2(res.data.suaracaleg2)
    })
  }

  const jumlahSuaraDapilCaleg = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataTotalSuaraCalegDapil.php`)
    .then((res) => {
      // suara caleg dapil 1 -6
      setCalegDapil1(res.data.dapilcaleg1)
      setCalegDapil11(res.data.dapilcaleg11)
      setCalegDapil2(res.data.dapilcaleg2)
      setCalegDapil22(res.data.dapilcaleg22)
      setCalegDapil3(res.data.dapilcaleg3)
      setCalegDapil33(res.data.dapilcaleg33)
      setCalegDapil4(res.data.dapilcaleg4)
      setCalegDapil44(res.data.dapilcaleg44)
      setCalegDapil5(res.data.dapilcaleg5)
      setCalegDapil55(res.data.dapilcaleg55)
      setCalegDapil6(res.data.dapilcaleg6)
      setCalegDapil66(res.data.dapilcaleg66)
    })
  }

  const jumlahSuaraDapilPartai = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_URL}/dashboard/getDataTotalSuaraPartaiDapil.php`)
    .then((res) => {
      // suara partai dapil 1 -6
      setPartaiDapil1(res.data.partaidapil1)
      setPartaiDapil2(res.data.partaidapil2)
      setPartaiDapil3(res.data.partaidapil3)
      setPartaiDapil4(res.data.partaidapil4)
      setPartaiDapil5(res.data.partaidapil5)
      setPartaiDapil6(res.data.partaidapil6)
    })
  }

  const numberFormat = (number) => {
    return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(
      number,
    )
  }
  
  return (
    <>
    <div className="pl-5 pb-5 pr-5 pt-3">
      <div className="flex justify-between">
        <div className="flex font-bold gap-3 items-end">
          <Image 
            width={60} 
            height={60} 
            src={"/logo.png"} 
            alt="image" />
            <div className="grid">
              <div className=' text-sm'>
                Aplikasi Quick Count
              </div>
              <div className=' text-xl'>
                Kota Padang
              </div>
            </div>
        </div>
        <div className="flex text-xl justify-center mb-3 font-bold gap-3 items-end">
          <Image width={180} height={180} src={"/mediatama.png"} alt="image" />
          <Image width={120} height={120} src={"/digital.png"} alt="image" />
          <Image width={150} height={150} src={"/training.png"} alt="image" />
        </div>
        <div className="flex justify-center items-center">
          Total Sura Masuk : 
          <div className="text-white text-xl bg-blue-500 p-3 ml-5 w-36 text-center rounded-l-xl">{suara}</div>
          <div className="text-white text-xl bg-red-500 p-3 w-36 text-center rounded-r-xl">{total}</div>
        </div>
      </div>
      <div className="border-b-2 mt-3 border-gray-500"></div>

      <Carousel autoplaySpeed={9000} autoplay draggable={true}>
          <div>
              <div className="grid grid-rows-2 grid-cols-2 mt-5">
              
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
                
                <div className="border p-3">
                  <Bar
                      data={{
                        labels: partai,
                        datasets: [
                          {
                            data: suarapartai,
                            backgroundColor: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
                            borderColor: "white",
                            borderWidth: 1,

                          },
                        ]
                      }}
                      height={300}
                      width={500}
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
                            text: 'Total Suara Partai'
                          }
                        }
                      }}
                    />
                </div>
              
              </div>
          </div>

          <div>
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kota Padang</span>
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
                        suaraCaleg1.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Kota Padang</span>
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
                        suaraCaleg2.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+26}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

            </div>
          </div>
          {/* suara dapil caleg */}
          <div>
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil I</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil1.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil I</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil11.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+26}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
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
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil II</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil2.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil II</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil22.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+26}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
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
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil III</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil3.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil III</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                  <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil33.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
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
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil IV</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil4.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil IV</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil44.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
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
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil V</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil5.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil V</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil55.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
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
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil VI</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil6.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Caleg Terbanyak Per Dapil VI</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Nama Caleg</th>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        calegDapil66.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.nama_caleg}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>


            </div>
          </div>
          {/* tutup suara dapil caleg */}

          {/* suara dapil partai */}
          <div>
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Partai Terbanyak Per Dapil I</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        partaiDapil1.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Partai Terbanyak Per Dapil II</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        partaiDapil2.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
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
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Partai Terbanyak Per Dapil III</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        partaiDapil3.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Partai Terbanyak Per Dapil IV</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        partaiDapil4.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
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
            <div className="grid grid-cols-2 mt-5">

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Partai Terbanyak Per Dapil V</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        partaiDapil5.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                <div className="border row-span-2 p-3">
                  <span className="text-xl font-bold">Suara Partai Terbanyak Per Dapil VI</span>
                  <table className="table-auto border-separate border-spacing-2 border border-slate-500 w-full mt-3">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Partai</th>
                        <th className="border border-slate-600">No</th>
                        <th className="border border-slate-600">Kecamatan</th>
                        <th className="border border-slate-600">Total Suara</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        partaiDapil6.map((val, i) => (
                          <tr key={i}>
                            <td className="text-center">{i+1}</td>
                            <td className="text-left">{val.partai}</td>
                            <td className="text-left">{val.kecamatan}</td>
                            <td className="text-center">{val.total}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>


            </div>
          </div>
          {/* tutup dapil partai */}

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
