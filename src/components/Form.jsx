import { useEffect, useState } from "react"
import "/assets/CSS/form.css?url";
import { useDispatch, useSelector } from "react-redux";
import { AxiosTool, FetchTool } from "../features/storeSlice";
import Table from "react-bootstrap/Table";

export default function Form({}) {
    const users = useSelector(state => state.users.store);
    const dispatch = useDispatch();

    const [method, setMethod] = useState("GET");
    const [formData, setFormData] = useState({
        "name": ""
    });

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        dispatch(AxiosTool.getUserData());
    }, []);

    return (
        <>
            <div style={{display: "grid", "justifyContent": "center", "gap": "40px", "textAlign": "center"}}>
                <h1>Method</h1>
                <select
                onChange={(e) => setMethod(e.target.value)}
                value={method}
                name="method"
                id="method"
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                </select>
                <div className="pad">
                    {method === "POST" ? 
                        <div>
                            <h1>Input Category</h1>
                            <br />
                            <input 
                                type="text" 
                                placeholder="Name" 
                                name="name" 
                                onChange={handleChange}/>
                                <br />
                            <button style={{padding: "5px", margin: "20px",backgroundColor: "blueviolet", color: "white"}} onClick={() => dispatch(FetchTool.addUserData(formData.name))}>Add User using fetch()</button>
                            <button style={{padding: "5px", margin: "20px",backgroundColor: "blueviolet", color: "white"}} onClick={() => dispatch(AxiosTool.addUserData(formData.name))}>Add User using axios</button>
                        </div>
                        : 
                        <div>
                            <h1>Data</h1>
                            <p>Method: {method}</p>
                            <p>Status: {users.isLoading? "Loading" : <span className="fw-bold">{users.statusText} ({users.status})</span>}</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.users.map((v, i) => 
                                            <tr key={i}>
                                                <td>{v.id}</td>
                                                <td>{v.name}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                            <button style={{padding: "5px", margin: "5px", backgroundColor: "green", color: "white"}} onClick={() => dispatch(FetchTool.getUserData())}>Refresh</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}