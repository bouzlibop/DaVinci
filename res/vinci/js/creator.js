$(document).ready(function() {


    var camera, scene, renderer, geometry, material, mesh, stats, controls;

    $( "#workspace-container" ).animate( {height: "800px"}, 2000, function(){ startCreator() });
    $( "#workspace-menu-bar" ).animate( {height: "38px"}, 2000, function(){});
    $( "#workspace-basic-tools" ).animate( {height: "800px"}, 2000, function(){});
    $( "#workspace-object-properties" ).animate( {height: "800px"}, 2000, function(){});

    function startCreator(){
        initialize();
        animate();
    }

    function initialize() {

        var SCREEN_WIDTH = $("#workspace-container").width();
        var SCREEN_HEIGHT = $("#workspace-container").height();
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

        setUpAndAddGUI();

    }

    function appendStats(){
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '20px';
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

        container = document.getElementById( 'workspace-container' );
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

    function setUpAndAddGUI(){

        var gui = new dat.GUI({
            height : 10 * 32 - 1
        });

        var parameters =
        {
            a: 200, // numeric
            b: 200, // numeric slider
            c: "Hello, GUI!", // string
            d: false, // boolean (checkbox)
            e: "#ff8800", // color (hex)
            f: function() { alert("Hello!") },
            g: function() { alert( parameters.c ) },
            v : 0,    // dummy value, only type is important
            w: "...", // dummy value, only type is important
            x: 0, y: 0, z: 0
        };
        // gui.add( parameters )
        gui.add( parameters, 'a' ).name('Number');
        gui.add( parameters, 'b' ).min(128).max(256).step(16).name('Slider');
        gui.add( parameters, 'c' ).name('String');
        gui.add( parameters, 'd' ).name('Boolean');

        gui.addColor( parameters, 'e' ).name('Color');

        var numberList = [1, 2, 3];
        gui.add( parameters, 'v', numberList ).name('List');

        var stringList = ["One", "Two", "Three"];
        gui.add( parameters, 'w', stringList ).name('List');

        gui.add( parameters, 'f' ).name('Say "Hello!"');
        gui.add( parameters, 'g' ).name("Alert Message");

        var folder1 = gui.addFolder('Coordinates');
        folder1.add( parameters, 'x' );
        folder1.add( parameters, 'y' );
        folder1.close();

//        gui.domElement.style.position = 'absolute';
//        gui.domElement.style.top = '20px';
//        gui.domElement.style.left='20px';
//        gui.domElement.style.zIndex = 100;
        gui.domElement.style.marginRight='0px';
        document.getElementById("workspace-object-properties").appendChild(gui.domElement);

        gui.open();

    }

    function animate() {

        requestAnimationFrame(animate);
        render();
        controls.update();
        stats.update();
        $('#camera-position').html("x: "+camera.position.x.toFixed(2)+" y: "+camera.position.y.toFixed(2)+" z: "+camera.position.z.toFixed(2));

    }

    function render() {

        renderer.render(scene, camera);

    }

    $('#primitiveFigure_cube').on("click", "img", function () {

        var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: true, side: THREE.DoubleSide } );
        var cubeGeometry = new THREE.CubeGeometry(500,500,500,50,50,50);

        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        scene.add(cube);

    });

    $( "#new" ).click(function() {
        $('#workspace-container').empty();
        $('#workspace-object-properties').empty();
        startCreator();
    });

});
