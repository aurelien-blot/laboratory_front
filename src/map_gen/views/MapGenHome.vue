<template>
  <BasicViewComponent >
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1>Génération de carte</h1>
        </div>
      </div>

      <SettingsComponent @update:generatedMap="updateGeneratedMap"/>
      <MapComponent v-if="generatedMap!=null"
                    :generated-map="generatedMap"
      />
    </template>
  </BasicViewComponent>
</template>

<script>

import {mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import SettingsComponent from "@/map_gen/components/SettingsComponent.vue";
import MapComponent from "@/map_gen/components/MapComponent.vue";
export default {
  name: 'MapGenHome',
  components: {
    MapComponent,
    SettingsComponent,
    BasicViewComponent
  },
  data() {
    return {
      generatedMap: null,
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {

  },
  methods: {
    updateGeneratedMap(value) {
      this.generatedMap = value;
    }

  },
  mounted() {
  }
}

</script>