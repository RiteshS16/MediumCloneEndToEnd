import axios from "axios"
import { AppBar } from "../components/AppBar"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { useState } from "react"
export const Publish=()=>{
    const [title,setTitle]=useState<string>("");
    const [description,setDescription]=useState<string>("");
    const navigate=useNavigate();
    return  <div>
                <div>
                    <AppBar/>
                </div>
                <div className="px-15 py-10">
                    <input type="text" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)} placeholder="Title" id="small-input" className="block w-full p-2 m-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <textarea rows={10} onChange ={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setDescription(e.target.value)} placeholder="Write your post" id="small-input" className="block w-full p-2 m-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <button onClick={async()=>{
                        const response= await axios.post(`${BACKEND_URL}/api/v1/blog/`,{
                            title,
                            content:description
                        },{
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        })
                        
                        navigate(`/blog/${response.data.id}`)

                    } } className=" p-2 m-4 cursor-pointer bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded-full">Publish</button>
                </div>
            </div>
    
}