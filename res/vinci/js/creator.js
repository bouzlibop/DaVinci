$(document).ready(function() {


    var camera, scene, renderer, geometry, material, mesh, stats, controls, projector, light;

    var objects = [];
    var moveControl = [];

    var cube, cap;

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

        projector = new THREE.Projector();

        setUpAndAddCamera(FOV, ASPECT, NEAR, FAR);

        createAndStartRenderer(SCREEN_WIDTH, SCREEN_HEIGHT);

        light = new THREE.PointLight(0xFFFFFF);
        light.position.set(100,100,0);
        scene.add(light);

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
        renderer.sortObjects = false;
        renderer.setSize(screenWidth, screenHeight);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapType = THREE.PCFShadowMap;
        container = document.getElementById( 'workspace-container' );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
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

        floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.z = -100;

        scene.add(floor);

    }

    function setUpAndAddGUI(){

        gui = new dat.GUI();

        gui.domElement.style.marginRight='0px';
        document.getElementById("workspace-object-properties").appendChild(gui.domElement);

        parameters =
        {
            x: 0, y: 30, z: 0,
            color: "#ff0000", // color (change "#" to "0x")
            opacity: 1,
            visible: true,
            reset: function() {
                $('#workspace-container').empty();
                $('#workspace-object-properties').empty();
                startCreator();
            }
        };

        var folder1 = gui.addFolder('Position');
        var cubeX = folder1.add( parameters, 'x' ).min(-200).max(200).step(1).listen();
        var cubeY = folder1.add( parameters, 'y' ).min(0).max(100).step(1).listen();
        var cubeZ = folder1.add( parameters, 'z' ).min(-200).max(200).step(1).listen();
        folder1.open();

        cubeX.onChange(function(value)
        {   cube.position.x = value;   });
        cubeY.onChange(function(value)
        {   cube.position.y = value;   });
        cubeZ.onChange(function(value)
        {   cube.position.z = value;   });

        var cubeColor = gui.addColor( parameters, 'color' ).name('Color').listen();
        cubeColor.onChange(function(value) // onFinishChange
        {   cube.material.color.setHex( value.replace("#", "0x") );   });

        var cubeOpacity = gui.add( parameters, 'opacity' ).min(0).max(1).step(0.01).name('Opacity').listen();
        cubeOpacity.onChange(function(value)
        {   cube.material.opacity = value;   });

        var cubeVisible = gui.add( parameters, 'visible' ).name('Visible?').listen();
        cubeVisible.onChange(function(value)
        {   cube.visible = value;  	});

        gui.add( parameters, 'reset' ).name("Reset Cube Parameters");

//        gui.domElement.style.position = 'absolute';
//        gui.domElement.style.top = '20px';
//        gui.domElement.style.left='20px';
//        gui.domElement.style.zIndex = 100;

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

        for ( var i = 0, j = moveControl.length; i < j; i ++ ) {

            moveControl[ i ].update();

        }

        renderer.render(scene, camera);

    }

    $('#primitiveFigure_cube').on("click", "img", function () {

        var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: true, side: THREE.DoubleSide } );
        var cubeGeometry = new THREE.CubeGeometry(100,100,100,5,5,5);

        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

        objects.push(cube);

        scene.add(cube);

        var control = new THREE.TransformControls( camera, renderer.domElement );
        control.addEventListener( 'change', render );
        control.attach( cube );
        control.scale = 0.65;
        scene.add( control.gizmo );

        moveControl.push( control );

    });

    $('#cup').on("click", "img", function () {

        var cupMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, side: THREE.DoubleSide } );
        var cupGeometry = new THREE.CylinderGeometry(100, 100, 200, 34);
        var cupMaterial2 = new THREE.MeshLambertMaterial( { color: 0xFFFF00, side: THREE.DoubleSide } );
        var cupGeometry2 = new THREE.CylinderGeometry(80, 80, 200, 34);

        var cylinder = new THREE.Mesh(cupGeometry);
        cylinder.rotation.x = 90 * Math.PI/180;
        var cylinder2 = new THREE.Mesh(cupGeometry2);
        cylinder2.rotation.x = 90 * Math.PI/180;

        var holder = new THREE.Mesh( new THREE.TorusGeometry( 50, 20, 20, 20 ));
        holder.rotation.x = 90 * Math.PI/180;
        holder.position.set( 100, 0, 0 );

        var cyl1_bsp = new ThreeBSP( cylinder );
        var cyl2_bsp = new ThreeBSP( cylinder2 );
        var holder_bsp = new ThreeBSP(holder);
        var subtract_bsp = cyl1_bsp.subtract( cyl2_bsp );
        var subtract_bsp2 = holder_bsp.subtract(cyl1_bsp);
        var result = subtract_bsp.toMesh(new THREE.MeshLambertMaterial( { color: 0xFF0000 } ) );
        var result2 = subtract_bsp2.toMesh(new THREE.MeshLambertMaterial( { color: 0xFF0000 } ) );
        result.geometry.computeVertexNormals();
        result2.geometry.computeVertexNormals();


        cup = new THREE.Object3D();
        cup.add(result);
        cup.add(result2);
        objects.push(cup);
        scene.add(cup);

        var control = new THREE.TransformControls( camera, renderer.domElement );
        control.addEventListener( 'change', render );
        control.attach( cup );
        control.scale = 1;
        scene.add( control.gizmo );

        moveControl.push( control );

    });

    $( "#new" ).click(function() {
        $('#workspace-container').empty();
        $('#workspace-object-properties').empty();
        startCreator();
    });

    function onDocumentMouseDown(event){

        event.preventDefault();

        if ( event.button === 0 ){


            var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
            projector.unprojectVector(vector, camera);

            var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            var intersects = raycaster.intersectObjects(objects);

            if(intersects.length>0){

                intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

            }

        }

    }

});
