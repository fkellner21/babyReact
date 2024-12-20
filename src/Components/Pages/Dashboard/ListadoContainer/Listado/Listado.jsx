import { useSelector } from "react-redux";
import Fila from "./Fila/Fila";
import { useEffect, useState } from "react";

const Listado = () =>{
    const eventos = useSelector((store) => store.eventosSlice.eventos);

    const ahora = new Date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ultimaSemana = new Date();
    const [eventosUltimaSemana, setNuevos]=useState([])
    const [eventosAnteriores, setViejos]=useState([])
    ultimaSemana.setDate(ahora.getDate()-7);
    useEffect(()=>{
        setNuevos(eventos.filter((ev)=>{
          const fechaEvento = new Date(ev.fecha);
          return fechaEvento >= ultimaSemana;
        }));
        setViejos(eventos.filter((ev)=>{
          const fechaEvento = new Date(ev.fecha);
          return fechaEvento < ultimaSemana;
        }))
      },[eventos])

    return(
        <table className="table">
        <thead>
        <tr className="text-center"><td></td><td></td><h5>Ultima semana</h5></tr>
          <tr>
            <th>Categoria</th>
            <th>Id</th>
            <th>Fecha</th>
            <th>Detalle</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {eventosUltimaSemana.map(({ idCategoria, id, fecha, detalle }) => (
            <Fila
              idCategoria = {idCategoria}
              id={id}
              fecha={fecha}
              detalle={detalle}
            />
          ))}
        </tbody>
        <thead>
        <tr className="text-center"><td></td><td></td><h5>Semanas anteriores</h5></tr>
          <tr>
            <th>Categoria</th>
            <th>Id</th>
            <th>Fecha</th>
            <th>Detalle</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {eventosAnteriores.map(({ idCategoria, id, fecha, detalle }) => (
            <Fila
              idCategoria = {idCategoria}
              id={id}
              fecha={fecha}
              detalle={detalle}
            />
          ))}
        </tbody>
      </table>
    );
};
export default Listado;