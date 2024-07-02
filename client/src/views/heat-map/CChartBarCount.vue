<template>
  <CChartBar :data="data" />
</template>

<script setup>
import { CChartBar } from '@coreui/vue-chartjs'

const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Monthly Count',
      backgroundColor: 'blue',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 12],
    },
  ],
}
</script>

