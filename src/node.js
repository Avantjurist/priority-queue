class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			node.parent = this;
		} else if (this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (node == this.right) {
			this.right = null;
			node.parent = null;
		} else if (node == this.left) {
			this.left = null;
			node.parent = null;
		} else {
			throw Error("passed node is not a child of this node");
		}

	}

	remove() {
		if (this.parent == null) return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent == null) {
			return;
		}

		var prt = this.parent;

		if (prt.parent != null) {
			var pPrt = prt.parent;

			if (pPrt.left == prt) {
				this.parent.parent.left = this;
			} else {
				this.parent.parent.right = this;
			}
		}

		var pLeft = prt.left;
		var pRight = prt.right;
		prt.left = this.left;

		if (prt.left != null) {
			prt.left.parent = prt;
			prt.right = this.right;
		}
		if (prt.right != null) {
			prt.right.parent = prt;
		}
		if (this == pLeft) {
			this.left = this.parent;
			this.right = pRight;
			if (pRight != null) { 
				pRight.parent = this; 
			}
			
		} else {
			this.left = pLeft;
			if (pLeft != null) {
				pLeft.parent = this;
			}

			this.right = this.parent;
		}

		var pPrt = this.parent.parent;
		this.parent.parent = this;
		this.parent = pPrt;

	}
}
if (typeof module != 'undefined')
module.exports = Node;
