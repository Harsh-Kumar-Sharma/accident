<template>
    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </template>
  
  <script setup>
    import { defineComponent } from 'vue';
    import VueApexCharts from 'vue-apexcharts';
  
    const series = [
      {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      },
      {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }
    ];
  
    const chartOptions = {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        },
        labels: {
          formatter: (val) => "$ " + val + " thousands"
        }
      },
      tooltip: {
        y: {
          formatter: (val) => "$ " + val + " thousands"
        }
      },
      fill: {
        opacity: 1
      },
      colors: ['#42A5F5', '#66BB6A', '#FFA726']
    };
  
    // Registering ApexCharts component globally
    defineComponent('apexchart', VueApexCharts);
  
    // Return variables directly (no need for export default in <script setup>)
    // Vue 3 Composition API automatically exports them
    return {
      series,
      chartOptions
    };
  </script>