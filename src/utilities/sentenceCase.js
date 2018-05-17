module.exports = str => str.split(" ")
	.map(w => (w.length > 1) ? (w[0].toUpperCase()+w.substr(1)) : w.toUpperCase())
	.join(" ");
