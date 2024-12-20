import { useState, useEffect } from "react";
import { obtenerEventosAPI } from "./fetchDashboard";
import { getFromLocalStorage } from "../../App/localStorageHandle";
import { useDispatch } from "react-redux";
import { loadInitialEventos } from "../../../app/slices/eventosSlice";
import Header from "./Header"
import Alert from "../../ui/Alert/Alert";
import InformeContainer from "./InformeContainer";
import AnalisisContainer from "./AnalisisContainer/AnalisisContainer";
import ListadoContainer from "./ListadoContainer/ListadoContainer";
import { useNavigate } from "react-router-dom";

const DashboardPage = () =>{

    const userData = getFromLocalStorage("userData");
    const [mensaje, setMensaje] = useState("");

    const dispatcher = useDispatch();
    const navigateTo=useNavigate();

    const levantarEventos = async() =>{
      try{
        const datos = await obtenerEventosAPI(userData);
        dispatcher(loadInitialEventos(datos.eventos));
      }catch(error){
        setMensaje(error);
        navigateTo("../login")
      }
    }
    useEffect(()=>{
      levantarEventos();
    },[])

    return(
    <div className="container-fluid">
    <Header></Header>
    <h1>
        {mensaje !== "" ? (<Alert message={mensaje} classColor={"alert-danger"}/>):("")}
    </h1>
    <InformeContainer/>
    <AnalisisContainer/>
    <ListadoContainer/>
    </div>)
};

export default DashboardPage;