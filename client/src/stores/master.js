import { defineStore } from 'pinia';
import axios from 'axios';
import { API_ROUTES, BASE_URL } from '../constants/config';

export const masterPinaStore = defineStore('pina', {
  state: () => ({
    locationZoneData: [],
    reasonOfAccidentData: []
  }),

  actions: {
    async getLocationZone() {
      try {
        const res = await axios.get(`${BASE_URL}${API_ROUTES.LOCATION_ZONE.GET}`);
        this.locationZoneData = res.data;
      } catch (error) {
        console.error('Error fetching location zone:', error);
        throw error; // Optional: re-throw the error to propagate it
      }
    },

    async getReasonOfAccident() {
      try {
        const res = await axios.get(`${BASE_URL}${API_ROUTES.REASONS_OF_ACCIDENTS.GET}`);
        this.reasonOfAccidentData = res.data;
      } catch (error) {
        console.error('Error fetching reasons of accident:', error);
        throw error; // Optional: re-throw the error to propagate it
      }
    }
  },

  getters: {
    getLocationZoneData() {
      return this.locationZoneData;
    },

    getReasonOfAccidentData() {
      return this.reasonOfAccidentData;
    }
  }
});