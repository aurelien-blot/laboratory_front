<template>
  <div class="row" >
    <table class="col-12 table table-bordered  table-striped table-sm ">
      <thead>
      <tr>
        <th>Numéro</th>
        <th>Largeur</th>
        <th>Hauteur</th>
        <th>Profondeur</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(loading, index) in settings.loadingList" >
          <td>{{loading.number}}</td>
<!--          <td>{{loading.width}}</td>
          <td>{{loading.height}}</td>
          <td>{{loading.depth}}</td>-->
          <td><input type="number" v-model="loading.width" class="form-control-sm"></td>
          <td><input type="number" v-model="loading.height" class="form-control-sm"></td>
          <td><input type="number" v-model="loading.depth" class="form-control-sm"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="row mt-5">
    <div class="col-12">
      <div class="col-3 offset-3 btn btn-primary " @click="addPalette">Ajouter</div>
      <div class=" col-3 offset-3  btn btn-success" @click="executeTruckLoading">Valider</div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import originalSettings from '@/truck_loading/assets/load_settings_original.json';
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
      this.settings.loadingList = originalSettings;
      this.settings.loadingList[0] ={number: 1, width: 2500, depth: 850, height: 1100};
      this.settings.loadingList[16] ={number: 17, width: 1300, depth: 800, height: 1100};
      this.settings.loadingList[18] ={number: 19, width: 500, depth: 1000, height: 900};
      this.settings.loadingList.push({number: 20, width: 500, depth: 1000, height: 900});
    },
    executeTruckLoading() {
      this.$emit('update:executeTruckLoading', this.settings);
    },
    addPalette() {
      this.settings.loadingList.push({number: this.settings.loadingList.length + 1, width: 500, depth: 1000, height: 900});
    }
  },
  async mounted() {
    this.initDatas();
    this.executeTruckLoading();
  }
}

</script>
<style scoped>

</style>
