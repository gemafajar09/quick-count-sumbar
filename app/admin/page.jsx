"use client"
import { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import { navigate } from './login'

export default function Login() {
    const [show, setShow] = useState(false)

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [errors, setErrors] = useState({}); 

    const validateForm = () => { 
        let errors = {}; 

        if (!password) { 
            errors.password = '* Wajib Di Isi.'; 
        } 

        if (!username) { 
            errors.username = '* Wajib Di Isi.'; 
        }

        localStorage.clear();

        setErrors(errors);
        return (Object.keys(errors).length === 0);
    }; 

  const aksilogin = () => {
    const isValid = validateForm()
    if (!isValid) return
      
    axios.post(`${process.env.NEXT_PUBLIC_URL}/login.php`,{
      username, password
    }).then((res) => {
      console.log(res.data.pesan);
      if(res.data.pesan == 'success'){
        localStorage.setItem("id_user", res.data.user.id_user)
        localStorage.setItem("id_kecamatan", res.data.user.id_kecamatan)
        localStorage.setItem("nama_user", res.data.user.nama_user)
        localStorage.setItem("nama_kecamatan", res.data.user.nama_kecamatan)
        console.log(localStorage.getItem('id_user'));
        navigate(true)
      }else{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: res.data.pesan,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }).catch((err) => {
      console.log(err);
    })
  }
    return (
        <>
          <div className="md:container md:mx-auto mt-10 md:mt-[13%]">
            <div className="flex justify-center">
                <div className="md:w-1/3 border rounded-md p-6 items-center dark:bg-gray-500 justify-center">
                    <span className="text-2xl dark:text-white border-b-2">LOGIN</span>
                    <div className="mb-5 mt-5">
                        <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input type="username" onChange={(e) => setUsername(e.target.value)} className={`${errors.username ? 'outline-red-600 ring-red-600 dark:outline-yellow-500 dark:ring-yellow-500' : 'border border-gray-300' } shadow-sm bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`} placeholder="username" />
                    </div>  
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <div className="relative">
                        <input type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} className={`${errors.password ? 'outline-red-600 border-red-600 dark:outline-yellow-500 dark:ring-yellow-500' : 'border border-gray-300' } shadow-sm bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`} placeholder="*********"/>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">

                            <svg onClick={() => setShow(!show)} className={`h-5 dark:text-white text-gray-700 ${show ? 'block' : 'hidden'}`} fill="none" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512">
                                
                              <path fill="currentColor"
                                d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                              </path>
                            </svg>

                            <svg onClick={() => setShow(!show)} className={`h-5 dark:text-white text-gray-700 ${show ? 'hidden' : 'block'}`} fill="none" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512">
                              <path fill="currentColor"
                                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                              </path>
                            </svg>

                          </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button type="button" onClick={(_) => aksilogin()} className="text-white w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-white">Login</button>
                    </div>
                </div>
            </div>
          </div>
        </>
    )
}