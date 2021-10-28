let fs = require("fs");
let path = require("path");
function print_tree(directory_path){
    //User did not provide directory_path so take current dirrectory as default
    if(directory_path == undefined){
        directory_path = process.cwd();
        print_tree_helper(directory_path,"");
    }else{
        //Check if directory_path exist
        let dir_exist =  fs.existsSync(dirPath);
        if(dir_exist){
            print_tree_helper(directory_path,"");
        }else{
            console.log("Kindly enter the correct path");
        }
    }
}
function print_tree_helper(directory_path,indent){
    //Recursive fn to print full tree
    //Check wheter it is a file or folder
    let is_file = fs.lstatSync(directory_path).isFile();
    //If it file print is as it is
    if(is_file){
        let file_name = path.basename(directory_path);
        console.log(indent + "├──" + file_name);
    }else{
        //if is folder call this fn recursivly on all files and folders present 
        let dir_name = path.basename(directory_path)
        console.log(indent + "└──" + dir_name);
        let children = fs.readdirSync(directory_path);
        for (let i = 0; i < children.length; i++) {
            let child_path = path.join(directory_path, children[i]);
            print_tree_helper(child_path, indent + "\t");
        }
    }
}
module.exports = {
    tree: print_tree
}