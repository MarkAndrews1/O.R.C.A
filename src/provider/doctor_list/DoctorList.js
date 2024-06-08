import React, {useState, useEffect, useContext  } from "react";
import OrcaApi from "../../api";
import UserContext from "../../auth/UserContext";
import DoctorCard from "./DoctorCard";
import DoctorSearchForm from "./DoctorSearchForm";

function DoctorList(){
    const [doctors, setDoctors ] = useState()
    const { currentProvider } = useContext(UserContext)

    
    useEffect(function getDoctors(){
        getAllDoctors()
    }, [])

    async function getAllDoctors(){
        let doctors = await OrcaApi.getProviderDoctors(currentProvider.id)
        setDoctors(doctors)
    }

    async function search(data){
        try {
            const doctor = await OrcaApi.searchDoctor(data);
            console.log(doctor)
            setDoctors(doctor ? [doctor] : []);
        } catch (error) {
            console.error("Error searching for doctor:", error);
        }
    }

    
    if(!doctors) return <h3>Loading...</h3>

    return(
        <div>
            <DoctorSearchForm searchFor={search} />
        {doctors.length 
                ? <ul>
                    {doctors.map(d => (
                        <DoctorCard 
                        key={d.id}
                        id={d.id}
                        doctor_id={d.id}
                        first_name={d.first_name}
                        last_name={d.last_name}
                        profile_img_url={d.profile_img_url}
                        />
                    ))}
                  </ul>
                : <p> Sorry, couldn't find that doctor... </p>
        }
    </div>  
    )

}

export default DoctorList