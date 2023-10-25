'use client'

import { useState } from "react";
import Link from "next/link";

function TextInput() {
    const [mainPara, changePara] = useState('');
    const mainParaString:string = mainPara;
    const [shortenedPara, changeShortenedPara] = useState('');

    const paraHandler = (e: any) => {
        changePara(e.currentTarget.value);
    }
    const data = {
        para: mainParaString,
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
        })
        .catch((error) => {
        console.error("Error fetching data", error);
        });
    }

    return (
        <div>
        <h1 className="text-3xl pb-4">
            Type in the text you want to summarize here:
        </h1>
        <form>
            <textarea value={mainPara} onChange={paraHandler} rows={10} className="rounded-lg w-4/6 align-text-top p-2 text-black"/>
            <div className="py-8">
            <Link href={{
                pathname: '/ChatPage',
                query: {
                  para: mainParaString
                }
            }}
            className="btn btn-primary bg-green-700 p-3 rounded-lg hover:bg-green-900">Submit</Link>
            </div>
        </form>
        </div>

    )
}

export default TextInput;