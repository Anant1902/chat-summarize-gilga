import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Chatbot(props: any) {
    const para:string = props.para;
    const summ_para:string = props.summ_para;
    const [query, changeQuery] = useState('');
    let strQuery:string = query

    const [msgs, changeMsgs] = useState<Object[]>(
        [
            {
                role: "user",
                content:"Could you summarize the following paragraph for me?"
            },
            {
                role: "assistant",
                content:"Sure! Send the paragraph here."
            },
            {
                role: "user",
                content: para
            },
            {
                role: "assistant",
                content: summ_para
            },
            {
                role: "assistant",
                content: "How can I help?"
            }
        ]);
    let messages:Object[] = msgs;
    let data:Object; 
    const handleInput = (e: any) => {
        changeQuery(e.currentTarget.value)
    }

    const handleSend = (e: any) => {

        e.preventDefault();

        strQuery = query;

        messages = messages.concat([{
            role: "user",
            content: strQuery
        }])
        
        data = {
        msgs: messages
        };
        fetch("/api/msgs", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        messages = messages.concat([{
            role: "assistant",
            content: data.responseText
        }])
        changeMsgs(messages);
        })
        .catch((error) => {
        console.error("Error fetching data", error);
        });
    }

    return (
        <Row className="w-[1200px] h-fit text-black bg-white rounded-lg py-4 px-20">
            {msgs.filter((cont, i:number) => i > 3).map((msgObj: any, i: number) => (
                i%2 ? (
                    <div key={i} className="p-4">
                    <Col className="bg-green-600 p-2 ml-[700px] w-fit h-fit rounded-lg">
                        <h1 className="text-left">{msgObj.content}</h1>
                    </Col>
                    </div>
                    ) : (
                      <div key={i} className="p-4">
                      <Col className="bg-slate-300 p-2 w-fit h-fit rounded-lg"><span>{msgObj.content}</span>
                      </Col>
                      </div>
                    )
            ))}

            <div className="bg-zinc-400 rounded-2xl w-[1000px] h-14 p-2">
                <input className="rounded-full h-10 w-[890px] p-1 px-4" value={query} onChange={handleInput} />
                <a className="px-4">
                <button className="bg-green-700 px-3 py-2 rounded-lg hover:bg-green-900" onClick={handleSend}> Send </button>
                </a>
            </div>
        </Row>
    );
}

export default Chatbot;