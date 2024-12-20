import { useEffect, useRef, useState } from "react";
import Alert from "../../../ui/Alert/Alert";
import { saveEventAPI, fetchCategories } from "./fetchEvento";
import { onAddEvent } from "../../../../app/slices/eventosSlice";
import { useSelector, useDispatch } from "react-redux";

const Agregar = () => {
  const categoryRef = useRef();
  const dateTimeRef = useRef();
  const detailsRef = useRef();
  const submitBtnRef = useRef(); 
  const [categorias, setCategorias] = useState([]); 
  const [mensaje, setMensaje] = useState("");
  const [colorMensaje, setColorMensaje] = useState("alert-danger")
  const [btnState, setBtnState] = useState(true); 
  const dispatcher = useDispatch();
  const userLogged = useSelector((store) => store.userSlice.userLogged);

  //cargar las categorias y validar que el usuario este logueado 
  useEffect(() => {
    const loadCategories = async () => {
      if (!userLogged) {
        setMensaje("El usuario no está logueado");
        setColorMensaje("alert-danger")
        return;
      }
      try {
        const categorias = await fetchCategories(userLogged);
        if (categorias.length > 0) {
          setCategorias(categorias);
        } else {
          setMensaje("No se encontraron categorías");
        setColorMensaje("alert-danger")
        }
      } catch (error) {
        setMensaje(error.message);
        setColorMensaje("alert-danger")
      }
    };

    loadCategories();

  }, []);

  const _incompleteForm = () => {
    return (
      categoryRef.current.value === "" || 
      dateTimeRef.current.value === ""
    );
  };

  const _onHandleChange = () => {
    setBtnState(_incompleteForm());
  };
//funcion para registrar el evento 
  const _registerEvent = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        category: parseInt(categoryRef.current.value), //convertir la categoria a numero 
        dateTime: dateTimeRef.current.value || new Date().toISOString(),
        details: detailsRef.current.value,
        idUsuario: userLogged.id,
        apiKey: userLogged.apiKey,
      };
//si todo esta ok agrego el evento y limpio los campos 
      const response = await saveEventAPI(eventData);
      const nuevo = {
        id: response.idEvento,
        idCategoria: eventData.category,
        idUsuario: eventData.idUsuario,
        detalle: eventData.details,
        fecha: eventData.dateTime.replace('T', ' ')
      }
      dispatcher(onAddEvent(nuevo));
      setMensaje(response.mensaje);
      setColorMensaje("alert-success")
      categoryRef.current.value = "";
      dateTimeRef.current.value = "";
      detailsRef.current.value = "";
    } catch (error) {
      setMensaje("Ha ocurrido un error al registrar el evento: ");
      setColorMensaje("alert-danger")
    }
  };

    return(
        <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          Registrar Evento
        </div>
        <div className="card-body">
          <form>
            {mensaje && (<Alert message={mensaje} classColor={colorMensaje}/>)}
            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select className="form-control" ref={categoryRef} onChange={_onHandleChange}>
                <option value="">Seleccione una categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.tipo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateTime">Fecha y Hora</label>
              <input type="datetime-local" max={new Date().toISOString().slice(0, 16)}  className="form-control" ref={dateTimeRef} onChange={_onHandleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="details">Detalles (opcional)</label>
              <input type="text" className="form-control" ref={detailsRef} placeholder="Detalles del evento" onChange={_onHandleChange} />
            </div>
            <button type="submit" disabled={btnState} ref={submitBtnRef} onClick={_registerEvent} className="btn btn-primary m-3">
              Registrar Evento
            </button>
          </form>
        </div>
      </div>
      </div>
    )
}
export default Agregar