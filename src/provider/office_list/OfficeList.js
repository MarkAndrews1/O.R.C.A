import React, {useState, useEffect, useContext  } from "react";
import OrcaApi from "../../api";
import UserContext from "../../auth/UserContext";
import OfficeCard from "./OfficeCard";
import OfficeSearchForm from "./OfficeSearchForm";

function OfficeList(){
    const [offices, setOffices ] = useState()
    const { currentProvider } = useContext(UserContext)

    
    useEffect(function getOffices(){
        getAllOffices()
    }, [])

    async function getAllOffices(){
        let offices = await OrcaApi.getProviderOffices(currentProvider.id)
        setOffices(offices)
    }

    async function search(data){
        try {
            const office = await OrcaApi.searchOffice(data);
            setOffices(office ? [office] : []);
        } catch (error) {
            console.error("Error searching for office:", error);
        }
    }

    
    if(!offices) return <h3>Loading...</h3>

    return(
        <div>
            <OfficeSearchForm searchFor={search} />
        {offices.length 
                ? <ul>
                    {offices.map(o => (
                        <OfficeCard 
                        key={o.id}
                        id={o.id}
                        office_id={o.id}
                        address={o.address}
                        phone_num={o.phone_num}
                        />
                    ))}
                  </ul>
                : <p> Sorry, couldn't find that office... </p>
        }
    </div>  
    )

}

export default OfficeList