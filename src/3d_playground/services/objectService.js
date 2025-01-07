import * as THREE from "three";

export default class ObjectService {

    static createNativeObject(geometry, color) {
        const material = new THREE.MeshBasicMaterial({ color: color??0x808080 });
        return new THREE.Mesh(geometry, material);
    }

    static cube(width, height, depth, color) {
        const object= new THREE.BoxGeometry(width??1, height??1, depth??1);
        return this.createNativeObject(object, color);
    }

    static circle(radius , segments , thetaStart , thetaLength , color) {
        const object= new THREE.CircleGeometry(radius??1, segments??1, thetaStart??0, thetaLength??2*Math.PI);
        return this.createNativeObject(object, color);
    }

    static capsule(radius , length , capSegments,radialSegments, color) {
        const object= new THREE.CapsuleGeometry(radius??1, length??1, capSegments??4, radialSegments??8);
        return this.createNativeObject(object, color);
    }




}