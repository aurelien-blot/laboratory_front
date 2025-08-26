
<template>
  <BasicViewComponent >
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">Welcome to the LAB !</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-4 mb-4" v-for="project in projects" >
          <button class="project-btn" @click="goTo(project)"
                  :disabled="project.needConnection==true && isConnectedToApi!=true">
            <b class="">{{project.name}}</b>
          </button>
        </div>
      </div>
    </template>
  </BasicViewComponent>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import TestApiService from "@/laboratory/services/api/testApiService.js";

export default {
  name: 'Home',
  components: {
    BasicViewComponent
  },
  data() {
    return {
      projects :[
        {
          name: "Map generator",
          link: "/mapgen",
          needConnection: true
        },
        {
          name: "Truck Loading",
          link: "/truckloading",
          needConnection: false
        },
        {
          name: "3D Playground",
          link: "/3d",
          needConnection: false
        },
        {
          name: "Quick Mail",
          link: "/quick-mail",
          needConnection: true
        },
        {
          name: "Fake Profile",
          link: "/fake-profile",
          needConnection: true
        }
      ],
      isConnectedToApi: false,
      timeOut : 1000
    }

  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {

  },
  methods: {
    ...mapActions(['setLoading']),
    goTo(project){
      this.$router.push(project.link);
    },
    async testConnection(){
      this.setLoading(true);
      this.isConnectedToApi = false;
      let that = this;
      await TestApiService.testConnection(that.timeOut).then((results) => {
        that.isConnectedToApi=results;
      }).catch((error) => {
        that.isConnectedToApi=false;
      });
      await this.setLoading(false);
      console.log(that.isConnectedToApi);
    }
  },
  mounted() {
    this.testConnection();
  }
}

</script>
<style scoped>
  .project-btn {
    cursor: pointer;
    padding: 20px 20px;
    display: inline-block;
    border-radius: 20px; /* Pour les bords arrondis */
    width: 180px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-align: center;
    background: linear-gradient(90deg, #a06cf2, #ff57b9, #72d8ff); /* Dégradé */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Ombre légère */
    border: none;
    color: #D7DDE3;
  }

  .project-btn:disabled {
    background:  linear-gradient(90deg, #a6a6a6, #a6a6a6, #a6a6a6);
    color: grey;

  }

</style>