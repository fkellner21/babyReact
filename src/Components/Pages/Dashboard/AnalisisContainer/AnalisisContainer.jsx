import PieChart from "./Pie/PieChart";
import BarChart from "./Bar/BarChart";
import Tag from "./Tag/Tag";

const AnalisisContainer = () => {
    return(
        <div className="row my-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Cantidades por categoria: </h5>
              <div className="placeholder">
                <PieChart/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5>Comidas de la semana: </h5>
              <div className="placeholder">
                <BarChart/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
        <Tag/>
      </div>
      </div>
    )
}

export default AnalisisContainer;