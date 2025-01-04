
<template>
  <BasicViewComponent >
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1>My LAB</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-4 " v-for="project in projects" @click="goTo(project)">
          <div class="project-btn">
            <b class="">{{project.name}}</b>
          </div>
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
    return {
      projects :[
        {
          name: "Map generator",
          link: "/mapgen"
        },
        {
          name: "Truck Loading",
          link: "/truckloading"
        }
      ]
    }

  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {

  },
  methods: {
    goTo(project){
      this.$router.push(project.link);
    }
  },
  mounted() {
  }
}

</script>
<style scoped>
  .project-btn {
    cursor: pointer;
    padding: 20px 20px;
    display: inline-block;
    border-radius: 20px; /* Pour les bords arrondis */
    color: white;
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-align: center;
    background: linear-gradient(90deg, #a06cf2, #ff57b9, #72d8ff); /* Dégradé */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Ombre légère */
    border: none;
    color: #D7DDE3;
  }

  h1 {
    color: #D7DDE3;
  }
</style>