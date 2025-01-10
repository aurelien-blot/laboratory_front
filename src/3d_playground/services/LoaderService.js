import * as THREE from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import UtilService from "@/laboratory/services/utilService.js";
import * as fs from "node:fs";
import axios from "axios";

export default class LoaderService {

    static folderPath = '3d_playground/models/';

    static async addModelToScene(modelFileName, scene) {
        const loader = new GLTFLoader();

        let fullPath = LoaderService.folderPath+modelFileName;

        loader.load( fullPath, function ( gltf ) {

            scene.add( gltf.scene );

        }, undefined, function ( error ) {
            console.error( error );
        } );
    }

}