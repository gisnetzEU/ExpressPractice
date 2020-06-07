var options = {

  chart: {
    height: 450,
    width: '100%',
    type: 'bar',
    background: '#f4f4f4',
    foreColor: '#333'

  },
  series: [{
    name: 'Tweets',
    data: null
  }],
  xaxis: {
    categories:null
  },
  plotOptions: {
    bar: {
      horizontal: false
    }
  },
  fill: {
    colors: ['#0048BA']
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: 'Trends in Belgium',
    align: 'center',
    margin: 20,
    offsetY: 20,
    style: {
      fontSize: '25px'
    }
  }
};

var chart = null;

document.querySelector('button').addEventListener('click', () => chart.updateOptions({
  plotOptions: {
    bar: {
      horizontal: true
    }
  }
}))