import { Avatar } from "./BlogsCard"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
export const AppBar=()=>{
    const location=useLocation();
    const path=location.pathname.split("/");
    
    
    return  <div className="border-b flex justify-between px-10 py-4 cursor-pointer">
                <div className="flex justify-center flex-col ">
                    <Link to="/blogs">Medium</Link>
                </div>
                <div className="flex justify-center">
                    <div className="p-2">
                        {(path[1]=="blogs" || path[1]=="publish")?<Link to={`/publish`}><button className="cursor-pointer bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded-full">
                        {path[1]=="blogs"?"New Blog":"Publish"}</button></Link> : null }
                    </div>
                    <div className="flex justify-center flex-col">
                        <Avatar name="Ritesh Sharma" />
                    </div>
                    
                </div>

            </div>
}