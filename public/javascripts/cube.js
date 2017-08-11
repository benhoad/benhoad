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
var is_sprites = true;

document.addEventListener('DOMContentLoaded', function windowLoad () {
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

function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    TWEEN.update();
    plane.rotation.y = cube.rotation.y = Date.now()/clockspeed;
    renderer.render( scene, camera );
}

function getContainerWidth() {
    return parseInt(window.getComputedStyle(document.getElementById( 'spinner' )).getPropertyValue("width"));

}
function getContainerHeight() {
    return parseInt(window.getComputedStyle(document.getElementById( 'spinner' )).getPropertyValue("height"));
}

function konami () {
    add_sprites();
    var textureLoader = new THREE.TextureLoader();
    let texture0 = textureLoader.load( '/images/heman1.jpg' );
    let texture1 = textureLoader.load( '/images/heman2.jpg' );
    let texture2 = textureLoader.load( '/images/code.png' );
    let texture3 = textureLoader.load( '/images/code.png' );
    let texture4 = textureLoader.load( '/images/heman3.jpg' );
    let texture5 = textureLoader.load( '/images/heman4.jpg' );

    let materials = [
        new THREE.MeshBasicMaterial( { map: texture0 } ),
        new THREE.MeshBasicMaterial( { map: texture1 } ),
        new THREE.MeshBasicMaterial( { map: texture2 } ),
        new THREE.MeshBasicMaterial( { map: texture3 } ),
        new THREE.MeshBasicMaterial( { map: texture4 } ),
        new THREE.MeshBasicMaterial( { map: texture5 } )
    ];

    let faceMaterial = new THREE.MeshFaceMaterial( materials );

    cube.material = faceMaterial;
    clockspeed = 250;


}

function add_sprites(){
    let material = new THREE.SpriteMaterial( {
        map: new THREE.CanvasTexture( generateSprite() ),
        blending: THREE.AdditiveBlending
    } );
                
    if(is_sprites){
        for ( var i = 0; i < 1000; i++ ) {
            particle = new THREE.Sprite( material );
            initParticle( particle, i * 10 );
            scene.add( particle );
        }
    }
}

function generateSprite() {
    var canvas = document.createElement( 'canvas' );
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext( '2d' );
    var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
    gradient.addColorStop( 0, 'rgba(255,105,180,10)' );
    gradient.addColorStop( 0.2, 'rgba(50,50,50,10)' );
    gradient.addColorStop( 0.4, 'rgba(255,105,180,10)' );
    gradient.addColorStop( 1, 'rgba(0,0,0,10)' );
    context.fillStyle = gradient;
    context.fillRect( 0, 0, canvas.width, canvas.height );
    return canvas;
}

function initParticle( particle, delay ) {
    var particle = this instanceof THREE.Sprite ? this : particle;
    var delay = delay !== undefined ? delay : 0;
    particle.position.set( 0, 100, 0 );
    particle.scale.x = particle.scale.y = Math.random() * 32 + 16;
    new TWEEN.Tween( particle )
        .delay( delay )
        .to( {}, 10000 )
        .onComplete( initParticle )
        .start();
    new TWEEN.Tween( particle.position )
        .delay( delay )
        .to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 10000 )
        .start();
    new TWEEN.Tween( particle.scale )
        .delay( delay )
        .to( { x: 0.01, y: 0.01 }, 10000 )
        .start();
}