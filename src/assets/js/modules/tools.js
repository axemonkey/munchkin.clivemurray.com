const lz = n => {
	return Number(n) < 10 ? `0${n}` : `${n}`;
};

const getURLParams = () => {
	const params = new URLSearchParams(document.location.search);
	return params;
};

const niceList = array => {
	if (!array || array.length === 0) {
		return '';
	}
	var clone = array.slice(0);

	return (function build() {
		if (clone.length === 1) {
			return clone[0];
		}
		if (clone.length === 2) {
			return clone[0] + ' and ' + clone[1];
		}
		return clone.shift() + ', ' + build();
	})();
};

export {
	lz,
	getURLParams,
	niceList,
};
