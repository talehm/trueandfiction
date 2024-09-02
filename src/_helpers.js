export default {
	fn: {
		open(link, onNewTab=true) {
			window.open(link, onNewTab ? '_blank' : null);
		}
	}
}