'use client'

import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import Chatbot from "@/components/chatbox";

export default function Home() {
    const searchParams = useSearchParams();
    const para = searchParams.get('para');
    const [shortenedPara, changeShortenedPara] = useState('');
    const [isSum, changeIsSum] = useState(false);

    const [msg_history, changeMsg_history] = useState(["How can I help?"]);

    const handle_msg_change = (newMsg: string) => {
        changeMsg_history(msg_history.concat(newMsg));
    }

    const data = {
        para: para,
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        changeShortenedPara('Shortening text...');
        fetch("/api/openAI", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        changeShortenedPara(data.responseText);
        changeIsSum(true);
        })
        .catch((error) => {
        console.error("Error fetching data", error);
        });
    }
  return (
    <div>
      <h1 className=" mx-auto text-3xl text-yellow-50 font-bold pb-5"> Text inputted:</h1>
      <div className="italic text-black pb-4">
        {para}
        </div>
      <button className="bg-green-700 p-3 rounded-lg hover:bg-green-900" onClick={handleSubmit}>Click to summarize </button>
      <div>
        {!isSum ? (
            <div className='italic text-black py-4'>{shortenedPara}</div>
        ) : (
            <div>
                 <h1 className=" mx-auto text-3xl text-yellow-50 font-bold py-5"> Improvised text:</h1>
                <div className="italic text-black">
                    {shortenedPara}
                </div>
                <h1 className=" mx-auto text-3xl text-yellow-50 font-bold py-5"> Customize the response here:</h1>
                <Chatbot para={para} summ_para={shortenedPara} />
                <br />
            </div>
        )}
      </div> 
    </div>
  )
}