import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@ritesh160193/medium-common5"
import axios from "axios"

import { BACKEND_URL } from "../config"

export const Auth=({type}:{ type : "signup" | "signin"})=>{ 
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        // alert("Button Clicked")
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postInputs);
            const jwt=response.data;
            // alert(jwt)
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }
        catch(e){
            {type=="signup"? alert("User already exists or password does not match minimum standards") : alert("User does not exist")}
        }
    }
    return <div  className="h-screen flex justify-center flex-col  ">
            <div className="flex justify-center">
                <div>
                    <div className="flex justiy-center flex-col items-center">
                        <div className="text-3xl font-extrabold">
                            Create an account
                        </div>
                        <div className="text-xm text-slate-500 font-medium flex justify-center items-center">
                            <div className="mr-1"> {type=="signin" ? "Don't have and Account?":"Already have account?" } </div>
                            <Link to={type=="signin"?"/signup": "/signin"}className="underline">{type=="signin"?"Sign Up": "Sign In"}</Link>
                        </div>
                    </div>
                    {type=="signup"? <LabelInput label="Name" type="text" placeholder="Enter Name" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            name:e.target.value,
                        })
                    }}/> :null}
                    
                    <LabelInput label="Email" type="text" placeholder="ritesh@gmail.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            email:e.target.value,
                        })
                    }}/>
                    <LabelInput label="Password" type="password" placeholder="Enter Password" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,
                            password:e.target.value,
                        })
                    }}/>
                    
                    <button onClick={sendRequest} type="button" className="mt-2 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signup" ? "Sign Up" : "Sign In"}</button>                
                </div>
            </div>
        </div>
}
interface LabelInputType
{
    label:string,
    placeholder:string,
    type:string,
    onChange:(e : ChangeEvent<HTMLInputElement>)=>void
}
function LabelInput({label, placeholder, type, onChange}:LabelInputType){

    return <div>
        <label className="block text-m font-medium text-gray-900">{label}</label>
        <div className="mb-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-blue-600">
                <input onChange={onChange} type={type} name="first_name" className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder={placeholder}/>
            </div>
        </div>
    </div>
}
