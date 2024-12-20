import { useSelector, useDispatch } from "react-redux"
import { onDeleteEvent } from "../../../../../../app/slices/eventosSlice"
import { eliminarEventoAPI } from "../../../fetchDashboard";

const Fila = ({idCategoria, id, fecha, detalle})=>{
    const userLogged = useSelector((store)=>store.userSlice.userLogged);
    const dispatcher = useDispatch();
    const _onDelete = async()=>{
        try{
            await eliminarEventoAPI(userLogged, id);
            dispatcher(onDeleteEvent(id));
        }catch (error){
            console.log(error);
        }
    };
    return (
        <tr>
            <td><img src={`https://babytracker.develotion.com/imgs/${idCategoria.toString()[1]}.png`} width="38px" alt={`${idCategoria}`}></img></td>
            <td>{id}</td>
            <td>{fecha}</td>
            <td>{detalle}</td>
            <td>
            <button className="btn btn-danger" onClick={_onDelete}>
                X
            </button>
            </td>
        </tr>
    );
};

export default Fila;