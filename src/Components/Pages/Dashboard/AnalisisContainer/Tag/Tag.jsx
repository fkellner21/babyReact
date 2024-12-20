import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./TagColor.css"

const Tag=()=>{
    const eventos = useSelector((store)=>store.eventosSlice.eventos);
    const[color, setColor]=useState("Tag-ok")
    const[proximoBiberon, setProximoBiberon]=useState("")

    const _getProxBiberon=(ultimoObjeto)=>{
        if(ultimoObjeto){
            const desde = new Date(ultimoObjeto.fecha);
            const ahora = new Date();
            const diferencia = ahora.getTime() - desde.getTime();//el resultado es en milisegundos
            if (diferencia>(4*60*60*1000)){
                setColor("Tag-danger");
                return `Ya es hora de darle de comer, la ultima vez fue hace mas de 4 horas`
            }else{
                setColor("Tag-ok")
                const horas =3- Math.floor(diferencia/(3600000));
                const minutos =60- Math.floor((diferencia%3600000)/60000)
                return `Faltan ${horas} horas y ${minutos} minutos para el proximo biberon`
            }
        }else{
            setColor("Tag-ok")
            return `No hay registros hasta el momento`
        }

    };
    useEffect(()=>{
        const biberones = eventos.filter((ev)=>ev.idCategoria===35)
            // Encontrar el objeto más reciente
        const ultimoObjeto = biberones.reduce((ultimo, actual) => {
        return new Date(actual.fecha) > new Date(ultimo.fecha) ? actual : ultimo;
        },biberones[0]);
        setProximoBiberon(_getProxBiberon(ultimoObjeto));
    },[eventos]);
    
    return(
        <div className={`card stats-info ${color}`} >
        <div className="card-body">
        <h3>Proximo Biberon en: </h3>
        <h2>{proximoBiberon}</h2>
      </div>
      </div>
    )
}
export default Tag;