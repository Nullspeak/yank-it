/* yank it! - (c) sarah 2020 */
function saveOptions(e) {
	e.preventDefault();
	browser.storage.sync.set({
		enabled: document.querySelector('#enabled').checked,
		flick: document.querySelector('#allow-flick').checked,
		friction: document.querySelector('#friction-amt').value
	});
}

function restoreOptions() {
	function onError(error) {
		console.log(`Error: ${error}`);
	}

	let get_enabled = browser.storage.sync.get('enabled');
	get_enabled.then((r) => {
		if (r.enabled != undefined)
			document.querySelector('#enabled').checked = r.enabled;
		else
			document.querySelector('#enabled').checked = true;
	}, onError);

	let get_flick = browser.storage.sync.get('flick');
	get_flick.then((r) => {
		if (r.flick != undefined)
			document.querySelector('#allow-flick').checked = r.flick;
		else
			document.querySelector('#allow-flick').checked = true;
	}, onError);

	let get_friction = browser.storage.sync.get('friction');
	get_friction.then((r) => {
		if (r.friction != undefined && !isNaN(r.friction))
			document.querySelector('#friction-amt').value = r.friction;
		else
			document.querySelector('#friction-amt').value = 1;
	}, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
