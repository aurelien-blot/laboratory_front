<template>
  <div class="paramPartContent mt-1">
    <div class="row">
      <div class="col-12 text-center ">
        <span class="panelTitle">Modèle</span>
      </div>
    </div>
    <div class="row" v-if="selectedModel==null || !isNewItem">
      <div class="col-2 ">
        <button class="btn btn-primary btn-sm" @click="create"><i class="fas fa-plus"></i></button>
      </div>
      <div class="col-4">
        <v-select density="compact"
                  v-model="selectedModel"
                  :items="modelList"
                  label="Sélectionnez un modèle"
                  item-title="name"
                  item-value="id"
                  return-object
                  clearable
        ></v-select>
      </div>
      <div class="col-1" v-if="selectedModel!=null && !isNewItem">
        <button class="btn btn-primary btn-sm" @click="copyModel"><i class="fas fa-copy"></i></button>
      </div>
      <div class="col-1" v-if="selectedModel!=null && !isNewItem">
        <button class="btn btn-danger btn-sm" @click="deleteModel"><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <template v-if="selectedModel!=null">
      <Form novalidate @submit.prevent="save">
        <div class="row">
          <div class="col-3">
            <FieldComponent :field="fields.name" v-model="selectedModel.name" :disabled="!isNewItem"
                            :show-error="isNewItem"/>
          </div>
          <div class="col-9">
            <FieldComponent :field="fields.description" v-model="selectedModel.description"/>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <FieldComponent :field="fields.prompt" v-model="selectedModel.prompt"/>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <FieldComponent :field="fields.negativePrompt" v-model="selectedModel.negativePrompt"/>
          </div>
        </div>
      </Form>

      <div class="row mt-2">
        <button type="button" class="btn btn-primary btn-sm col-2 offset-3" :disabled="!canSubmit" @click="save()">
          Enregistrer
        </button>
        <button type="button" class="btn btn-secondary btn-sm col-2 offset-1" @click="resetModel()">Annuler</button>
      </div>
    </template>

  </div>

  <DeleteModalComponent :on-delete="onDeleteModel" :on-close="hideDeleteModal" v-if="showDeleteModal">
    <template v-slot:modalContent>
      <div>
        <p>Êtes-vous sûr de vouloir supprimer le modèle {{ selectedModel.name }} ?</p>
      </div>
    </template>
  </DeleteModalComponent>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ErrorService from "@/laboratory/services/errorService.js";
import ModelApiService from "@/fake_profile/services/api/modelApiService.js";
import {defineRule, Form} from 'vee-validate';
import {required} from '@vee-validate/rules';
import VeeRulesService from "@/laboratory/services/veeRulesService.js";
import {watch} from "vue";
import DeleteModalComponent from "@/laboratory/components/modal/DeleteModalComponent.vue";
import {FieldClass} from "@/laboratory/class/fieldClass.js";
import FieldComponent from "@/laboratory/components/form/FieldComponent.vue";

export default {
  name: 'ModelComponent',
  components: {
    FieldComponent,
    DeleteModalComponent,
    Form
  },
  props: {},
  data() {
    return {
      modelList: [],
      selectedModel: null,
      showDeleteModal: false,
      fields: {
        name: new FieldClass("name", "Nom", "text", null, {required: true, uniqueValue: ['name', this.modelList]}),
        description: new FieldClass("description", "Description", "text", null, {required: false}),
        prompt: new FieldClass("prompt", "Prompt", "textarea", null, {required: true}),
        negativePrompt: new FieldClass("negativePrompt", "Prompt négatif", "textarea", null, {required: false}),

      }
    }
  },
  watch: {
    selectedModel: {
      handler: function (newVal, oldVal) {
        if (newVal != null) {
          if (newVal.id != null) {
            delete this.fields.name.rules.uniqueValue;
          } else {
            this.fields.name.rules.uniqueValue = ['name', this.modelList];
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
      return this.selectedModel.id == null;
    },
    canSubmit() {
      let result = true;
      if (this.selectedModel == null) {
        result = false;
      }
      if (result) {
        for (let field in this.fields) {
          if (!this.fields[field].isValid(this.selectedModel[field])) {
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
    resetModel() {
      this.selectedModel = null;
    },
    create() {
      this.selectedModel = {
        name: null,
        description: null,
        prompt: null,
        negativePrompt: null,
      }
    },
    async save() {
      let that = this;
      this.setLoading(true);
      if (this.isNewItem) {
        await ModelApiService.create(this.selectedModel).then(async (result) => {
          await that.loadModelList();
          that.selectedModel = that.modelList.find((model) => model.name === result.name);
        }).catch((error) => {
          ErrorService.showErrorInAlert(error);
        });
      } else {
        await ModelApiService.update(this.selectedModel).then((result) => {
          that.loadModelList();
        }).catch((error) => {
          ErrorService.showErrorInAlert(error);
        });
      }
    },
    async loadModelList() {
      let that = this;
      this.setLoading(true);
      await ModelApiService.selectAll().then((results) => {
        that.modelList = results;
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
    deleteModel() {
      this.showDeleteModal = true;
    },
    copyModel() {
      this.selectedModel = Object.assign({}, this.selectedModel);
      this.selectedModel.id = null;
    },
    async onDeleteModel() {
      let that = this;
      this.setLoading(true);
      await ModelApiService.delete(this.selectedModel.id).then(() => {
        that.loadModelList();
        that.selectedModel = null;
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
    watch(() => this.modelList, (newList) => {
      VeeRulesService.defineUniqueValueRule(newList);
      that.fields.name.rules.uniqueValue = ['name', newList];
    });
  },
  async mounted() {
    await this.loadModelList();
    //TODO POUR TEST
    this.selectedModel = this.modelList[0];
  }
}

</script>
<style scoped>

</style>
