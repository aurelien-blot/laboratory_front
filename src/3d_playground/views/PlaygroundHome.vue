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
import ColorService from "@/laboratory/services/colorService.js";

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
        pallets:
         /* [
            {
              "depthUsed": 2500,
              "widthUsed": 2050,
              "columns": [
                [
                  {
                    "number": 1,
                    "width": 850,
                    "depth": 2500,
                    "height": 1100,
                    "x": 0,
                    "y": 0
                  }
                ],
                [
                  {
                    "number": 3,
                    "width": 1200,
                    "depth": 1000,
                    "height": 1700,
                    "x": 850,
                    "y": 0
                  },
                  {
                    "number": 17,
                    "width": 1300,
                    "depth": 800,
                    "height": 1100,
                    "x": 850,
                    "y": 1000
                  }
                ]
              ]
            },
            {
              "depthUsed": 1000,
              "widthUsed": 2200,
              "columns": [
                [
                  {
                    "number": 19,
                    "width": 500,
                    "depth": 1000,
                    "height": 900,
                    "x": 0,
                    "y": 2500
                  }
                ],
                [
                  {
                    "number": 20,
                    "width": 500,
                    "depth": 1000,
                    "height": 900,
                    "x": 500,
                    "y": 2500
                  }
                ],
                [
                  {
                    "number": 2,
                    "width": 1200,
                    "depth": 800,
                    "height": 800,
                    "x": 1000,
                    "y": 2500
                  }
                ]
              ]
            },
            {
              "depthUsed": 800,
              "widthUsed": 2400,
              "columns": [
                [
                  {
                    "number": 4,
                    "width": 1200,
                    "depth": 800,
                    "height": 970,
                    "x": 0,
                    "y": 3500
                  }
                ],
                [
                  {
                    "number": 5,
                    "width": 1200,
                    "depth": 800,
                    "height": 1500,
                    "x": 1200,
                    "y": 3500
                  }
                ]
              ]
            },
            {
              "depthUsed": 800,
              "widthUsed": 2400,
              "columns": [
                [
                  {
                    "number": 6,
                    "width": 1200,
                    "depth": 800,
                    "height": 1550,
                    "x": 0,
                    "y": 4300
                  }
                ],
                [
                  {
                    "number": 7,
                    "width": 1200,
                    "depth": 800,
                    "height": 1940,
                    "x": 1200,
                    "y": 4300
                  }
                ]
              ]
            },
            {
              "depthUsed": 800,
              "widthUsed": 2400,
              "columns": [
                [
                  {
                    "number": 8,
                    "width": 1200,
                    "depth": 800,
                    "height": 1620,
                    "x": 0,
                    "y": 5100
                  }
                ],
                [
                  {
                    "number": 9,
                    "width": 1200,
                    "depth": 800,
                    "height": 1920,
                    "x": 1200,
                    "y": 5100
                  }
                ]
              ]
            },
            {
              "depthUsed": 800,
              "widthUsed": 2400,
              "columns": [
                [
                  {
                    "number": 10,
                    "width": 1200,
                    "depth": 800,
                    "height": 1630,
                    "x": 0,
                    "y": 5900
                  }
                ],
                [
                  {
                    "number": 11,
                    "width": 1200,
                    "depth": 800,
                    "height": 1750,
                    "x": 1200,
                    "y": 5900
                  }
                ]
              ]
            },
            {
              "depthUsed": 800,
              "widthUsed": 2400,
              "columns": [
                [
                  {
                    "number": 12,
                    "width": 1200,
                    "depth": 800,
                    "height": 2230,
                    "x": 0,
                    "y": 6700
                  }
                ],
                [
                  {
                    "number": 13,
                    "width": 1200,
                    "depth": 800,
                    "height": 1750,
                    "x": 1200,
                    "y": 6700
                  }
                ]
              ]
            },
            {
              "depthUsed": 800,
              "widthUsed": 2400,
              "columns": [
                [
                  {
                    "number": 14,
                    "width": 1200,
                    "depth": 800,
                    "height": 1750,
                    "x": 0,
                    "y": 7500
                  }
                ],
                [
                  {
                    "number": 15,
                    "width": 1200,
                    "depth": 800,
                    "height": 920,
                    "x": 1200,
                    "y": 7500
                  }
                ]
              ]
            },
            {
              "depthUsed": 800,
              "widthUsed": 2400,
              "columns": [
                [
                  {
                    "number": 16,
                    "width": 1200,
                    "depth": 800,
                    "height": 920,
                    "x": 0,
                    "y": 8300
                  }
                ],
                [
                  {
                    "number": 18,
                    "width": 1200,
                    "depth": 800,
                    "height": 500,
                    "x": 1200,
                    "y": 8300
                  }
                ]
              ]
            }
          ]*/
            [
              {x: 0, y: 0, width: 42.5, height: 125, depth: 2500},
              {x: 42.5, y: 0, width: 60, height: 50, depth: 1000},
            ]
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
      const pallets = this.createPallets(trailer);

      truck.add(cabin);
      truck.add(trailer);
      wheels.forEach(wheel => truck.add(wheel));
      pallets.forEach(pallet => truck.add(pallet));
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
    createPallets(trailer){
      const pallets = [];
      let palletTreatmentList =[]
      /*this.truckDatas.pallets.forEach((pallet) => {
        pallet.columns.forEach((column) => {
          column.forEach((pallet) => {
            palletTreatmentList.push(pallet);
          });
        });
      });*/
      palletTreatmentList=[...this.truckDatas.pallets]
      palletTreatmentList.forEach((pallet) => {
        const palletMaterial = new THREE.MeshPhongMaterial({color: ColorService.generateRandomColor(), shininess: 50});

        let width =pallet.width/100;// 0.425//
        let height = pallet.height/100;//1.25//
        let depth = pallet.depth/1000;
        let x = pallet.x/1000;
        let y = pallet.y/1000;

        let xStart = (this.truckDatas.trailerDimensions.depth / -2) ;
        let zStart = this.truckDatas.trailerDimensions.width/2 ;
        let floorY = trailer.position.y + (this.truckDatas.trailerDimensions.height/2) + height/2;
        let calculatedX = xStart+ x + (depth/2);
        let calculatedY = floorY+y;
        let calculatedZ = zStart- width/ 2;
        if(pallets.length>0){
          console.log(pallets[pallets.length-1])
          let lastPalette = pallets[pallets.length-1];
          calculatedZ = lastPalette.position.z -lastPalette.geometry.parameters.depth;
        }

        const geometry = new THREE.BoxGeometry(depth, height, width);
        const palletMesh = new THREE.Mesh(geometry, palletMaterial);
        palletMesh.position.set(calculatedX, calculatedY, calculatedZ);
        pallets.push(palletMesh);

      });
      return pallets;
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
  }
  ,
  mounted() {
    this.launchPlayGround();
  }
}

</script>