import { useRef, useState, useEffect } from "react";
import Alert from "../../ui/Alert/Alert";
import { loginAPI } from "./login";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../app/slices/userSlice";



const Login = () =>{
    const inputUserName = useRef();
    const inputPassRef = useRef();
    const [btnState, setBtnState] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const dispatcher = useDispatch();
    const navigateTo = useNavigate();
    const user = useSelector((store) => store.userSlice.userLogged)
    useEffect(() => {
        if(user){
            navigateTo("../dashboard")
        }
    }, []);

    const _incompleteForm = () =>{
        return (
            inputUserName.current.value === ""||inputPassRef.current.value === ""
        );
    };

    const _onHandleChange =()=>{
        if(!_incompleteForm()){
            setBtnState(false);
        }else{
            setBtnState(true);
        }
    };
    const _onLogin = async(e) =>{
        e.preventDefault();
        try{
            const data = await loginAPI(
                inputUserName.current.value,
                inputPassRef.current.value
            );
            dispatcher(loginUser(data))
            navigateTo("../dashboard");
        }catch(error){
            setMensaje("Ha ocurrido un error, intenta nuevamente")
        }
    }

    return(
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    Ingreso a la super web
                </div>
                <div className="card-body">
                    <form>
                    {mensaje !== "" ? (<Alert message={mensaje} classColor={"alert-danger"}/>):("")}
                        <div className="form-group">
                            <label htmlFor="userName">Nombre de Usuario</label>
                            <input type="text" ref={inputUserName} onChange={_onHandleChange} className="form-control" id="userName" placeholder="Ingresa tu nombre de usuario"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" ref={inputPassRef} onChange={_onHandleChange} className="form-control" id="inputPassword" placeholder="Ingresa tu password"/>
                        </div>
                        <button type="submit" onClick={_onLogin} disabled={btnState} className="btn btn-primary m-3">Ingresar</button>
                        <Link to={"/signup"}>No estas registrado? Comienza aqui</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;