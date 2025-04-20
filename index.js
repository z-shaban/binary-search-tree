class Node{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree{
  constructor(arr){
    this.root = buildTree(arr)
  }

  insert(value){
    this.root = insertRec(this.root, value)
  }

  delete(value){
    this.root = deleteValue(this.root, value)
  }
 
}

function deleteValue(root, value){
   if (root == null) return root;
    
   else if (value > root.data){
    root.right = deleteValue(root.right, value)
   }else if(value < root.data){
    root.left = deleteValue(root.left, value)
   }else{
    /*case 1 : if value is a leaf node*/
    if(!root.right && !root.left){
      return null;
    }
    /*case 2: one child*/
   else if(root.right == null){root = root.left}
   else if(root.left == null){root = root.right}

    /*case 3: two children*/
    else{
      let successor = getSuccessor(root);
      root.data = successor.data;
      root.right = deleteValue(root.right, successor.data)
    }
   }

   return root;
}

function getSuccessor(value){
  value = value.right;
  while(!value == null && !value.left == null){
   value = value.left;
  }
  return value;
}

function insertRec(root, value){
    if (root == null) return new Node(value);

    if (root.data === value)
        return root;

    if(value < root.data){
        root.left = insertRec(root.left, value)
    }else if(value > root.data){
        root.right = insertRec(root.right, value)
    }return root;
  }

function buildTree(arr){
    const cleanedArr = [...new Set(arr)].sort((a,b)=> a-b)
    if (cleanedArr.length === 0) return null;

   const mid = Math.floor(cleanedArr.length/2)
   const root = new Node(cleanedArr[mid])

   root.left = buildTree(cleanedArr.slice(0, mid))
   root.right = buildTree(cleanedArr.slice(mid + 1))

   return root
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const tree = new Tree([9,8,8,5,4,3,2]);
  tree.delete(3)
  prettyPrint(tree.root)
 