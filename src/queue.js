
if (typeof require != 'undefined') {const MaxHeap = require('./max-heap.js');}

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		//this.maxSize = 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() == this.maxSize) {
			throw("error");
		}

		this.heap.push(data, priority);
	}

	shift() {
		if (!this.size()) {
			throw("error");
		}

		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

if (typeof module != 'undefined')
module.exports = PriorityQueue;
