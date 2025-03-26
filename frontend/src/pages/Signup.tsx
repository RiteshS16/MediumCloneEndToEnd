import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = ()=>{
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <Auth type={"signup"}/>
        <Quote/>
        </div>
}