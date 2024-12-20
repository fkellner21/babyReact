import Listado from "./Listado/Listado";

const ListadoContainer = () =>{
    return(
        <div className="row my-3">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="text-center">Lista de eventos registrados</h5>
              <Listado />
            </div>
          </div>
        </div>
      </div>
    );
};

export default ListadoContainer;