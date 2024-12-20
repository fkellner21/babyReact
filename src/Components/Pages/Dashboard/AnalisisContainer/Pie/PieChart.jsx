import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const PieChart = () => {
    const eventos = useSelector((store)=>store.eventosSlice.eventos);
    const _getCantidades=()=>{
        const comida =  eventos.filter((ev)=>ev.idCategoria===31).length;
        const paseo =  eventos.filter((ev)=>ev.idCategoria===32).length;
        const panal =  eventos.filter((ev)=>ev.idCategoria===33).length;
        const sueno =  eventos.filter((ev)=>ev.idCategoria===34).length;
        const biberon = eventos.filter((ev)=>ev.idCategoria===35).length;
        const juego = eventos.filter((ev)=>ev.idCategoria===36).length;
        let totales = [];
        let  labels = [];
        if (comida!==0){
            totales.push(comida);
            labels.push("comida")
        };
        if (paseo!==0){
            totales.push(paseo);
            labels.push("paseo")
        };        
        if (panal!==0){
            totales.push(panal);
            labels.push("pañal")
        };        
        if (sueno!==0){
            totales.push(sueno);
            labels.push("sueño")
        };        
        if (biberon!==0){
            totales.push(biberon);
            labels.push("biberon")
        };        
        if (juego!==0){
            totales.push(juego);
            labels.push("juego")
        };
        return({totales,labels})
    }

  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      series: _getCantidades().totales,
      options: { ...chartData.options, labels: _getCantidades().labels },
    });
  },[eventos]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
