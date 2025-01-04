<template>
  <div class="row">
    <div class="col-12 text-center">Dessin</div>
    <div class="col-12 text-center mt-5" >
      <canvas ref="truckCanvas" :width="122.5" :height="670" style="border: 1px solid black;"></canvas>
    </div>

  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ColorService from "@/laboratory/services/colorService.js";
export default {
  name: 'TruckDrawComponent',
  components: {
  },
  props: {
    loadingList : {
      type: Array,
      default: []
    },
    initialTruck: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      reductionFactor: 20,
      truck : {},
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
    drawTruck() {
      const canvas = this.$refs.truckCanvas;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Impossible d'obtenir le contexte du canevas");
        return;
      }

      // Nettoyer le canevas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dessiner les limites du camion

      console.log( canvas.width)
      console.log( canvas.height)
      // Dessiner chaque palette
      this.loadingList.forEach((layer) => {
        layer.items.forEach((palette) => {
          const x = palette.x / this.reductionFactor; // Position horizontale
          const y = palette.y / this.reductionFactor; // Position verticale
          const width = palette.width / this.reductionFactor; // Largeur palette
          const height = palette.depth / this.reductionFactor; // Profondeur palette

          // Dessiner la palette
          //ctx.fillStyle = "rgba(0, 120, 255, 0.7)";
          ctx.fillStyle = ColorService.generateRandomColor();
          ctx.fillRect(x, y, width, height);

          // Ajouter le numéro de la palette
          ctx.fillStyle = "black";
          ctx.font = "12px Arial";
          ctx.fillText(`#${palette.number}`, x + 5, y + 15);

          ctx.fillStyle = "white";
          ctx.font = "12px Arial";
          ctx.fillText(`#${palette.number}`, x + 5, y + 30);
        });
      });
    },
    applyTruckReduction() {
      this.truck.computedWidth = this.truck.width/this.reductionFactor;
      this.truck.computedHeight = this.truck.height/this.reductionFactor;
      this.truck.computedDepth = this.truck.depth/this.reductionFactor;
      const canvas = this.$refs.truckCanvas;
      canvas.width = this.truck.computedWidth;
      canvas.height = this.truck.computedDepth;
    }

  },
  mounted() {
    this.truck = this.initialTruck;
    this.applyTruckReduction();
    this.drawTruck();

  },
  watch: {
    loadingList: {
      handler() {
        this.drawTruck();
      },
      deep: true,
    },
  },
}

</script>
<style scoped>

</style>
