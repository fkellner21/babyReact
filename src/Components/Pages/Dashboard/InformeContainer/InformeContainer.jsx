import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Informe from "./Informe/Informe";
import Agregar from "../Agregar/Agregar";

const InformeContainer = () =>{
    const eventos = useSelector((store) => store.eventosSlice.eventos);
    const [biberonesHoy, setBiberonesHoy] = useState(0);
    const [panalesHoy, setPanalesHoy] = useState(0);
    const [tiempoUltimoBiberon, setTiempoUltimoBiberon] = useState("");
    const [tiempoUltimoPanal, setTiempoUltimoPanal] = useState("");

    const _tiempoTranscurrido = (fecha) => {
        const ahora = new Date();
        const fechaIngresada = new Date(fecha);
    
        let años = ahora.getFullYear() - fechaIngresada.getFullYear();
        let meses = ahora.getMonth() - fechaIngresada.getMonth();
        let días = ahora.getDate() - fechaIngresada.getDate();
        let horas = ahora.getHours() - fechaIngresada.getHours();
        let minutos = ahora.getMinutes() - fechaIngresada.getMinutes();
        let segundos = ahora.getSeconds() - fechaIngresada.getSeconds();
    
        if (segundos < 0) {
            segundos += 60;
            minutos--;
        }
        if (minutos < 0) {
            minutos += 60;
            horas--;
        }
        if (horas < 0) {
            horas += 24;
            días--;
        }
        if (días < 0) {
            const díasMesAnterior = new Date(ahora.getFullYear(), ahora.getMonth(), 0).getDate();
            días += díasMesAnterior;
            meses--;
        }
        if (meses < 0) {
            meses += 12;
            años--;
        }

        if (meses>=1||años>=1) return "El ultimo registro es de hace mas de un mes"

        return (`${días} dias, ${horas} horas, ${minutos} minutos`)
    }
    
    const _tiempoDesdeUltimo=(array, idCategoria)=> {
        // Filtrar objetos por idCategoria 
        const filtrados = array.filter(obj => obj.idCategoria === idCategoria);
    
        if (filtrados.length === 0) {
            return "No hay registros.";
        }
    
        // Encontrar el objeto más reciente
        const ultimoObjeto = filtrados.reduce((ultimo, actual) => {
            return new Date(actual.fecha) > new Date(ultimo.fecha) ? actual : ultimo;
        });

        // Calcular el tiempo transcurrido desde la fecha del último objeto
        return _tiempoTranscurrido(ultimoObjeto.fecha);
    }

    const _getBiberones=()=> {
        return eventos.filter((ev) => {
            if (ev.idCategoria === 35) {
                const fecha = new Date(ev.fecha);
                fecha.setHours(0, 0, 0, 0);
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                return fecha.getTime() === hoy.getTime();
            }
            return false;
        }).length;}
    const _getPanales=()=> {
        return eventos.filter((ev) => {
            if (ev.idCategoria === 33) {
                const fecha = new Date(ev.fecha);
                fecha.setHours(0, 0, 0, 0);
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                return fecha.getTime() === hoy.getTime();
            }
            return false;
        }).length;}

        useEffect(()=>{
            setBiberonesHoy(_getBiberones());
            setPanalesHoy(_getPanales());
            setTiempoUltimoBiberon(_tiempoDesdeUltimo(eventos, 35));
            setTiempoUltimoPanal(_tiempoDesdeUltimo(eventos, 33));
      // eslint-disable-next-line react-hooks/exhaustive-deps
        },[eventos])

    return (
        <div className="row text-center">
            <Informe title={"Biberones de hoy:"} value={biberonesHoy} tiempo={tiempoUltimoBiberon}/>
            <Informe title={"Pañales de hoy:"} value={panalesHoy} tiempo={tiempoUltimoPanal}/>
            <Agregar/>
        </div>
    )
}

export default InformeContainer