<template>
  <div class="modal-overlay"></div>
  <div class="modal custom-modal" :class="customClass">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="btn-close" @click="onClose()"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <img :src="picture" alt="Image Popup" v-if="picture!=null">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullScreenPictureModalComponent',
  props:{
    onClose: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    customClass:{
      type: String,
      required: false
    },
    picture: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.custom-modal{
  display: block !important;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1040; /* Assurez-vous que cet indice est inférieur à celui de la modale pour que la modale apparaisse au-dessus. */
}
</style>
