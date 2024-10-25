<template>
  <div class="row">
    <v-form ref="form" v-model="formValid" lazy-validation>
      <div class="row">
      <v-text-field
          v-model="settings.height"
          label="Hauteur"
          type="number"
          :rules="[rules.required]"
          class="col-2"
          required
      ></v-text-field>

      <v-text-field
          v-model="settings.width"
          label="Largeur"
          type="number"
          :rules="[rules.required]"
          required
          class="col-2"
      ></v-text-field>

      <v-select
          v-model="settings.unit"
          :items="otherList.unitList"
          item-title="label"
          item-value="value"
          label="Unité"
          :rules="[rules.required]"
          required
          class="col-2"
      ></v-select>
      </div>
      <div class="row">
        <div class="col-12">Biomes</div>
      </div>
      <div class="row">
        <v-text-field v-for="(biomeSetting, index) in otherList.biomeList" :key="biomeSetting.biome.id"
                      v-model="biomeSetting.percentage"
                      :label="biomeSetting.biome.name"
                      type="number"
                      class="col-2"
        ></v-text-field>
      </div>
      <div class="row text-center mb-2">
        <div class=""><v-btn @click="generateMap" :disabled="!formValid" color="primary"  >Valider</v-btn></div>
      </div>
    </v-form>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { UNITS } from '@/map_gen/util/constants';
import MapApiService from "@/map_gen/services/api/mapApiService.js";
import ErrorService from "@/laboratory/services/errorService.js";
import BiomeApiService from "@/map_gen/services/api/biomeApiService.js";
export default {
  name: 'SettingsComponent',
  components: {
  },
  props: {
  },
  data() {
    return {
      settings :{
        height : 0,
        width : 0,
        unit : null,
        settingsBiomeList: []
      },
      otherList: {
        unitList: UNITS,
        biomeList : [],
      },
      rules: {
        required: value => !!value || 'Champ obligatoire.',
      },
      formValid : false
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
    async generateMap() {
      if (await this.$refs.form.validate()) {
        await this.setLoading(true);
        let that = this;
        that.prepareItemBeforeGenerate();
        await MapApiService.generate(this.settings).then((result) => {
          that.$emit('update:generatedMap', result);
        }).catch((error) => {
          ErrorService.showErrorInAlert(error);
        });
        await this.setLoading(false);
      }
    },
    prepareItemBeforeGenerate() {
      this.settings.settingsBiomeList = [];
      this.otherList.biomeList.forEach((biomeSetting) => {
        if(biomeSetting.percentage!=null && biomeSetting.percentage > 0){
          this.settings.settingsBiomeList.push({
            biomeId: biomeSetting.biome.id,
            percentage: biomeSetting.percentage
          });
        }
      });
      if (this.isTestMode) {
        this.settings.settingsBiomeList = [];
        this.settings.settingsBiomeList.push({biomeId: 1,percentage: 50});//Océan
        this.settings.settingsBiomeList.push({biomeId: 2,percentage: 30});//Plaine
        this.settings.settingsBiomeList.push({biomeId: 3,percentage: 10});//Forêt
        this.settings.settingsBiomeList.push({biomeId: 4,percentage: 10});//Désert
      }
    },
    async loadBiomeList() {
      this.setLoading(true);
      this.otherList.biomeList = [];
      let that = this;
      await BiomeApiService.getAll().then((results) => {
        that.prepareSettingBiomeList(results);
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      await this.setLoading(false);
    },
    prepareSettingBiomeList(elements) {
      if(elements == null || elements.length == 0){
        return;
      }
      elements.forEach((biome) => {
        this.otherList.biomeList.push({
          biome: biome,
          percentage: 0
        });
      });
    },
  },
  async mounted() {
    await this.loadBiomeList();
    if (this.isTestMode) {
      this.settings = {
        height: 600,
        width: 600,
        unit: "PIXELS"
      };
      await this.generateMap();
    }
  }
}

</script>
<style scoped>

</style>
