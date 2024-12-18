<template>
  <!-- from data -->
  <CRow>
    <CRow>
      <CCol class="d-flex justify-content-end">
        <CButton
          color="primary"
          @click="
            () => {
              filterModal = true;
            }
          "
          >Filter</CButton
        >
      </CCol>
    </CRow>
    <CModal
      :visible="filterModal"
      @close="
        () => {
          filterModal = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">Filter From</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormInput v-model="fromDate" type="date" label="From Date" />
            </CForm>
          </CCol>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormInput v-model="toDate" type="date" label="To Date" />
            </CForm>
          </CCol>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormSelect
                label="Reason Of Accident"
                v-model="reasonOfAccident"
                :options="reasonOptions"
              />
            </CForm>
          </CCol>
          <CCol :md="6" class="mb-4">
            <CForm>
              <CFormSelect
                label="Location Zone"
                v-model="locationZone"
                :options="locationZoneData"
              />
            </CForm>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" @click="reset"> reset </CButton>
        <CButton color="primary" @click="Search">Search</CButton>
      </CModalFooter>
    </CModal>
  </CRow>
  <CRow class="mt-2">
    <CCol :md="3" class="mb-4">
      <CCard color="success" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Accident</CCardTitle>
          <CCardText>{{ apiData ? apiData.cardData.total_accident : "N/A" }}</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="3" class="mb-4">
      <CCard color="danger" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Fatal Injury</CCardTitle>
          <CCardText>{{ apiData ? apiData.cardData.fatal_injury : "N/A" }}</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="3" class="mb-4">
      <CCard color="warning" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Major Injury</CCardTitle>
          <CCardText>{{ apiData ? apiData.cardData.major_injury : "N/A" }}</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="3" class="mb-4">
      <CCard color="primary" text-color="white" class="mb-3" style="max-width: 18rem">
        <CCardBody>
          <CCardTitle>Total Minor Injury</CCardTitle>
          <CCardText>{{ apiData ? apiData.cardData.minor_injury : "N/A" }}</CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- Dashboard design -->
  <CRow class="mt-2">
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Accident By Month</CCardHeader>
        <CCardBody>
          <CChartBar :data="data" />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>No. Of Persons Injured</CCardHeader>
        <CCardBody>
          <CChartBar :data="chartData" />
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Source of Information - Top 5</CCardHeader>
        <CCardBody>
          <CChartBar :data="sourceOfInformationChartData" />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Reasons for Accidents</CCardHeader>
        <CCardBody>
          <CChartBar :data="reasonOfAccidentsChartData" />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="12" class="mb-4">
      <CCard>
        <CCardHeader>Average Response Times (RPV, Ambulance, Recovery)</CCardHeader>
        <CCardBody>
          <CChartLine :data="avgResponseTimeChartData" />
        </CCardBody>
      </CCard>
    </CCol>

    <CCol :md="12" class="mb-4">
      <CCard>
        <CCardHeader>Accidents by Time of the Day</CCardHeader>
        <CCardBody>
          <CChartBar :data="timesOfTheDayChartData" />
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :md="12" class="mb-4">
      <CCard>
        <CCardHeader>Accidents by Location Zone</CCardHeader>
        <CCardBody>
          <CChartBar :data="locationZoneChartData" />
        </CCardBody>
      </CCard>
    </CCol>

      <CCol :md="6" class="mb-4">
      <CCard>
        <CCardHeader>Accidents by Direction</CCardHeader>
        <CCardBody>
          <CChartPie :data="directionChartData" />
        </CCardBody>
      </CCard>
    </CCol>

  </CRow>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { masterPinaStore } from "@/stores/master";
import axios from "axios";
import { BASE_URL, API_ROUTES } from "@/constants/config.js";
import Swal from "sweetalert2";
import { CChartBar, CChartLine, CChartPie } from "@coreui/vue-chartjs";

const masterStore = masterPinaStore();
const filterModal = ref(false);
const fromDate = ref("");
const toDate = ref("");
const locationZone = ref("");
const reasonOfAccident = ref("");
const reasonData = ref([]);
const locationZoneData = ref([]);
const apiData = ref(null);
const sumInjury = ref([]);
const chartData = ref(null);
const data = ref(null);
const reasonOptions = ref([]);
const reasonOfAccidentsChartData = ref({});
const sourceOfInformationChartData = ref({});
const directionChartData = ref({});
const avgResponseTimeChartData = ref({});
const locationZoneChartData = ref({});
const timesOfTheDayChartData = ref({});
const reset = () => {
  fromDate.value = "";
  toDate.value = "";
  locationZone.value = "";
  reasonOfAccident.value = "";
};

const Search = async () => {
  try {
    const res = await axios.post(`${BASE_URL}${API_ROUTES.Graph.DASHBOARD}`, {
      fromDate: fromDate.value,
      toDate: toDate.value,
      locationZone: locationZone.value,
      reasonOfAccident: reasonOfAccident.value,
    });

    apiData.value = res.data;
    sumInjury.value = res.data.sumInjury || [];

    if (sumInjury.value.length > 0) {
      chartData.value = {
        labels: sumInjury.value.map((item) => {
          // Convert accident_month to full month name (e.g., '01' -> 'January')
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          return monthNames[parseInt(item.accident_month) - 1];
        }),
        datasets: [
          {
            label: "Fatal",
            backgroundColor: "#FF4545",
            data: sumInjury.value.map((item) => parseInt(item.fatal_injury)),
          },
          {
            label: "Major",
            backgroundColor: "#FCC737",
            data: sumInjury.value.map((item) => parseInt(item.major_injury)),
          },
          {
            label: "Minor",
            backgroundColor: "#0A3981",
            data: sumInjury.value.map((item) => parseInt(item.minor_injury)),
          },
        ],
      };
    }

    data.value = {
      labels: res.data.CountData.map((item) => {
        // Map month number to full month name
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return months[parseInt(item.accident_month) - 1]; // Adjusting 1-based month index
      }),
      datasets: [
        {
          label: "Monthly Count",
          backgroundColor: "#55679C",
          data: res.data.CountData.map((item) => item.CountData),
        },
      ],
    };
    sourceOfInformationChartData.value = {
      labels: res.data.sourceOfInformation.map((item) => item.source_of_information), // Labels for the chart (sources)
      datasets: [
        {
          label: "Accident Percentage",
          backgroundColor: ["#36A2EB", "#FF5733", "#FFB233", "#7DFF33", "#33D1FF"], // Custom colors for each source
          data: res.data.sourceOfInformation.map((item) =>
            parseFloat(item.accident_percentage)
          ), // Data for accident percentages
        },
      ],
    };
    reasonOfAccidentsChartData.value = {
      labels: res.data.reasonOfAccidents.map((item) => item.reason_of_accidents), // Labels for the chart (the reasons)
      datasets: [
        {
          label: "Accident Count",
          backgroundColor: "blue", // Color for the bars
          data: res.data.reasonOfAccidents.map((item) => item.accident_count), // Data for accident counts
        },
      ],
    };

    directionChartData.value = {
      labels: res.data.direction.map((item) => item.direction), // Labels for the chart (LHS, RHS)
      datasets: [
        {
          label: "Accident Percentage",
          backgroundColor: ["#FF5733", "#33D1FF"], // Colors for LHS and RHS
          data: res.data.direction.map((item) => parseFloat(item.accident_percentage)), // Data for accident percentages
        },
      ],
    };
    avgResponseTimeChartData.value = {
      labels: res.data.avgResponseTime.map((item) => `Month ${item.month}`), // Labels for the months
      datasets: [
        {
          label: "RPV Response Time (ms)",
          borderColor: "#FF5733",
          backgroundColor: "rgba(255, 87, 51, 0.2)",
          data: res.data.avgResponseTime.map((item) =>
            parseFloat(item.avg_rpv_response_time)
          ), // RPV data
          fill: true,
        },
        {
          label: "Ambulance Response Time (ms)",
          borderColor: "#33D1FF",
          backgroundColor: "rgba(51, 209, 255, 0.2)",
          data: res.data.avgResponseTime.map((item) =>
            parseFloat(item.avg_ambulance_response_time)
          ), // Ambulance data
          fill: true,
        },
        {
          label: "Recovery Response Time (ms)",
          borderColor: "#28A745",
          backgroundColor: "rgba(40, 167, 69, 0.2)",
          data: res.data.avgResponseTime.map((item) =>
            parseFloat(item.avg_recovery_response_time)
          ), // Recovery data
          fill: true,
        },
      ],
    };
    locationZoneChartData.value = {
      labels: res.data.locationZone.map((item) => item.location_zone), // Labels for the location zones
      datasets: [
        {
          label: "Accident Count",
          backgroundColor: "#007bff", // Blue color for accident count bars
          data: res.data.locationZone.map((item) => item.accident_count), // Accident count data
          fill: false,
          borderColor: "#0056b3", // Darker blue for border
          borderWidth: 2,
        },
        {
          label: "Accident Percentage",
          backgroundColor: "#28a745", // Green color for accident percentage bars
          data: res.data.locationZone.map((item) => parseFloat(item.accident_percentage)), // Accident percentage data
          fill: false,
          borderColor: "#218838", // Darker green for border
          borderWidth: 2,
          yAxisID: "percentageAxis", // Use a secondary Y-axis for percentage
        },
      ],
    };
    timesOfTheDayChartData.value = {
      labels: res.data.timesOfTheDay.map((item) => item.times_of_the_day), // Labels for the times of the day
      datasets: [
        {
          label: "Accident Count",
          backgroundColor: "#007bff", // Blue color for accident count bars
          data: res.data.timesOfTheDay.map((item) => item.accident_count), // Accident count data
          fill: false,
          borderColor: "#0056b3", // Darker blue for border
          borderWidth: 2,
        },
        {
          label: "Accident Percentage",
          backgroundColor: "#6A669D", // Green color for accident percentage bars
          data: res.data.timesOfTheDay.map((item) =>
            parseFloat(item.accident_percentage)
          ), // Accident percentage data
          fill: false,
          borderColor: "#1C325B", // Darker green for border
          borderWidth: 2,
          yAxisID: "percentageAxis", // Use a secondary Y-axis for percentage
        },
      ],
    };
    if (filterModal.value) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Data filtered successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // Close the modal after the search
    filterModal.value = false;
  } catch (error) {
    console.log(error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error filtering data!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

// Fetch reason of accidents
const getReasonOfAccident = async () => {
  try {
    const res = await axios.get(`${BASE_URL}${API_ROUTES.reasonOfAccident.get}`);
    reasonOptions.value = [{ label: "Select menu", value: "" }];
    res.data.data.forEach((val) => {
      reasonOptions.value.push({
        label: val.reasons_of_accidents,
        value: val.reasons_of_accidents,
      });
    });
  } catch (error) {
    Swal.fire({ icon: "error", title: "Error", text: error.response.data.message });
  }
};

onMounted(async () => {
  locationZoneData.value = [
    { label: "Select menu", value: "" },
    { label: "KM 0-10", value: "KM 0-10" },
    { label: "KM 10-20", value: "KM 10-20" },
    { label: "KM 20-30", value: "KM 20-30" },
    { label: "KM 30-40", value: "KM 30-40" },
    { label: "KM 40-50", value: "KM 40-50" },
    { label: "KM 50-60", value: "KM 50-60" },
    { label: "KM 60-70", value: "KM 60-70" },
    { label: "KM 70-80", value: "KM 70-80" },
    { label: "KM 80-90", value: "KM 80-90" },
    { label: "KM 90-100", value: "KM 90-100" },
    { label: "KM 100-110", value: "KM 100-110" },
    { label: "KM 110-120", value: "KM 110-120" },
  ];
  Search();
  getReasonOfAccident();
});
</script>
