import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditCliente () {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        getClienti();
    }, []);

    function getClienti(){
        axios.get(`http://127.0.0.1/api/cliente/${id}`)
        .then(function(response){
        console.log(response.data);
        setInputs(response.data);
    });
    }
    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values=>({...values, [name]: value}));
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.put(`http://127.0.0.1/api/cliente/${id}/edit`, inputs)
        .then(function(response){
            console.log(response.data);
            navigate('/');
        });
    }
    
    return (
        <>
        <h1>Modifica cliente</h1>
        <div align="center">
            <form onSubmit={handleSubmit} className='edit-form'>
                <table cellSpacing="10" className='edit-table'>
                    <tbody>
                        <tr>
                            <th>
                                <label>Nome: </label>
                            </th>
                            <td>
                                <input defaultValue={inputs.Nome}
                                type="text" 
                                name="nome" 
                                onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Cognome: </label>
                            </th>
                            <td> 
                                <input defaultValue={inputs.Cognome} 
                                type="text" 
                                name="cognome" 
                                onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Contatto: </label>
                            </th>
                            <td>
                                <input defaultValue={inputs.Contatti} 
                                type="text" 
                                name="contatti"  
                                onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align ="center">
                                <button className='save-edit-button'>Salva le modifiche</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
        </>
    );    
}

export default EditCliente