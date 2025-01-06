<template>
  <BasicViewComponent >
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">Chargement de camion</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-6 ">
          <SettingsComponent @update:executeTruckLoading="executeTruckLoading"/>
        </div>
        <div class="col-6 ">
          <TruckDrawComponent :loadingList="loadingList" :initialTruck="truck" />
        </div>
      </div>

    </template>
  </BasicViewComponent>
</template>

<script>

import {mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import SettingsComponent from "@/truck_loading/components/SettingsComponent.vue";
import TruckDrawComponent from "@/truck_loading/components/TruckDrawComponent.vue";
import LoadingService from "@/truck_loading/services/loadingService.js";

export default {
  name: 'TruckLoadingHome',
  components: {
    TruckDrawComponent,
    SettingsComponent,
    BasicViewComponent
  },
  data() {
    return {
      loadingList: [],
      truck: {
        width: 2450,
        height: 2600,
        depth: 13400,
        computedWidth: 0,
        computedHeight: 0,
        computedDepth: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {

  },
  methods: {
    executeTruckLoading(value) {
      this.loadingList=LoadingService.process(value.loadingList, this.truck);
    }
  },
  mounted() {
  }
}

</script>