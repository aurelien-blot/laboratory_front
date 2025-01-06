<template>
  <BasicViewComponent >
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">3D Playground</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div id="scene" ></div>
        </div>
      </div>


    </template>
  </BasicViewComponent>
</template>

<script>

import {mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import SettingsComponent from "@/truck_loading/components/SettingsComponent.vue";
import TruckDrawComponent from "@/truck_loading/components/TruckDrawComponent.vue";
import LoadingService from "@/truck_loading/services/loadingService.js";
import * as THREE from "three";

export default {
  name: 'PlaygroundHome',
  components: {
    BasicViewComponent
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {

  },
  methods: {
    launchPlayGround() {
      this.createScene();
    },
    createScene() {
      const scene = new THREE.Scene();

      // Set background color to white
      scene.background = new THREE.Color(0xffffff);

      const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth*0.5, window.innerHeight*0.5);
      document.getElementById("scene").appendChild(renderer.domElement);

      let cube = this.addCube(scene);

      scene.add(cube);
      this.startAnimation(renderer, scene, camera, cube);
    },
    addCube(){
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
      return new THREE.Mesh(geometry, material);
    },
    startAnimation : function (renderer, scene, camera, cube) {
      const animate = () => {
        requestAnimationFrame(animate);

        // Optional rotation for the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Render the scene
        renderer.render(scene, camera);
      };
      animate();
    }
  },
  mounted() {
    this.launchPlayGround();
  }
}

</script>