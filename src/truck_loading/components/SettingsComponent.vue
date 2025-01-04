<template>
  <div class="row" >
    <table class="col-12 table table-bordered  table-striped">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Largeur</th>
        <th>Hauteur</th>
        <th>Profondeur</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(loading, index) in settings.loadingList">
          <td>{{loading.number}}</td>
          <td>{{loading.width}}</td>
          <td>{{loading.height}}</td>
          <td>{{loading.depth}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row mt-5">
    <div class="col-12">
      <div class="col-3 offset-3 btn btn-primary ">Ajouter</div>
      <div class=" col-3 offset-3  btn btn-success" @click="executeTruckLoading">Valider</div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'SettingsComponent',
  components: {
  },
  props: {
  },
  data() {
    return {
      settings :{
        loadingList: [
        ]
      },
      otherList: {

      },
    }
  },
  computed: {
    ...mapGetters({
      isTestMode: 'isTestMode',
    }),
  },
  methods: {
    ...mapActions({
      setLoading: "setLoading",
    }),
    initDatas() {
      this.settings.loadingList.push({number: 1, width: 1200, depth: 850, height: 1100});
      this.settings.loadingList.push({number: 2, width: 1200, depth: 800, height: 800});
      this.settings.loadingList.push({number: 3, width: 1200, depth: 1000, height: 1700});
      this.settings.loadingList.push({number: 4, width: 1200, depth: 800, height: 970});
      this.settings.loadingList.push({number: 5, width: 1200, depth: 800, height: 1500});
      this.settings.loadingList.push({number: 6, width: 1200, depth: 800, height: 1550});
      this.settings.loadingList.push({number: 7, width: 1200, depth: 800, height: 1940});
      this.settings.loadingList.push({number: 8, width: 1200, depth: 800, height: 1620});
      this.settings.loadingList.push({number: 9, width: 1200, depth: 800, height: 1920});
      this.settings.loadingList.push({number: 10, width: 1200, depth: 800, height: 1630});
      this.settings.loadingList.push({number: 11, width: 1200, depth: 800, height: 1750});
      this.settings.loadingList.push({number: 12, width: 1200, depth: 800, height: 2230});
      this.settings.loadingList.push({number: 13, width: 1200, depth: 800, height: 1750});
      this.settings.loadingList.push({number: 14, width: 1200, depth: 800, height: 1750});
      this.settings.loadingList.push({number: 15, width: 1200, depth: 800, height: 920});
      this.settings.loadingList.push({number: 16, width: 1200, depth: 800, height: 920});
      this.settings.loadingList.push({number: 17, width: 1200, depth: 800, height: 2230});
      this.settings.loadingList.push({number: 18, width: 1200, depth: 800, height: 500});
      this.settings.loadingList.push({number: 19, width: 1200, depth: 1000, height: 900});
    },
    executeTruckLoading() {
      this.$emit('update:executeTruckLoading', this.settings);
    },
  },
  async mounted() {
    this.initDatas();
    this.executeTruckLoading();
  }
}

</script>
<style scoped>

</style>
