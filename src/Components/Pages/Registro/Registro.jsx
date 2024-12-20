import { useEffect, useRef, useState} from "react"
import Alert from "../../ui/Alert/Alert";
import  {registerAPI}  from "./fetchRegistro.js";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../app/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";


const Registro = () =>{
    const inputUserName = useRef();
    const inputPassRef = useRef();
    const idDepartamento = useRef();
    const idCiudad = useRef();
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [btnState, setBtnState] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const navigateTo = useNavigate();
    const dispatcher = useDispatch();

    const user = useSelector((store) => store.userSlice.userLogged)


    //obtiene los departamentos
    useEffect(()=>{
        if(user){
            navigateTo("../dashboard")
        };
        fetch("https://babytracker.develotion.com/departamentos.php")
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject({
              message: "Ha ocurrido un error",
              status: res.status,
            });
          }
        })
        .then((data) => setDepartamentos(data.departamentos))
        .catch((e) => console.error(e));
    }, []);

    //obtiene las ciudades al cambiar el select de Departamentos
    const _onChangeDepartamento=()=>{
        _onHandleChange();
            fetch(`https://babytracker.develotion.com/ciudades.php?idDepartamento=${idDepartamento.current.value}`)
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              } else {
                return Promise.reject({
                  message: "Ha ocurrido un error",
                  status: res.status,
                });
              }
            })
            .then((data) => setCiudades(data.ciudades))
            .catch((e) => console.error(e));
    }

    const _incompleteForm = () =>{
        return (
            inputUserName.current.value === ""||inputPassRef.current.value === "" ||
            idDepartamento.current.value === ""||idCiudad.current.value===""
        );
    };

    const _onHandleChange =()=>{
        if(!_incompleteForm()){
            setBtnState(false);
        }else{
            setBtnState(true);
        }
    };

    const _register = async (e)=>{
        e.preventDefault();

        try{
            const data = await registerAPI(
                inputUserName.current.value, 
                inputPassRef.current.value,
                idDepartamento.current.value, 
                idCiudad.current.value
            );
            dispatcher(loginUser(data))
            navigateTo("../dashboard")
        }catch(error){
            setMensaje("Ha ocurrido un error, intenta otro nombre de usuario") 
        }
    };

    return(
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    Registro de Usuario
                </div>
                <div className="card-body">
                    <form>
                        {mensaje !== "" ? (<Alert message={mensaje} classColor={"alert-danger"}/>):("")}
                        <div className="form-group">
                            <label htmlFor="userName">Nombre de Usuario</label>
                            <input ref={inputUserName} onChange={_onHandleChange} type="text" className="form-control" id="userName" placeholder="Ingresa tu nombre de usuario"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input ref={inputPassRef} onChange={_onHandleChange} type="password" className="form-control" id="inputPassword" placeholder="Ingresa tu password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="departamento">Departamento</label>
                            <select className="form-control" ref={idDepartamento} onChange={_onChangeDepartamento}>
                                <option value="">Seleccione su Departamento</option>
                                {departamentos.map((dpto) => <option value={dpto.id} >{dpto.nombre}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ciudad">Ciudad</label>
                            <select className="form-control" ref={idCiudad} onChange={_onHandleChange}>
                                <option value="" >Seleccione su ciudad</option>
                                {ciudades.map((ciudad) => <option value={ciudad.id}>{ciudad.nombre}</option> )}
                            </select>
                        </div>
                        <button type="submit" disabled={btnState} onClick={_register} className="btn btn-primary m-3">Registrarse</button>
                        <Link to={"/login"}>Ya estas registrado? Ingresa aqui</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registro;