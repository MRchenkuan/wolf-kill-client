const getContext = () => {
	const hanzo_pages = getCurrentPages();
	return hanzo_pages[hanzo_pages.length - 1];
}

const Dialog = ( options ) => {
	options = Object.assign(Dialog.defaultOptions, options );
	return new Promise( ( resolve, reject ) => {
		const context = getContext();
		const dialog = context.selectComponent(options.selector);

		if(dialog) {
			dialog.setData(Object.assign({ action: resolve }, options ) );
		}
	});
};

Dialog.defaultOptions = {
	show: true,
	selector: "#hanzo-dialog"
}

Dialog.alert = Dialog;

export default Dialog;