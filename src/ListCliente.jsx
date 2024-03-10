import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function ListCliente () {
    const [clienti, setClienti] = useState([]);
    useEffect(()=>{
        getClienti();
    }, []);

   function getClienti(){
        axios.get('http://127.0.0.1/api/index.php')
        .then(function(response){
        console.log(response.data);
        setClienti(response.data);
    });
    }

    
    const deleteCliente = (id) =>{
        axios.delete(`http://127.0.0.1/api/cliente/${id}/delete`)
        .then(function(response){
            console.log(response.data);
            getClienti();
        });
    }

    return (      
       <>
       <div>
            
            <table className='tlist-style table table-responsive table-hover table-bordered'>
                <thead className='table-dark'>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Contatti</th>
                        <th>Modifica o cancella i dati del cliente</th>
                    </tr>
                </thead>
                <tbody className='tblist-style'>
                    {clienti.map((cliente,key)=>
                        <tr key={key}>
                            <td>{cliente.ID}</td>
                            <td>{cliente.Nome}</td>
                            <td>{cliente.Cognome}</td>
                            <td>{cliente.Contatti}</td>
                            <td>
                             <button className='edit-button'><Link to = {`cliente/${cliente.ID}/edit`} style={{marginRight: "10px"}}>Modifica</Link></button>
                                <button className='delete-button' onClick={() => {if(window.confirm("Vuoi cancellare il cliente?")){deleteCliente(cliente.ID)};}}>Cancella</button>  
                            </td>
                        </tr>
                        )}
                    
                </tbody>
            </table>
            <p className='info-footer-txt'>Per maggiori informazioni sull'applicazione, cliccare <Link to="info">qui </Link>
                    o fare riferimento al file <b><i>InfoAppCRUD.txt</i></b> presente nel repository.</p>
        </div>
       </> 
    );    
}
export default ListCliente