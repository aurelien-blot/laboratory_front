
<template>
  <BasicViewComponent >
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1>Laboratoire</h1>
        </div>
        <div class="col-12">
          <ul>
            <li>
              <router-link to="/mapgen">Map generator</router-link>
            </li>
            <li>
              <router-link to="/truckloading">Truck Loading</router-link>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </BasicViewComponent>
</template>

<script>

import {mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";

export default {
  name: 'Home',
  components: {
    BasicViewComponent
  },
  data() {

  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {

  },
  methods: {

  },
  mounted() {
  }
}

</script>