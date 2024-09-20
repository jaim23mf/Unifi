import { Component } from '@angular/core';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent {


  constructor(){
    this.rellenaLista();
  }

  datos = [{
    id:1,
    name:"Nome della stazine",
    metadatos:{coordenadas:{lat:61.88211, long:25.5251}, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    dati:[
      {name:"Umiditá",valores:[0,1,2,3,5,4]},
      {name:"Temperatura", valores:[0,1,2,3,4,5,6]}
    ]
  },
  {
    id:2,
    name:"Nome della stazine",
    metadatos:{coordenadas:{lat:61.88211, long:25.5251}, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    dati:[
      {name:"Umiditá",valores:[0,1,2,3,5,4]},
    ]
  },
  {
    id:3,
    name:"Nome della stazine",
    metadatos:{coordenadas:{lat:61.88211, long:25.5251}, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    dati:[
      {name:"Temperatura", valores:[0,1,2,3,4,5,6]}
    ]
  },
  {
    id:4,
    name:"Nome della stazine",
    metadatos:{coordenadas:{lat:61.88211, long:25.5251}, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    dati:[
      {name:"Umiditá",valores:[5,4]},
      {name:"Temperatura", valores:[0,11,4,3,5,5,8]}
    ]
  },{
    id:5,
    name:"Nome della stazine",
    metadatos:{coordenadas:{lat:61.88211, long:25.5251}, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    dati:[
      {name:"Umiditá",valores:[10,11,22,43,55,64]},
    ]
  },
  {
    id:6,
    name:"Nome della stazine",
    metadatos:{coordenadas:{lat:61.88211, long:25.5251}, text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    dati:[
      {name:"Umiditá",valores:[0,1,2,3,5,4]},
      {name:"Temperatura", valores:[0,1,2,3,4,5,6]}
    ]
  }
]; 

Highcharts: typeof Highcharts = Highcharts;
/*chartOptions: Highcharts.Options = {
  chart:{
    backgroundColor: 'transparent',
    type: 'spline'
  },
  title: {
    text: "",
  },
  legend:{ enabled:false },
  xAxis: {
     labels: {
      enabled: false
    },
    visible:true,
    tickAmount:0
},
  yAxis: {
    labels: {
    enabled: false
  },
  title: {
    text: ''
},
gridLineColor: '#bdbdbd',
  visible:true,
  tickAmount:5
},
  credits: {
    enabled: false,
  },
  series: [{
    data: [5,2,6,2,1, 2, 3],
    type: 'spline'
  },
  {
    data:[5,6,7],
    type:'spline'

  }
]
};*/

chartlist = [];

rellenaLista(){
  console.log(this.datos.length);
  for(let i = 0 ; i < this.datos.length;i++){
    this.chartlist.push({id:this.datos[i].id , opt:this.chardata(this.datos[i].id)});
  }
  console.log(this.chartlist);
}

chardata(id:number):Highcharts.Options{

let elem = this.datos.find((element) => element.id==id);
let serieRellena = [];

console.log(elem.dati);
console.log(id);
if(elem != undefined && elem.dati){
  for(let i=0 ; i<elem.dati.length;i++){

    let color = "#18a0fb";
    if(elem.dati[i].name == "Temperatura"){
      color = "#fb1818";
    }

    serieRellena.push({
      data: elem.dati[i].valores,
      name:elem.dati[i].name,
      color:color,
      type: 'spline'
    });
  }
}


 let chartOptions: Highcharts.Options = {
  chart:{
    backgroundColor: 'transparent',
    type: 'spline'
  },
  title: {
    text: "",
  },
  legend:{ enabled:false },
  xAxis: {
     labels: {
      enabled: false
    },
    visible:true,
    tickAmount:0
},
  yAxis: {
    labels: {
    enabled: false
  },
  title: {
    text: ''
},
gridLineColor: '#bdbdbd',
  visible:true,
  tickAmount:5
},
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
        marker: {
            enabled: false,
            states: {
                hover: {
                    enabled: false
                }
            }
        }
    }
},
  series: serieRellena
};

 return chartOptions;
}


getdata(id:Number):Highcharts.Options{
  let emptyOptions: Highcharts.Options = {
    chart:{
      backgroundColor: 'transparent',
      type: 'spline'
    },
    title: {
      text: "",
    },
    legend:{ enabled:false },
    xAxis: {
       labels: {
        enabled: false
      },
      visible:true,
      tickAmount:0
  },
    yAxis: {
      labels: {
      enabled: false
    },
    title: {
      text: ''
  },
  gridLineColor: '#bdbdbd',
    visible:true,
    tickAmount:5
  },
    credits: {
      enabled: false,
    }
  };

  let option = this.chartlist.find((elem) => elem.id == id);


  if(option != undefined && option.opt) return option.opt;
  else 
  return emptyOptions;
}

}
