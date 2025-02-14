<template>
  <div class="paramPartContent mt-1">
    <div class="row">
      <div class="col-12 text-center ">
        <span class="panelTitle">Type d'image</span>
      </div>
    </div>
    <div class="row" v-if="selectedImageType==null || !isNewItem">
      <div class="col-2 ">
        <button class="btn btn-primary btn-sm" @click="create"><i class="fas fa-plus"></i></button>
      </div>
      <div class="col-4">
        <v-select density="compact"
                  v-model="selectedImageType"
                  :items="imageTypeList"
                  label="Sélectionnez un type d'image"
                  item-title="name"
                  item-value="id"
                  return-object
                  clearable
        ></v-select>
      </div>
      <div class="col-1" v-if="selectedImageType!=null && !isNewItem">
        <button class="btn btn-primary btn-sm" @click="copyImageType"><i class="fas fa-copy"></i></button>
      </div>
      <div class="col-1" v-if="selectedImageType!=null && !isNewItem">
        <button class="btn btn-danger btn-sm" @click="deleteImageType"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <template v-if="selectedImageType!=null">
      <div class="row">
        <div class="col-3">
          <FieldComponent :field="fields.name" v-model="selectedImageType.name" :disabled="!isNewItem"
                          :show-error="isNewItem"/>
        </div>
        <div class=" col-9">
          <FieldComponent :field="fields.description" v-model="selectedImageType.description"/>
        </div>
      </div>
      <div class="row">
        <div class=" col-4">
          <FieldComponent :field="fields.samplerName" v-model="selectedImageType.samplerName"/>
        </div>
        <div class=" col-8">
          <FieldComponent :field="fields.sdModelCheckpoint" v-model="selectedImageType.sdModelCheckpoint"/>
        </div>
      </div>
      <div class="row">
        <div class=" col-3">
          <FieldComponent :field="fields.width" v-model="selectedImageType.width"/>
        </div>
        <div class=" col-3">
          <FieldComponent :field="fields.height" v-model="selectedImageType.height"/>
        </div>
        <div class=" col-3">
          <FieldComponent :field="fields.cfgScale" v-model="selectedImageType.cfgScale"/>
        </div>
        <div class=" col-3">
          <FieldComponent :field="fields.steps" v-model="selectedImageType.steps"/>
        </div>
      </div>

      <div class="row">
        <div class=" col-3">
          <FieldComponent :field="fields.denoisingStrength" v-model="selectedImageType.denoisingStrength"/>
        </div>
        <div class=" col-3">
          <FieldComponent :field="fields.seed" v-model="selectedImageType.seed"/>
        </div>
        <div class=" col-3">
          <FieldComponent :field="fields.subseed" v-model="selectedImageType.subseed"/>
        </div>
      </div>

      <div class="row mt-2">
        <button type="button" class="btn btn-primary btn-sm col-2 offset-3" :disabled="!canSubmit" @click="save()">
          Enregistrer
        </button>
        <button type="button" class="btn btn-secondary btn-sm col-2 offset-1" @click="resetImageType()">Annuler</button>
      </div>
    </template>

  </div>
  <DeleteModalComponent :on-delete="onDeleteImageType" :on-close="hideDeleteModal" v-if="showDeleteModal">
    <template v-slot:modalContent>
      <div>
        <p>Êtes-vous sûr de vouloir supprimer le type d'image {{ selectedImageType.name }} ?</p>
      </div>
    </template>
  </DeleteModalComponent>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {defineRule} from 'vee-validate';
import {required, between, integer} from '@vee-validate/rules';
import VeeRulesService from "@/laboratory/services/veeRulesService.js";
import {watch} from "vue";
import DeleteModalComponent from "@/laboratory/components/modal/DeleteModalComponent.vue";
import ImageTypeApiService from "@/fake_profile/services/api/imageTypeApiService.js";
import ErrorService from "@/laboratory/services/errorService.js";
import {FieldClass} from "@/laboratory/class/fieldClass.js";
import FieldComponent from "@/laboratory/components/form/FieldComponent.vue";

defineRule('required', required);
defineRule('between', between);
defineRule('integer', integer);
VeeRulesService.defineDecimalRule();

