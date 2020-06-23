/* yank it! - (c) sarah 2020 */
var addonEnabled = true;
var flickAllowed = true;
var friction = 0.95;

let mouseDown = false;
let velX = 0;
let velY = 0;

window.addEventListener('mousedown', (e) => {
	if (e.button === 1 && !e.shiftKey) {
		mouseDown = true;
		e.preventDefault();
	}
});

window.addEventListener('mouseup', (e) => {
	if (e.button === 1) {
		mouseDown = false;
	}
});

window.addEventListener('mousemove', (e) => {
	if (mouseDown) {
		velX = e.movementX;
		velY = e.movementY;
		window.scrollBy(-velX, -velY);
	}
});

setInterval(() => {
	if (!mouseDown && flickAllowed) {
		window.scrollBy(-velX, -velY);
		velX *= friction;
		velY *= friction;
	}
}, (1 / 60) * 1000);

function getconfig(obj, area) {
	function onError(error) {
		console.log(`Error: ${error}`);
	}

	let get_enabled = browser.storage.sync.get('enabled');
	get_enabled.then((r) => addonEnabled = r.enabled, onError);

	let get_flick = browser.storage.sync.get('flick');
	get_flick.then((r) => flickAllowed = r.flick, onError);

	let get_friction = browser.storage.sync.get('friction');
	get_friction.then((r) => { friction = (1 - r.friction); }, onError);
}

browser.storage.onChanged.addListener(getconfig);
