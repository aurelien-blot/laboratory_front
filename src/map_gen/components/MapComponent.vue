
<template>
  <div class="mapArea">
    <canvas
        ref="mapCanvas"
        :width="generatedMap.widthPx"
        :height="generatedMap.heightPx"
        style="background-color: white;"

    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </div>
  <div class="mt-2"><button @click="printMap" class="btn btn-sm btn-primary">Télécharger</button></div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'MapComponent',
  components: {
  },
  props: {
    generatedMap: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['isTestMode']),
  },
  watch: {
    generatedMap: {
      handler(val) {
        this.$nextTick(() => {
          this.drawMap();
        });
      },
      deep: true,
    }
  },
  methods: {
    drawMap() {
      const canvas = this.$refs.mapCanvas;
      if (!canvas) return;
      canvas.width = this.generatedMap.widthPx;
      canvas.height = this.generatedMap.heightPx;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Le contexte du canvas n'est pas disponible");
        return;
      }
      // Parcourir la carte générée et dessiner chaque pixel
      for (let y = 0; y < this.generatedMap.heightPx; y++) {
        for (let x = 0; x < this.generatedMap.widthPx; x++) {
          const biome = this.generatedMap.map[x][y]; // Récupère le biome pour chaque position
          ctx.fillStyle = biome.color; // Obtenir la couleur associée au biome
          ctx.fillRect(x, y, 1, 1); // Dessiner un pixel de 1x1
        }
      }
    },
    printMap() {
      const canvas = this.$refs.mapCanvas;
      if (canvas) {
        // Générer l'image PNG à partir du canvas
        this.imageData = canvas.toDataURL("image/png");

        // Créer un lien de téléchargement
        const link = document.createElement('a');
        link.href = this.imageData;
        link.download = 'map.png';
        link.click();
      }
    }
  },
  mounted() {
    this.drawMap();
  }
}

</script>
<style scoped>
.mapArea {
  width: 100%;
  height: 50vh;
  border: 3px solid saddlebrown;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
