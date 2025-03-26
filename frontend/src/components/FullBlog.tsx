import { AppBar } from "./AppBar"
import { Blog } from "../hooks"
export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <AppBar/>
        <div className="grid grid-cols-12 px-20 pt-10">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">{blog.title}</div>
                <div className="pt-2 text-slate-400"> Published on 02 Dec 2023</div>
                <div className="text-xl pt-4">{blog.content}</div>        
            </div>
            <div className="col-span-4">
                Author
                <div className="text-2xl font-bold">
                    {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500"> Random catch phrase</div>
            </div>
            
        </div>
        </div>
        

    
}