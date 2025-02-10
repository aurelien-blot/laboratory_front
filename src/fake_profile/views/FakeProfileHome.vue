<template>
  <BasicViewComponent>
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">Fake Profile</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="row">
            <button class="col-2 btn btn-primary" @click="generate">Générer</button>
          </div>
          <ImageTypeComponent></ImageTypeComponent>

        </div>
        <div class="col-6">
          <table class="table table-striped table-bordered table-sm">
            <thead>
              <tr>
                <th>Template</th>
                <th>Lien</th>
                <th>Seed</th>
                <th>Subseed</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="generatedImage in generatedImageList" :key="generatedImage.id">
                <td>{{generatedImage.templateTitle}}</td>
                <td>{{generatedImage.fileName}}</td>
                <td>{{generatedImage.seedUsed}}</td>
                <td>{{generatedImage.subseedUsed}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </template>
  </BasicViewComponent>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import StableDiffusionApiService from "@/fake_profile/services/api/stableDiffusionApiService.js";
import ErrorService from "@/laboratory/services/errorService.js";
import GeneratedImageApiService from "@/fake_profile/services/api/generatedImageApiService.js";
import ImageTypeComponent from "@/fake_profile/components/ImageTypeComponent.vue";

export default {
  name: 'FakeProfileHome',
  components: {
    ImageTypeComponent,
    BasicViewComponent
  },
  data() {
    return {
      request :{
      },
      generatedImageList: [],

      modelList: [],
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {},
  methods: {
    ...mapActions(['setLoading']),
    async generate() {
      let that = this;
      this.setLoading(true);
      await StableDiffusionApiService.generate(this.request).then(() => {
        that.loadGeneratedImageList();
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
    async loadGeneratedImageList() {
      let that = this;
      this.setLoading(true);
      await GeneratedImageApiService.selectAll().then((results) => {
        that.generatedImageList = results;
        console.log(results);
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    }
  }
  ,
  mounted() {
    this.loadGeneratedImageList();
  }
}

</script>