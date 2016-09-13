const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	push(data, priority) {
		var newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);
		this._size++;
	}

	pop() {
		if (this.root == null && this.parentNodes.length == 0){
			return true;
		}

		var detach = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detach);

		if (this.root) {
			this.shiftNodeDown(this.root);
		}

		--this._size;
		return detach.data;
	}

	detachRoot() {
		var root = this.root;
		this.root = null;

		if (this.parentNodes[0] == root) {
			this.parentNodes.shift();
		}

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length == 0) {
			return;
		}

		var lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
		this.root = lastInsertedNode;

		if (detached.left == lastInsertedNode || detached.left == null) {
			this.root.left = null;
		} else {
			this.root.left = detached.left;
		}
		if (detached.right == lastInsertedNode || detached.right == null) {
			this.root.right = null;
		} else {
			this.root.right = detached.right;
		}
		if (this.root.left != null) {
			this.root.left.parent = lastInsertedNode;
		}
		if (this.root.right != null) {
			this.root.right.parent = lastInsertedNode;
		}
		if (this.root.right == null) {
			this.parentNodes.unshift(lastInsertedNode);
		}
		this.parentNodes.pop();
		if (lastInsertedNode.parent != null && lastInsertedNode.parent != detached && lastInsertedNode.parent.right == lastInsertedNode) {
			this.parentNodes.unshift(lastInsertedNode.parent);
			lastInsertedNode.parent.right = null;
		}

		if (lastInsertedNode.parent != null && lastInsertedNode.parent.left == lastInsertedNode) {
			lastInsertedNode.parent.left = null;
		}
		this.root.parent = null;
	}

	size() {
		return this._size;
	}

	isEmpty() {
		if (this.root == null && this.parentNodes.length == 0) {
			return true;
		} else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this._size = 0;
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
				if(this.parentNodes[0].right == node){
				this.parentNodes.shift();
			}

		}
	}

	shiftNodeUp(node) {
		if (node == this.root || node == null) {
			return;
		}
		if (node.priority > node.parent.priority) {
			if (this.root == node.parent) {
				this.root = node;
			}

			var indexNode = this.parentNodes.indexOf(node);
			var indexParentNode = this.parentNodes.indexOf(node.parent);

			if (indexNode != -1) {
				this.parentNodes[indexNode] = node.parent;
				if (indexParentNode != -1) {
					this.parentNodes[indexParentNode] = node;
				}
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node.left == null) {
			return;
		}
		if (node.right != null && node.left.priority < node.right.priority && node.right.priority > node.priority) {
			if (this.root == node) {
				this.root = node.right;
			}

			var indexNode = this.parentNodes.indexOf(node);
			var indexChildtNode = this.parentNodes.indexOf(node.right);

			if (indexChildtNode != -1) {
				this.parentNodes[indexChildtNode] = node;
				if (indexNode != -1) {
					this.parentNodes[indexNode] = node.right;
				}
			}

			node.right.swapWithParent();
			this.shiftNodeDown(node);
			return;
		}
		if (node.left.priority > node.priority) {
			if (this.root == node) {
				this.root = node.left;
			}

			var indexNode = this.parentNodes.indexOf(node);
			var indexChildtNode = this.parentNodes.indexOf(node.left);

			if (indexChildtNode != -1) {
				this.parentNodes[indexChildtNode] = node;

				if (indexNode != -1) {
					this.parentNodes[indexNode] = node.left;
				}
			}
			
			node.left.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
