<template>
  <BasicViewComponent>
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">Fake Profile</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-12 mb-3">
          <div class="finalArea">
            <Form novalidate @submit.prevent="generate">
              <div class="row ">
                <div class=" col-3">
                  <FieldComponent :field="fields.batchCount" v-model="request.batchCount"/>
                </div>
                <div class=" col-3">
                  <FieldComponent :field="fields.batchSize" v-model="request.batchSize"/>
                </div>
                <div class=" col-2 offset-4 mt-3">
                  <button class=" btn btn-primary" @click="generate" :disabled="!canGenerate">Générer</button>
                </div>
              </div>
            </Form>
          </div>
          <ModelComponent
              @update:isValid="isModelValid = $event"
              @update:entity="request.model = $event"

          />
          <ImageTypeComponent
              @update:isValid="isImageTypeValid = $event"
              @update:entity="request.imageType = $event"
          />
        </div>
        <div class="col-lg-6 col-md-12 mb-3">
          <table class="table table-striped table-bordered table-sm">
            <thead>
            <tr>
              <th>Template</th>
              <th>Lien</th>
              <th>Seed</th>
              <th>Subseed</th>
              <th class="text-center"><i class="fas fa-trash"></i></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(generatedImage, index) in generatedImageList" :key="generatedImage.id">
              <td>{{ generatedImage.templateTitle }}</td>
              <td @click="showPicture(index)" class="hover">{{ generatedImage.fileName }}</td>
              <td>{{ generatedImage.seedUsed }}</td>
              <td>{{ generatedImage.subseedUsed }}</td>
              <td class="text-center">
                <button class="btn btn-danger btn-sm" @click="deleteGeneratedImage(generatedImage.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>


    </template>
  </BasicViewComponent>

  <FullScreenPictureModalComponent v-if="showPictureModal " title="Aperçu de l'image"
                                   :picture-list="generatedImageList"
                                   :index-init="viewedPictureIndex"
                                   loading-key="id"
                                   :on-close="hidePictureModal"
                                   :loading-method="loadPicture"/>

</template>

<script>

import {mapActions, mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import ErrorService from "@/laboratory/services/errorService.js";
import GeneratedImageApiService from "@/fake_profile/services/api/generatedImageApiService.js";
import ImageTypeComponent from "@/fake_profile/components/ImageTypeComponent.vue";
import ModelComponent from "@/fake_profile/components/ModelComponent.vue";
import FieldComponent from "@/laboratory/components/form/FieldComponent.vue";
import {FieldClass} from "@/laboratory/class/fieldClass.js";
import { Form} from 'vee-validate';
import StableDiffusionApiService from "@/fake_profile/services/api/stableDiffusionApiService.js";
import BasicModalComponent from "@/laboratory/components/modal/BasicModalComponent.vue";
import FullScreenPictureModalComponent from "@/laboratory/components/modal/FullScreenPictureModalComponent.vue";

export default {
  name: 'FakeProfileHome',
  components: {
    FullScreenPictureModalComponent,
    BasicModalComponent,
    FieldComponent,
    ModelComponent,
    ImageTypeComponent,
    BasicViewComponent,
    Form
  },
  data() {
    return {
      request: {
        imageType: null,
        model: null,
        batchSize: 1,
        batchCount: 1,
      },
      isModelValid: false,
      isImageTypeValid: false,
      generatedImageList: [],
      fields: {
        batchCount: new FieldClass("batchCount", "Batch Count", "number", 1, {
          required: true,
          integer: true,
          between: [1, 10]
        }),
        batchSize: new FieldClass("batchSize", "Batch Size", "number", 1, {
          required: true,
          integer: true,
          between: [1, 8]
        }),
      },
      showPictureModal: false,
      viewedPictureIndex: null,
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
    canGenerate() {
      for (let field in this.fields) {
        if (!this.fields[field].isValid(this.request[field])) {
          return false;
        }
      }
      return this.request.imageType != null && this.request.model != null && this.isModelValid && this.isImageTypeValid;
    },
  },
  watch: {
    //watcher pour request.model.name, on recharge la liste des images générées
    'request.model.name': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.request.model == null || this.request.model.id != null) {
          this.loadGeneratedImageList();
        } else {
          this.generatedImageList = [];
        }
      }
    }
  },
  methods: {
    ...mapActions(['setLoading']),
    async generate() {
      let that = this;
      let request = this.formatForRequest();
      this.setLoading(true);
      await StableDiffusionApiService.generate(request, that.request.model.name).then(() => {
        that.loadGeneratedImageList();
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
    formatForRequest() {
      return {
        prompt: this.request.model.prompt,
        negative_prompt: this.request.model.negativePrompt,
        seed: this.request.imageType.seed,
        subseed: this.request.imageType.subseed,
        subseed_strength: this.request.imageType.subseedStrength,
        width: this.request.imageType.width,
        height: this.request.imageType.height,
        sampler_name: this.request.imageType.samplerName,
        cfg_scale: this.request.imageType.cfgScale,
        steps: this.request.imageType.steps,
        batch_count: this.request.batchCount,
        batch_size: this.request.batchSize,
        restore_faces: this.request.imageType.restoreFaces,
        face_restoration_model: this.request.imageType.faceRestorationModel,
        sd_model_checkpoint: this.request.imageType.sdModelCheckpoint,
        denoising_strength: this.request.imageType.denoisingStrength,
        override_settings: {
          sd_model_checkpoint: this.request.imageType.sdModelCheckpoint
        },
        extra_generation_params: {
          "Schedule type": "Karras"
        }
      }
    },
    async loadGeneratedImageList() {
      let that = this;
      let templateTitle = null;
      if (this.request.model != null && this.request.model.id != null) {
        templateTitle = this.request.model.name;
      }
      this.setLoading(true);
      await GeneratedImageApiService.selectAll(templateTitle).then((results) => {
        that.generatedImageList = results;
        //Tri par creationTime desc
        that.generatedImageList.sort((a, b) => {
          return new Date(b.creationTime) - new Date(a.creationTime);
        });
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
    async showPicture(generatedImageIndex) {
      this.viewedPictureIndex = generatedImageIndex;
      this.setLoading(true);
      this.showPictureModal = true;
      this.setLoading(false);
    },
    async loadPicture(id) {
      let picture = await GeneratedImageApiService.loadPicture(id);
      let currentPicture = this.generatedImageList.find((element) => element.id === id);
      if (!currentPicture) {
        ErrorService.showErrorInAlert("Impossible de trouver l'image");
      }
      let title = currentPicture.templateTitle + " : " + currentPicture.fileName + " - Seed : " + currentPicture.seedUsed + " - Subseed : " + currentPicture.subseedUsed;

      return {
        title: title,
        base64: `data:image/png;base64,${picture.base64Image}`,
      };
    },
    hidePictureModal() {
      this.showPictureModal = false;
      this.viewedPictureIndex = null;
    },
    async deleteGeneratedImage(id) {
      let that = this;
      this.setLoading(true);
      await GeneratedImageApiService.delete(id).then(() => {
        that.loadGeneratedImageList();
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
<style>
.paramPartContent {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.paramPartContent .panelTitle {
  font-size: 1.5em;
  font-weight: bold;
}

.finalArea {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>