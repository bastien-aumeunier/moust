

const Store = require('electron-store');
const schema = {
	idUser: {
		type: 'string',
	},
	userName: {
		type: 'string',
	}
};

const store = new Store({schema});

module.exports = store;