export default {
  name: 'ImageTypeComponent',
  components: {
    FieldComponent,
    DeleteModalComponent,
  },
  props: {
  },
  data() {
    return {
      imageTypeList: [],
      selectedImageType: null,
      showDeleteModal: false,
      samplerList: [
        "DPM++ 2M"
      ],
      sdModelCheckpointList: [
        "realisticVisionV60B1_v51HyperVAE.safetensors",
      ],
      fields: {
        name: new FieldClass("name", "Nom", "text", null, {required: true, uniqueValue: ['name', this.imageTypeList]}),
        description: new FieldClass("description", "Description", "text", null, {required: false}),
        samplerName: new FieldClass("samplerName", "Sampler Name", "select", null, {required: true}),
        sdModelCheckpoint: new FieldClass("sdModelCheckpoint", "Model Checkpoint", "select", null, {required: true}),
        width: new FieldClass("width", "Largeur", "number", 512, {required: true, integer: true, between: [64, 2048]}),
        height: new FieldClass("height", "Hauteur", "number", 512, {
          required: true,
          integer: true,
          between: [64, 2048]
        }),
        cfgScale: new FieldClass("cfgScale", "CFG", "number", 7, {required: true, integer: true, between: [1, 30]}),
        steps: new FieldClass("steps", "Sampling Steps", "number", 20, {
          required: true,
          integer: true,
          between: [1, 150]
        }),
        denoisingStrength: new FieldClass("denoisingStrength", "DenoisingStrength", "number", 0.7, {
          required: true,
          decimal: 1,
          between: [0, 1]
        }),
        seed: new FieldClass("seed", "Seed", "number", -1, {integer: true}),
        subseed: new FieldClass("subseed", "Subseed", "number", null, {integer: true}),
      },


    }
  },
  watch: {
    selectedImageType: {
      handler: function (newVal, oldVal) {
        if (newVal != null) {
          if (newVal.id != null) {
            delete this.fields.name.rules.uniqueValue;
          } else {
            this.fields.name.rules.uniqueValue = ['name', this.imageTypeList];
          }
        }
        if (newVal !== oldVal) {
          this.$emit('update:entity', newVal);
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      isTestMode: 'isTestMode',
    }),
    isNewItem() {
      return this.selectedImageType.id == null;
    },
    canSubmit() {
      let result = true;
      if (this.selectedImageType == null) {
        result = false;
      }
      if (result) {
        for (let field in this.fields) {
          if (!this.fields[field].isValid(this.selectedImageType[field])) {
            result = false;
            break;
          }
        }
      }
      this.$emit('update:isValid', result);
      return result;
    },
  },
  methods: {
    ...mapActions({
      setLoading: "setLoading",
    }),
    initDatas() {
      this.fields.samplerName.options = this.samplerList;
      this.fields.sdModelCheckpoint.options = this.sdModelCheckpointList;
    },
    resetImageType() {
      this.selectedImageType = null;
    },
    create() {
      let that = this;
      this.selectedImageType = {
        name: null,
        description: null,
        samplerName: that.samplerList[0],
        sdModelCheckpoint: that.sdModelCheckpointList[0],
        width: null,
        height: null,
        cfgScale: null,
        steps: null,
        denoisingStrength: null,
        seed: null,
        subseed: null,
        subseedStrength :0,
        restoreFaces: false,
        faceRestorationModel: null,
      }
    },
    async save() {
      let that = this;
      this.setLoading(true);
      if (this.isNewItem) {
        await ImageTypeApiService.create(this.selectedImageType).then(async (result) => {
          await that.loadImageTypeList();
          that.selectedImageType = that.imageTypeList.find((imageType) => imageType.name === result.name);
        }).catch((error) => {
          ErrorService.showErrorInAlert(error);
        });
      } else {
        await ImageTypeApiService.update(this.selectedImageType).then((result) => {
          that.loadImageTypeList();
        }).catch((error) => {
          ErrorService.showErrorInAlert(error);
        });
      }
    },
    async loadImageTypeList() {
      let that = this;
      this.setLoading(true);
      await ImageTypeApiService.selectAll().then((results) => {
        that.imageTypeList = results;
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
    deleteImageType() {
      this.showDeleteModal = true;
    },
    copyImageType() {
      this.selectedImageType = Object.assign({}, this.selectedImageType);
      this.selectedImageType.id = null;
    },
    async onDeleteImageType() {
      let that = this;
      this.setLoading(true);
      await ImageTypeApiService.delete(this.selectedImageType.id).then(() => {
        that.loadImageTypeList();
        that.selectedImageType = null;
        that.hideDeleteModal();
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
    hideDeleteModal() {
      this.showDeleteModal = false;
    }
  },
  created() {
    let that = this;
    VeeRulesService.defineUniqueValueRule();
    watch(() => this.imageTypeList, (newList) => {
      VeeRulesService.defineUniqueValueRule(newList);
      that.fields.name.rules.uniqueValue = ['name', newList];
    });
  },
  async mounted() {
    await this.loadImageTypeList();
    this.initDatas();
    //TODO POUR TEST
    this.selectedImageType = this.imageTypeList[0];
  }
}

</script>
<style scoped>

</style>
