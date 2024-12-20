const Informe = ({ title, value, tiempo }) => {


    return (
      <div className="col-md-4">
        <div className="card stats-info">
          <div className="card-body">
            <h3>{title}</h3>
            <h2>{value}</h2>
            <p>Tiempo desde el último: </p><p>{tiempo}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Informe;