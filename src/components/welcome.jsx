import {useNavigate} from "react-router-dom";

export default function Welcome(){
    const navigate=useNavigate();
    function handleClick(){
        navigate("/surveyRoom");
    }
    return(
        <div className="flex-col flex pt-10">
            <span className="text-7xl m-10 text-black mx-auto">Welcome</span>
            <button className="text-xl text-white hover:bg-white hover:border-2 hover: border-blue-800
            hover:text-black w-36 mx-auto bg-blue-600 rounded-xl h-10" onClick={handleClick}>Start</button>
        </div>
    )
}