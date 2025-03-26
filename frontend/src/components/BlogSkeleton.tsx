export const BlogSkeleton=()=>{
    return <div role="status" className="p-5 animate-pulse">
                <div className="border-b-1 border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer ">
                    <div className="flex">
                        <div className="flex justify-center flex-col">
                            <div className="h-2.5 bg-gray-200 rounded-ful w-48 mb-4"><div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div></div>
                        </div>
                        <div className="font-extralight p-2 text-sm flex justify-center flex-col">
                            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                        </div>
                        
                    </div>
                    <div className="text-xl font-semibold pt-2">
                        <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                    </div>
                    <div className="text-md font-thin ">
                        <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-thin pt-4">
                        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
    
    
}