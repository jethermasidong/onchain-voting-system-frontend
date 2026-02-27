import React from 'react';
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import axios from 'axios';
import background from "../images/phflag.jpg"; 

export default function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleLoginClick = async (e) => {

        e.preventDefault();

        const newErrors = {};
        if (!voters_id) newErrors.voters_id = "Voters ID is required!";
        if (!password) newErrors.password = "Password is required!";
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return;

        try {
            const response = await axios.post(
                "https://localhost:3000/login",
                ({voters_id, password}),
                {headers: {"Content-Type" : "application/x-www-form-urlencoded"}}
            );

            localStorage.setItem("token", response.data.token);
            navigate('/dashboard')
            
        } catch (error) {
            if (error.response) {
                setErrors({form: error.response.data.message || "Invalid credentials."});
            } else {
                setErrors({form: "Cant connect to the server. Please try again later!"});
            }
        }

    };

};