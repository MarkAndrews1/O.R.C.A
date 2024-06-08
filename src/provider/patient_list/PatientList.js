import React, {useState, useEffect, useContext  } from "react";
import OrcaApi from "../../api";
import UserContext from "../../auth/UserContext";
import PatientCard from "./PatientCard";
import PatientSearchForm from "./PatientSearchForm";

function PatientList(){
    const [patients, setPatients ] = useState()
    const { currentProvider } = useContext(UserContext)

    
    useEffect(function getPatients(){
        getAllPatients()
    }, [])

    async function getAllPatients(){
        let patients = await OrcaApi.getProviderPatients(currentProvider.id)
        setPatients(patients)
    }

    async function search(data){
        try {
            const patient = await OrcaApi.searchPatient(data);
            setPatients(patient ? [patient] : []);
        } catch (error) {
            console.error("Error searching for patient:", error);
        }
    }

    
    if(!patients) return <h3>Loading...</h3>

    return(
        <div>
            <PatientSearchForm searchFor={search} />
        {patients.length 
                ? <ul>
                    {patients.map(p => (
                        <PatientCard 
                        key={p.id}
                        id={p.id}
                        patient_id={p.id}
                        first_name={p.first_name}
                        last_name={p.last_name}
                        date_of_birth={p.date_of_birth}
                        phone_num={p.phone_num}
                        />
                    ))}
                  </ul>
                : <p> Sorry, couldn't find that patient... </p>
        }
    </div>  
    )

}

export default PatientList