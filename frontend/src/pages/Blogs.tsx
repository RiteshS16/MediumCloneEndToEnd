import { BlogsCard } from "../components/BlogsCard"
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const  Blogs=()=>{
    const {loading,blogs} = useBlogs();
    if(loading)
        return <div>
                <AppBar />
                <div className="flex justify-center ">
                    <div>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>
                        <BlogSkeleton/>

                    </div>
                    
                </div>
            </div>
        
        // alert(JSON.stringify(blogs[0]));
    return  <div>
                <AppBar />
                
                <div className="flex justify-center p-4">
                    <div>
                        {blogs.map(blog=><BlogsCard id={blog.id}
                        authorName={blog.author.name || "Anonymous"} 
                        title={blog.title} 
                        content={blog.content} 
                        publishData={"2nd Feb"} />)}
                    </div>
                </div>
            </div>
    

}