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
import ObjectService from "@/3d_playground/services/objectService.js";

export default {
  name: 'PlaygroundHome',
  components: {
    BasicViewComponent
  },
  data() {
    return {
      camera : null,
      renderer : null,
      sizeReduction: 0.5,
      sceneBackgroundColor: 0xffffff,
      cameraSettings: {
        position: {
          x: 0,
          y: 0,
          z: 5
        }
      }
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
      scene.background = new THREE.Color(this.sceneBackgroundColor);
      this.initCamera();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth*this.sizeReduction, window.innerHeight*this.sizeReduction);
      document.getElementById("scene").appendChild(this.renderer.domElement);

      let object1 = ObjectService.cube(1,1,1,/**/"#ff5733");
      let object2 = ObjectService.capsule(1,1,10, 15,/**/"#ff5733");
      let object3 = ObjectService.circle(1,32,null, null,/**/);
      let objects = [];
      objects.push(object1);
      //objects.push(object2);
      //objects.push(object3);
      this.addObject(scene, objects);
      this.startAnimation(scene, object1);
    },
    initCamera(){
      this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      );
      this.camera.position.x = this.cameraSettings.position.x;
      this.camera.position.y = this.cameraSettings.position.y;
      this.camera.position.z = this.cameraSettings.position.z;

    },
    addObject(scene, objects){
      objects.forEach((object) => {
        scene.add(object);
      });
    },
    startAnimation : function (scene, object) {
      let that=this;
      const animate = () => {
        requestAnimationFrame(animate);

        // Optional rotation for the cube
        object.rotation.x += 0.01;
        object.rotation.y += 0.01;

        // Render the scene
        that.renderer.render(scene, that.camera);
      };
      animate();
    }
  },
  mounted() {
    this.launchPlayGround();
  }
}

</script>