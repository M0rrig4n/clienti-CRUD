import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCliente () {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    
    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values=>({
            ...values, [name]: value
        }))
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post('http://127.0.0.1/api/index.php', inputs)
        .then(function(response){
            console.log(response.data);
            navigate('/');
        })
    }   

    return (
        <>
        <div align="center">
            <h1>Crea un nuovo cliente</h1>
            <form onSubmit={handleSubmit} className='form-create'>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Nome: </label>
                            </th>
                            <td>
                                <input type="text" 
                                name="nome"onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Cognome: </label>
                            </th>
                            <td> 
                                <input type="text" 
                                name="cognome" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Contatto: </label>
                            </th>
                            <td>
                                <input type="text" 
                                name="contatti"  onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="center">
                                <button className='create-cliente-button'>Crea</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
        </>
    );    
}
export default CreateCliente