<template>
  <BasicViewComponent>
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">3D Playground</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>

      </div>


    </template>
  </BasicViewComponent>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import FakeProfileApiservice from "@/fake_profile/services/api/fakeProfileApiservice.js";
import StableDiffusionApiService from "@/fake_profile/services/api/stableDiffusionApiService.js";

export default {
  name: 'FakeProfileHome',
  components: {
    BasicViewComponent
  },
  data() {
    return {
      request :{

      }
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {},
  methods: {
    ...mapActions(['setLoading']),
    async generate() {
      this.setLoading(true);
      await StableDiffusionApiService.generate(this.request);
      this.setLoading(false);
    },
  }
  ,
  mounted() {
  }
}

</script>