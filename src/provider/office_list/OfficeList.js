import React, { useState, useEffect, useContext } from "react";
import OrcaApi from "../../api";
import UserContext from "../../auth/UserContext";
import OfficeCard from "./OfficeCard";
import OfficeSearchForm from "./OfficeSearchForm";
import "./OfficeList.css"; // Import the CSS file for styling

function OfficeList() {
    const [offices, setOffices] = useState();
    const { currentProvider } = useContext(UserContext);

    useEffect(() => {
        getOffices();
    }, []);

    async function getOffices() {
        try {
            let offices = await OrcaApi.getProviderOffices(currentProvider.id);
            setOffices(offices);
        } catch (error) {
            console.error("Error fetching offices:", error);
        }
    }

    async function search(data) {
        try {
            const office = await OrcaApi.searchOffice(data);
            setOffices(office ? [office] : []);
        } catch (error) {
            console.error("Error searching for office:", error);
        }
    }

    if (!offices) return <h3>Loading...</h3>;

    return (
        <div className="office-list-container"> {/* Apply the container class */}
            <h2>Search for Offices</h2>
            <OfficeSearchForm searchFor={search} />

            <div className="office-cards-container"> {/* Apply the container class */}
                {offices.length ? (
                    <ul>
                        {offices.map((o) => (
                            <OfficeCard
                                key={o.id}
                                id={o.id}
                                office_id={o.id}
                                address={o.address}
                                phone_num={o.phone_num}
                            />
                        ))}
                    </ul>
                ) : (
                    <p>Sorry, couldn't find that office...</p>
                )}
            </div>
        </div>
    );
}

export default OfficeList;
