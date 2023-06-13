import {useEffect, useState} from 'react'
import {questions} from "../data.js";

import {useNavigate} from "react-router-dom";


function SurveyRoom() {
    const [customerNo, setCustomerNo] = useState(localStorage.length)

    const [qNo, setQNo] = useState(0);

    const [text, setText] = useState("");
    const [ans, setAns] = useState({"completed": "false"});
    const [isOpen, setIsOpen] = useState(false);
    const [submit, setSubmit] = useState(false);

    const navigate = useNavigate();
    const arr = new Array(questions[qNo].options).fill(0)

    useEffect(() => {               //to get customer number from local storage
        setCustomerNo(localStorage.length)
    }, [])

    useEffect(() => {                 //to update local storage whenever an ans is given
        if (Object.keys(ans).length > 1)
            localStorage.setItem(`session ${customerNo}`, JSON.stringify(ans))
    }, [ans])
    useEffect(() => {
        if (qNo === questions.length - 1) {           //to set completed key to true and call closing component
            submit && (setAns((ans) => {
                console.log(1)
                let temp = {...ans, [`completed`]: 'true'}
                localStorage.setItem(`session ${customerNo}`, JSON.stringify(temp))
                return temp;
            }))
            submit && navigate('/closing')
        }
    }, [submit])


    function handleBtn(index) {

        setAns((ans) => {
            return {...ans, [`answer ${qNo}`]: index + 1}
        })
    }

    function handleNext() {
        if (qNo < questions.length - 1)
            setQNo((qNo + 1))
        else {
            setAns((ans) => {
                console.log(1)
                let temp = {...ans, [`answer ${qNo}`]: text}
                localStorage.setItem(`session ${customerNo}`, JSON.stringify(temp))
                return temp;
            })
            setIsOpen(true);
        }
    }

    function handleChange(e) {
        setText(e.target.value);
    }

    function handlePrev() {
        if (qNo > 0)
            setQNo((qNo - 1))
    }

    function handleSkip() {
        if (qNo < questions.length - 1)
            setQNo((qNo + 1))
        else {
            setAns((ans) => {
                console.log(1)
                let temp = {...ans, [`answer ${qNo}`]: null}
                localStorage.setItem(`session ${customerNo}`, JSON.stringify(temp))
                return temp;
            })
            setIsOpen(true);
        }
        setAns((ans) => {
            return {...ans, [`answer ${qNo}`]: null}
        })
    }

    return (
        <div className="flex flex-col">
            {/*<Navbar/>*/}
            <div className="text-5xl mx-auto flex mt-10">
                Customer Survey
            </div>
            <div className="flex justify-end pr-20 pt-10 text-xl">
                {qNo + 1}/{questions.length}
            </div>
            <div className="w-3/4 text-4xl mx-auto flex">
                {qNo + 1}{". "}{questions[qNo].question}
            </div>
            <div className="text-xl justify-center flex pt-10">
                {questions[qNo].type === "radioButtons" ? (
                    arr.map((a, index) =>
                        <button onClick={() => handleBtn(index)}
                                className={`${index + 1 === ans[`answer ${qNo}`] ? "bg-blue-800 text-white" : "bg-white"} 
                                border-2 border-black text-3xl m-1 
                                rounded-full h-20 w-20 hover:bg-blue-500 hover:text-white`}
                                key={index}>
                            {index + 1}{console.log(index, ans[`answer ${qNo}`])}
                        </button>)) : (
                    <><textarea
                        className="h-32 w-3/4 border-2 border-black p-2"
                        value={text}
                        placeholder="message"
                        onChange={handleChange}
                    />
                    </>
                )
                }
            </div>
            <br/>
            {isOpen && (
                <div
                    className="absolute ml-[450px] mt-20 rounded-xl bg-white border-2
                    border-black h-96 w-96 text-3xl font-bold p-12">
                    <span className="ml-10">Are you sure?</span>
                    <br/>
                    <button className="mt-5 ml-20 text-xl text-white enabled:hover:bg-white
                    enabled:hover:border-2 hover:border-blue-800
                    enabled:hover:text-black w-36 bg-blue-600 rounded-xl h-10" onClick={() => {
                        setSubmit(true);
                        setIsOpen(false)
                    }}>Yes
                    </button>
                    <button className="mt-2 ml-20 text-xl text-white enabled:hover:bg-white
                    enabled:hover:border-2 hover:border-blue-800
                    enabled:hover:text-black w-36 bg-blue-600 rounded-xl h-10" onClick={() => {
                        setSubmit(false);
                        setIsOpen(false)
                    }}>N0
                    </button>
                </div>
            )}
            <div className="flex absolute flex-row mt-[500px]">
                <button className="ml-44 mr-[100px] text-xl text-white enabled:hover:bg-white
                enabled:hover:border-2 hover:border-blue-800
                enabled:hover:text-black w-36 bg-blue-600 rounded-xl h-10 disabled:opacity-50" onClick={handlePrev}
                        disabled={qNo === 0}>Prev
                </button>
                <button className="ml-44 mr-[250px] text-xl text-white enabled:hover:bg-white
                 enabled:hover:border-2 hover:border-blue-800
                 enabled:hover:text-black w-36 bg-blue-600 rounded-xl h-10 disabled:opacity-50" onClick={handleSkip}
                        disabled={qNo === questions.length}>
                    {qNo === questions.length - 1 ? "Skip & Submit" : "skip"}</button>
                <button className=" text-xl text-white hover:bg-white hover:border-2 hover: border-blue-800
                hover:text-black w-36 bg-blue-600 rounded-xl h-10 disabled:opacity-50"
                        onClick={handleNext}>{qNo === questions.length - 1 ? "Submit" : "Next"}</button>
            </div>
        </div>
    )
}

export default SurveyRoom;