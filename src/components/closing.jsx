import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Closing(){

    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>navigate("/"),5000);
    },[])
    return(
        <div className="text-5xl font-bold flex justify-center p-20">
            Thank You For Your Feedback
        </div>
    )
}