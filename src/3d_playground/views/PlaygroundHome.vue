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
      customTrailerDimensions: {
        width: 2450,
        depth: 13400
      },
      controls: null,
      objects: [],
      truckDatas :{
        ground:{
          depth: 1
        },
        wheels:{
          radius: 0.5,
          width: 0.3
        },
        cabin: {
          width: 2.5,
          height: 2.6,
          depth: 1
        },
        trailerDimensions: {
          width: null,
          height: 0.3,
          depth: null,
        },
        pallets: []
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
      this.camera.position.x = this.cameraSettings.position.x-8;
      this.camera.position.y = this.cameraSettings.position.y+4;
      this.camera.position.z = this.cameraSettings.position.z+5;
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
      this.truckDatas.trailerDimensions.width = this.customTrailerDimensions.width/1000;
      this.truckDatas.trailerDimensions.depth = this.customTrailerDimensions.depth/1000;
      this.truckDatas.cabin.width = this.truckDatas.trailerDimensions.width;
      const truck = new THREE.Group();

      const cabin = this.createCabin();
      const trailer = this.createTrailer();
      const wheels = this.createWheels();

      truck.add(cabin);
      truck.add(trailer);
      wheels.forEach(wheel => truck.add(wheel));

      this.loadPallets(truck);
      return [truck];
    },
    createCabin() {
      const width = this.truckDatas.cabin.width; // Largeur cabine en mètres
      const height = this.truckDatas.cabin.height; // Hauteur cabine en mètres
      const depth =this.truckDatas.trailerDimensions.width; // Profondeur cabine en mètres
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshPhongMaterial({color: "#9060BF", shininess: 80});
      const cabin = new THREE.Mesh(geometry, material);

      let positionX= ((this.truckDatas.trailerDimensions.depth)*-0.5) -(depth/2);
      let positionY= (this.truckDatas.wheels.radius*2+(height/2));
      cabin.position.set(positionX, positionY);  // La cabine se déplace vers le centre
      return cabin;
    },
    createTrailer() {
      const width = this.truckDatas.trailerDimensions.width ;  // Largeur en mètres
      const height = this.truckDatas.trailerDimensions.height ; // Hauteur du plateau en mètres
      const depth = this.truckDatas.trailerDimensions.depth ;  // Longueur en mètres

      const geometry = new THREE.BoxGeometry(depth, height, width);
      const material = new THREE.MeshPhongMaterial({color: 0x00ff00, shininess: 50});
      const trailer = new THREE.Mesh(geometry, material);
      trailer.position.set(0, this.truckDatas.wheels.radius*2+(height/2), 0); // Trailer aligné
      return trailer;
    },
    createWheels() {
      const wheels = [];
      const radius = this.truckDatas.wheels.radius;
      const width = this.truckDatas.wheels.width;
      const wheelGeometry = new THREE.CylinderGeometry(radius, radius, width, 32);
      const wheelMaterial = new THREE.MeshPhongMaterial({color: 0x222222, shininess: 10});

      //let wheelsYPosition = this.truckDatas.wheels.radius + (this.truckDatas.ground.depth / 2);
      let wheelsYPosition = this.truckDatas.wheels.radius;
      let wheelsZPosition = 1.2;
      let cabinX = ((this.truckDatas.trailerDimensions.depth )*-0.5) ;
      const positions = [
        [cabinX-1.8, wheelsYPosition, wheelsZPosition], // Cabine Avant gauche
        [cabinX-1.8, wheelsYPosition, -wheelsZPosition], // Cabine Avant droit
        [cabinX-0.6, wheelsYPosition, wheelsZPosition], // Cabine Arrière gauche
        [cabinX-0.6, wheelsYPosition, -wheelsZPosition], // Cabine Arrière droit
        [cabinX+1.4, wheelsYPosition, wheelsZPosition], // Milieu Avant gauche du plateau
        [cabinX+1.4, wheelsYPosition, -wheelsZPosition], // Milieu Avant droit du plateau
        [cabinX+8.2, wheelsYPosition, wheelsZPosition], // Milieu Arrière gauche du plateau
        [cabinX+8.2, wheelsYPosition, -wheelsZPosition], // Milieu Arrière droit du plateau
        [cabinX+9.2, wheelsYPosition, wheelsZPosition], // Arrière gauche du plateau
        [cabinX+9.2, wheelsYPosition, -wheelsZPosition], // Arrière droit du plateau
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
      let groundDepth = this.truckDatas.ground.depth;
      const groundGeometry = new THREE.BoxGeometry(30, 30, groundDepth);
      const groundMaterial = new THREE.MeshStandardMaterial({color: 0x777777});
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1*groundDepth/2;
      scene.add(ground);
    },
    loadPallets(truck) {
      const pallets = this.truckDatas.pallets;
      pallets.forEach((pallet) => {
        truck.add(pallet);
      });
    }
  }
  ,
  mounted() {
    this.launchPlayGround();
  }
}

</script>