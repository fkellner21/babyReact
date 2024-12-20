import { useDispatch } from "react-redux";
import {logoutUser} from "../../../../app/slices/userSlice";


const Header=()=>{
    const dispatcher = useDispatch();
    const _onLogout = ()=>{
        dispatcher(logoutUser());
    }
    return<header className="d-flex justify-content-between"><strong>Bienvenido a registrar los movimientos de tu bebe</strong><button onClick={_onLogout} className="btn btn-primary ">Salir</button></header>
}

export default Header;