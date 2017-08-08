var container = document.getElementById( 'spinner' );
var camera, scene, renderer;
var cube, plane;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = getContainerWidth() / 2;
var windowHalfY = getContainerHeight() / 2;
var clockspeed = 1000;

document.addEventListener('DOMContentLoaded', function windowLoad () {
    console.log(container);
    init();
    animate();
})




function init() {
    container = document.getElementById( 'spinner' );
    camera = new THREE.PerspectiveCamera( 70, getContainerWidth() / getContainerHeight(), 1, 1000 );
    camera.position.y = 150;
    camera.position.z = 500;
    scene = new THREE.Scene();


    // Cube

    var textureLoader = new THREE.TextureLoader();

    let texture0 = textureLoader.load( '/images/code.png' );
    let texture1 = textureLoader.load( '/images/learn.png' );
    let texture2 = textureLoader.load( '/images/games.png' );
    let texture3 = textureLoader.load( '/images/computer.png' );
    let texture4 = textureLoader.load( '/images/games.png' );
    let texture5 = textureLoader.load( '/images/computer.png' );

    let materials = [
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
    ];
    let faceMaterial = new THREE.MeshFaceMaterial( materials );

    var geometry = new THREE.BoxGeometry( 200, 200, 200 );
   
    cube = new THREE.Mesh( geometry, faceMaterial );
    cube.position.y = 150;
    scene.add( cube );


    // Plane
    var geometry = new THREE.PlaneBufferGeometry( 200, 200 );
    geometry.rotateX( - Math.PI / 2 );
    var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0, overdraw: 0.5 } );
    plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    renderer = new THREE.WebGLRenderer();
    renderer.clearColor(0, 0, 0, 0);
    renderer.setClearColor( 0xffffff);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( getContainerWidth(), getContainerHeight() );
    container.appendChild( renderer.domElement );
    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    // document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    let width = getContainerWidth(), height = getContainerHeight();
    windowHalfX = width/ 2;
    windowHalfY = height / 2;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
}
//
/*
function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}
function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}
function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentMouseOut( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}
function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
    }
}*/
//
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    plane.rotation.y = cube.rotation.y = Date.now()/clockspeed;
    renderer.render( scene, camera );
}

function getContainerWidth() {
    return parseInt(window.getComputedStyle(document.getElementById( 'spinner' )).getPropertyValue("width"));

}
function getContainerHeight() {
    return parseInt(window.getComputedStyle(document.getElementById( 'spinner' )).getPropertyValue("height"));
}