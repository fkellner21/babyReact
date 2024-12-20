import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";


const BarChart=()=>{
    const eventos = useSelector((store)=>store.eventosSlice.eventos);
    const _diaDeLaSemana=(fecha)=> {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const fechaObj = new Date(fecha);
        const dia = fechaObj.getDay();
        return diasSemana[dia];
    }
    const _getLabels=(comidasUltimaSemana)=>{
        const hoy = new Date();
        const labels = []
        const cantidades = []

        for (let index = 6; index >=0 ; index--) {
            const dia = new Date();
            dia.setDate(hoy.getDate()-index);
            dia.setHours(0,0,0,0)
            labels.push(_diaDeLaSemana(dia))
            const cantidad = comidasUltimaSemana.filter((comida)=>{
                const fechaComida = new Date(comida.fecha);
                fechaComida.setHours(0,0,0,0)
                return fechaComida.getTime()===dia.getTime();}).length;
            cantidades.push(cantidad);
        }

        return ({labels, cantidades});
    }
    const _actualizarGraf=()=>{
        const comidas = eventos.filter((ev)=>ev.idCategoria===31);
        const ahora = new Date();
        const ultimaSemana = new Date();
        ultimaSemana.setDate(ahora.getDate()-7);
        const comidasUltimaSemana = comidas.filter((ev)=>{
            const fechaComida = new Date(ev.fecha);
            return fechaComida >= ultimaSemana;
        });
        return _getLabels(comidasUltimaSemana);
    }
    const [chartData, setChartData]=useState({    
            series: [{
              name: 'Comidas',
              data: []//cantidad de comidas
            }],
            options: {
              chart: {
                height: 350,
                type: 'bar',
              },
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val ;
                },
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
              },
              
              xaxis: {
                categories: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],//dias de la semana
                position: 'top',
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                },
                crosshairs: {
                  fill: {
                    type: 'gradient',
                    gradient: {
                      colorFrom: '#D8E3F0',
                      colorTo: '#BED1E6',
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    }
                  }
                },
                tooltip: {
                  enabled: true,
                }
              },
              yaxis: {
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                  formatter: function (val) {
                    return val + " comidas";
                  }
                }
              
              },
              title: {
                text: 'Veces que comió el bebe por día',
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                  color: '#444'
                }
              }
            },
    });
    useEffect(()=>{
        setChartData({
            ...chartData,
            series:[{
                data: _actualizarGraf().cantidades
            },],
            options:{
                ...chartData.options,
                xaxis:{
                    categories: _actualizarGraf().labels
                }
            }
        });

    },[eventos]);

    return (
        <div>
        <div id="chart">
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
}

export default BarChart;