<template>
  <div class="modal custom-modal" :class="customClass">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ picture.title }}</h5>
          <button type="button" class="btn-close mr-2" @click="onClose()"></button>
        </div>
        <!--        <div class="text-center mt-1">
                  <div v-if="!isPreviousDisabled"><button type="button" class="btn btn-primary" @click="loadFirstPicture">Premier</button></div>
                  <div v-if="!isPreviousDisabled"><button type="button" class="btn btn-primary" @click="loadPreviousPicture">Précédent</button></div>

                  <img :src="picture.base64" :alt="picture.title" class="responsive-image" v-if="picture!=null">
                  <div v-if="!isNextDisabled"><button type="button" class="btn btn-primary" @click="loadNextPicture">Suivant</button></div>
                  <div v-if="!isNextDisabled"><button type="button" class="btn btn-primary" @click="loadLastPicture">Dernier</button></div>
                </div>-->
        <div class="text-center mt-1 position-relative">
          <img :src="picture.base64" alt="Image Popup" class="responsive-image" v-if="picture!=null">

          <div v-if="!isPreviousDisabled" class="button-left">
            <button type="button" class="btn btn-icon" @click="loadFirstPicture">
              <i class="fas fa-fast-backward"></i>
            </button>
            <button type="button" class="btn btn-icon" @click="loadPreviousPicture">
              <i class="fas fa-chevron-left"></i>
            </button>
          </div>

          <div v-if="!isNextDisabled" class="button-right">
            <button type="button" class="btn btn-icon" @click="loadNextPicture">
              <i class="fas fa-chevron-right"></i>
            </button>
            <button type="button" class="btn btn-icon" @click="loadLastPicture">
              <i class="fas fa-fast-forward"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'FullScreenPictureModalComponent',
  props: {
    onClose: {
      type: Function,
      required: true
    },
    customClass: {
      type: String,
      required: false
    },
    loadingMethod: {
      type: Function,
      required: true
    },
    pictureList: {
      type: Array,
      required: true
    },
    indexInit: {
      type: Number,
      required: false,
      default: 0
    },
    loadingKey: {
      type: String,
      required: true
    }

  },
  data() {
    return {
      picture: {
        title: "Chargement",
        base64: null
      },
      currentIndex: this.indexInit
    }
  },
  computed: {
    isPreviousDisabled() {
      return this.currentIndex === 0;
    },
    isNextDisabled() {
      return this.currentIndex === this.pictureList.length - 1;
    }
  },
  methods: {
    ...mapActions(['setLoading']),
    async loadPicture() {
      let that = this;
      let pictureObject = this.pictureList[this.currentIndex];
      that.setLoading(true);
      await that.loadingMethod(pictureObject[that.loadingKey]).then((response) => {
        that.picture = response;
      }).catch((error) => {
        console.error(error);
      });
      that.setLoading(false);
    },
    loadFirstPicture() {
      this.currentIndex = 0;
      this.loadPicture();
    },
    loadPreviousPicture() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.loadPicture();
      }
    },
    loadLastPicture() {
      this.currentIndex = this.pictureList.length - 1;
      this.loadPicture();
    },
    loadNextPicture() {
      if (this.currentIndex < this.pictureList.length - 1) {
        this.currentIndex++;
        this.loadPicture();
      }
    },
    handleKeyDown(event) {
      if (event.key === 'ArrowLeft' && !this.isPreviousDisabled) {
        this.loadPreviousPicture();
      } else if (event.key === 'ArrowRight' && !this.isNextDisabled) {
        this.loadNextPicture();
      } else if (event.key === 'Escape') {
        this.onClose();
      }
    },

  },
  mounted() {
    this.loadPicture();
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    // Nettoyer l'écouteur d'événement
    document.removeEventListener('keydown', this.handleKeyDown);
  },
}
</script>

<style scoped>

.modal .modal-content {
  position: relative;
  overflow: hidden;
}


.responsive-image {
  max-width: 80%;
  max-height: 80%;
  display: block;
  margin: auto;
}
.button-left, .button-right {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1050; /* S'assurer que les boutons sont au-dessus de la modal */
}

.button-left {
  left: 10px;
}

.button-right {
  right: 10px;
}

.btn-icon {
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 50%;
  font-size: 20px;
}

.btn-icon i {
  color: #666;
}

.btn-icon:hover {
  background-color: #ddd;
}

.btn-icon:focus {
  outline: none;
}
</style>
