import React,{useState,useEffect} from "react";
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected({children,authentication=true}){
    const navigate = useNavigate()
    const [loader,setloader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloader(false)
    },[authStatus,navigate,authentication])

    return loader ? <h1>loading...</h1> : <>{children}</>
}