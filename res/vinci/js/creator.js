$(document).ready(function() {
    $( "#workspace" ).animate({height: "900px"}, 3000, function(){
        init();
        animate();
    });

    var camera, scene, renderer, geometry, material, mesh;

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(50, $("#workspace").width()/$("#workspace").height(), 1, 10000);
        camera.position.z = 500;
        scene.add(camera);

        geometry = new THREE.CubeGeometry(200, 200, 200);
        material = new THREE.MeshNormalMaterial();

        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.CanvasRenderer();
        renderer.setSize($("#workspace").width(), $("#workspace").height());

        document.body.appendChild(renderer.domElement);

    }

    function animate() {

        requestAnimationFrame(animate);
        render();

    }

    function render() {

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

        renderer.render(scene, camera);

    }

});
