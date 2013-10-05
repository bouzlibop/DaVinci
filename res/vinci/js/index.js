/**
 * Created with JetBrains WebStorm.
 * User: bouzlibop
 * Date: 03.10.13
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */

var text= {
    message: 'elo',
    speed: 'elo',
    explode: 'elo'
}

window.onload = function() {
    var gui = new dat.GUI();
    gui.add(text, 'message');
    gui.add(text, 'speed', -5, 5);
    gui.add(text, 'explode');
    gui.setAttribute("style","z-index: 99;");
};