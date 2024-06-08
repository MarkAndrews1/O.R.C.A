import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import OrcaApi from '../api';
import './AdminLoginForm.css';

function AdminLoginForm() {
    const navigate = useNavigate();
    const { currentProvider, setCurrentProvider } = useContext(UserContext);
    const firstInputRef = useRef(null);

    const [code, setCode] = useState(["", "", "", ""]);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    function handleChange(evt, index) {
        const { value } = evt.target;
        if (/^\d?$/.test(value)) { 
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 3) {
                document.getElementById(`digit-${index + 1}`).focus();
            }
        }
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const adminCode = Number(code.join(''));

        if(adminCode === currentProvider.provider_admin_password){
            setCurrentProvider(prevProvider => ({
                ...prevProvider,
                isAdmin: true
            }));

            let res = await OrcaApi.providerAdminToggle(currentProvider.id, true)
            if(res){
                navigate('/provider/admin')
            }
        }else{
            setCode(["", "", "", ""]);
            if (firstInputRef.current) {
                firstInputRef.current.focus();
            }
            console.log("Wrong code");
        }

    }

    return (
        <div className="ALF-container">
            <h2>Please enter your provider admin code.</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group code-inputs">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                id={`digit-${index}`}
                                name={`digit-${index}`}
                                type="text"
                                className="form-control digit-input"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                ref={index === 0 ? firstInputRef : null}
                                required
                                maxLength="1"
                            />
                        ))}
                    </div>
                    <button type="submit" className="submit-btn">Log in</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLoginForm;
