export var modifierKeys = {};
var lastEvent, heldKeys = {};
document.addEventListener('keydown', function (e) {
    if (lastEvent && lastEvent.which === e.which) {
        return;
    }
    lastEvent = e;
    heldKeys[e.which] = true;
    setModifierKey(e);
}, true);
document.addEventListener('keyup', function (e) {
    lastEvent = null;
    delete heldKeys[e.which];
    setModifierKey(e);
}, true);
function setModifierKey(e) {
    modifierKeys.altLeft = e.altKey && e.location === 1;
    modifierKeys.altRight = e.altKey && e.location === 2;
    modifierKeys.ctrlLeft = e.ctrlKey && e.location === 1;
    modifierKeys.ctrlRight = e.ctrlKey && e.location === 2;
    modifierKeys.shiftLeft = e.shiftKey && e.location === 1;
    modifierKeys.shiftRight = e.shiftKey && e.location === 2;
}