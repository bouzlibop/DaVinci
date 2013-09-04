$(document).ready(function() {


    var camera, scene, renderer, geometry, material, mesh, stats, controls;

    $( "#workspace" ).animate( {height: "900px"}, 1000, function(){ startCreator() });

    function startCreator(){
        initialize();
        animate();
    }

    function initialize() {

        var SCREEN_WIDTH = $("#workspace").width();
        var SCREEN_HEIGHT = $("#workspace").height();
        var FOV = 50;
        var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
        var NEAR = 1;
        var FAR = 10000;

        scene = new THREE.Scene();

        setUpAndAddCamera(FOV, ASPECT, NEAR, FAR);

        createAndStartRenderer(SCREEN_WIDTH, SCREEN_HEIGHT);

        controls = new THREE.OrbitControls( camera, renderer.domElement );

        appendStats();

        setUpAndAddFloor();

    }

    function appendStats(){
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild( stats.domElement );
    }

    function setUpAndAddCamera(fov, aspect, near, far){

        camera = new THREE.PerspectiveCamera( fov, aspect, near, far);
        camera.position.set(0,-500,500);
        camera.lookAt(scene.position);
        scene.add(camera);

    }

    function createAndStartRenderer(screenWidth, screenHeight){

        if ( Detector.webgl )
            renderer = new THREE.WebGLRenderer( {antialias:true} );
        else
            renderer = new THREE.CanvasRenderer();

        renderer.setSize(screenWidth, screenHeight);

        container = document.getElementById( 'workspace' );
        container.appendChild( renderer.domElement );

    }

    function setUpAndAddFloor(){

        //TEXTURE
/*
        var floorTexture = new THREE.ImageUtils.loadTexture( "../res/images/textures/checkerboard.jpg" );
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set( 16, 16);
        var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
        var floorGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
*/

        //WIREFRAME
        var floorMaterial = new THREE.MeshBasicMaterial( { color: 0xFFEBBD, wireframe: true, side: THREE.DoubleSide } );
        var floorGeometry = new THREE.PlaneGeometry(500,500,50,50);

        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.z = -100;

        scene.add(floor);

    }

    function animate() {

        requestAnimationFrame(animate);
        render();
        controls.update();
        stats.update();

    }

    function render() {

        renderer.render(scene, camera);

    }


});
