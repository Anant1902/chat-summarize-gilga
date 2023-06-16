import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Chatbot(props: any) {
    const msgs:String[] = props.msgs;
    const change_msgs = props.change_msgs;
    const para:string = props.para;
    const summ_para:string = props.summ_para;
    const [query, changeQuery] = useState('');
    const strQuery:string = query
    const [currMsgs, changeCurrMsgs] = useState<Object[]>(
        [{}, {}, {}, {}, {
        role: 'user',
        content: "How can I help?"
    }]);

    const data = {
        newMsg: strQuery,
        role: "user",
        para: para,
        summ_para: summ_para
    };

    const handleInput = (e: any) => {
        changeQuery(e.currentTarget.value)
    }

    const handleSend = (e: any) => {
        e.preventDefault();
        fetch("/api/msgs", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        changeCurrMsgs(data.msgs);
        })
        .catch((error) => {
        console.error("Error fetching data", error);
        });
        
    }

    return (
        <Row className="w-[1200px] h-fit text-black bg-white rounded-lg py-4 px-20">
            {currMsgs.filter((cont, i:number) => i > 3).map((msgObj: any, i: number) => (
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