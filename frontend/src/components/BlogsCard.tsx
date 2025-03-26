import { Link } from "react-router-dom"
interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publishData:string,
    id:string
}
export const BlogsCard=({
    id,
    authorName, 
    title,
    content,
    publishData
}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
                <div className="border-b-1 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
                    <div className="flex">
                        <div className="flex justify-center flex-col">
                            <Avatar name={authorName} />
                        </div>
                        <div className="font-extralight p-2 text-sm flex justify-center flex-col">
                            {authorName} . {publishData}
                        </div>
                        
                    </div>
                    <div className="text-xl font-semibold pt-2">
                        {title}
                    </div>
                    <div className="text-md font-thin ">
                        {content.slice(0,100) + "..."}
                    </div>
                    <div className="text-xs text-gray-400 font-thin pt-4">
                        {`${Math.ceil(content.length/100)}+ minute(s) read`}
                    </div>
                </div>
        </Link>
}

export function Avatar({name}:{name:string}){
    return  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600">
                    <span className="font-small text-black-200 dark:text- -300">{name[0]}</span>
                </div>
            
      
    
}