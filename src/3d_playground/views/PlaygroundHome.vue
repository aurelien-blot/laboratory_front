<template>
  <BasicViewComponent>
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">3D Playground</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <div id="scene"></div>
        </div>
      </div>


    </template>
  </BasicViewComponent>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import * as THREE from "three";
import ObjectService from "@/3d_playground/services/objectService.js";
import LoaderService from "@/3d_playground/services/LoaderService.js";
import {OrbitControls} from "three/addons";

export default {
  name: 'PlaygroundHome',
  components: {
    BasicViewComponent
  },
  data() {
    return {
      camera: null,
      renderer: null,
      sizeReduction: 0.5,
      sceneBackgroundColor: 0xffffff,
      cameraSettings: {
        position: {
          x: 0,
          y: 0,
          z: 5
        }
      },
      controls: null,
      objects: [],
      trailerDimensions: {
        width: 2450,
        height: 2600,
        depth: 13400,
      }
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
  },
  watch: {},
  methods: {
    ...mapActions(['setLoading']),
    async launchPlayGround() {
      this.setLoading(true);
      let scene = this.createScene();
      //let objects = this.createObjects();
      let truckObjects = this.createTruck();
      //this.addObjects(scene, objects);
      this.addObjects(scene, truckObjects);
      //await this.addModels(scene, models);
      //this.startAnimation(scene, truckObjects);
      this.createGround(scene);
      this.startRendering(scene);
      this.setLoading(false);
    },
    startRendering(scene) {
      const renderScene = () => {
        requestAnimationFrame(renderScene);
        this.controls.update();
        this.renderer.render(scene, this.camera);
      }
      renderScene();
    },
    createScene() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(this.sceneBackgroundColor);
      this.initCamera();
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(window.innerWidth * this.sizeReduction, window.innerHeight * this.sizeReduction);
      document.getElementById("scene").appendChild(this.renderer.domElement);
      this.createLight(scene);
      this.createControls();

      return scene;
    },
    createLight(scene) {
      // Lumière directionnelle
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Lumière ambiante pour éclairer légèrement toute la scène
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
    },
    createControls() {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enableDamping = true; // Effet d'amortissement
      controls.dampingFactor = 0.05; // Facteur d'amortissement
      controls.screenSpacePanning = false; // Évite le déplacement latéral
      this.controls = controls;
    },
    createObjects() {
      let object1 = ObjectService.cube(1, 1, 1,/**/"#ff5733");
      let object2 = ObjectService.capsule(1, 1, 10, 15,/**/"#ff5733");
      let object3 = ObjectService.circle(1, 32, null, null,/**/);

      let objects = [];
      objects.push(object1);
      //objects.push(object2);
      //objects.push(object3);
      return objects;
    },
    loadModels() {
      let models = [];
      models.push("skull.gltf");
      return models;
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
      );
      this.camera.position.x = this.cameraSettings.position.x;
      this.camera.position.y = this.cameraSettings.position.y;
      this.camera.position.z = this.cameraSettings.position.z;
      this.camera.lookAt(0, 0, 0);

    },
    addObjects(scene, objects) {
      objects.forEach((object) => {
        scene.add(object);
      });
    },
    addModels(scene, models) {
      models.forEach((model) => {
        LoaderService.addModelToScene(model, scene)
      });
    },
    startAnimation: function (scene, objects) {
      let that = this;
      const animate = () => {
        requestAnimationFrame(animate);
        // Optional rotation for the cube
        objects.forEach((object) => {
          /* object.rotation.x += 0.01;
           object.rotation.y += 0.01;*/
        });
        // Render the scene
        that.renderer.render(scene, that.camera);
      };
      animate();
    },
    createTruck() {
      const truck = new THREE.Group();

      const cabin = this.createCabin();
      const trailer = this.createTrailer();
      const wheels = this.createWheels();

      // Ajustement de la position pour qu'ils soient collés
      cabin.position.set(-7, 1.8, 0);  // La cabine se déplace vers le centre
      trailer.position.set(1.5, 0.6, 0); // Trailer aligné
      truck.add(cabin);
      truck.add(trailer);
      wheels.forEach(wheel => truck.add(wheel));
      return [truck];
    },
    createCabin() {
      const width = 2.5; // Largeur cabine en mètres
      const height = 2.6; // Hauteur cabine en mètres
      const depth =this.trailerDimensions.width/1000; // Profondeur cabine en mètres
      const geometry = new THREE.BoxGeometry(width, height, depth);
      //const geometry = new THREE.BoxGeometry(2, 2, this.trailerDimensions.width/1000);
      const material = new THREE.MeshPhongMaterial({color: "#9060BF", shininess: 80});
      const cabin = new THREE.Mesh(geometry, material);
      return cabin;
    },

    createTrailer() {
      const width = this.trailerDimensions.width / 1000;  // Largeur en mètres
      const height = 0.3; // Hauteur du plateau en mètres
      const depth = this.trailerDimensions.depth / 1000;  // Longueur en mètres

      const geometry = new THREE.BoxGeometry(depth, height, width);
      const material = new THREE.MeshPhongMaterial({color: 0x00ff00, shininess: 50});
      const trailer = new THREE.Mesh(geometry, material);
      return trailer;
    },

    createWheels() {
      const wheels = [];
      const radius = 0.5; // Rayon roue en mètres (500 mm)
      const width = 0.3; // Largeur roue en mètres (300 mm)
      const wheelGeometry = new THREE.CylinderGeometry(radius, radius, width, 32);
      const wheelMaterial = new THREE.MeshPhongMaterial({color: 0x222222, shininess: 10});

      /*const positions = [
        [-3, 0, 1], // Cabine Avant gauche
        [-3, 0, -1], //Cabine Avant droit
        [-2, 0, 1], //Cabine Arrière gauche
        [-2, 0, -1], //Cabine Arrière droit
        [-0.5, 0, 1], //Trailer Avant gauche
        [-0.5, 0, -1], //Trailer Avant droit
        [2.2, 0, 1], //Trailer milieu gauche
        [2.2, 0, -1], //Trailer milieu droit
        [3.3, 0, 1], //Trailer Arrière gauche
        [3.3, 0, -1], //Trailer Arrière droit
      ];*/
      const positions = [
        [-3, 0, 1.2], // Cabine Avant gauche
        [-3, 0, -1.2], // Cabine Avant droit
        [-2, 0, 1.2], // Cabine Arrière gauche
        [-2, 0, -1.2], // Cabine Arrière droit
        [0, 0, 1.2], // Milieu Avant gauche du plateau
        [0, 0, -1.2], // Milieu Avant droit du plateau
        [5, 0, 1.2], // Milieu Arrière gauche du plateau
        [5, 0, -1.2], // Milieu Arrière droit du plateau
        [6.5, 0, 1.2], // Arrière gauche du plateau
        [6.5, 0, -1.2], // Arrière droit du plateau
      ];

      positions.forEach(([x, y, z]) => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(x, y, z);
        wheels.push(wheel);
      });

      return wheels;
    },

    createGround(scene) {
      const groundGeometry = new THREE.PlaneGeometry(20, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({color: 0x777777});
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = 0;
      scene.add(ground);
    },
  }
  ,
  mounted() {
    this.launchPlayGround();
  }
}

</script>