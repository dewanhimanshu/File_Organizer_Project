let fs = require("fs");
let path = require("path");
let utility = require('../Utility/utility.js')
function organizer(directory_path){
  //User did not provide directory_path so take current dirrectory as default
  if(directory_path == undefined){
        directory_path = process.cwd();
        dest_path_dir = create_destination_directory(directory_path);
        organizer_helper(directory_path,dest_path_dir);
    }else{
        //Check if directory_path exist
        let dir_exist =  fs.existsSync(directory_path);
        if(dir_exist){
            dest_path_dir = create_destination_directory(directory_path);
            organizer_helper(directory_path,dest_path_dir);
        }else{
            console.log("Kindly enter the correct path");
        }
    }
}
function create_destination_directory(directory_path){
    //Create organized directory
    dest_path_dir = path.join(directory_path, "organized_files");
    if (fs.existsSync(dest_path_dir) == false) {
        fs.mkdirSync(dest_path_dir);
    }
    return dest_path_dir;
}
function organizer_helper(src,dest){
    // identify categories of all the files present in that input directory 
    let children = fs.readdirSync(src);
    for (let i = 0; i < children.length; i++) {
        let child_path = path.join(src, children[i]);
        //Only files are organized 
        let is_file = fs.lstatSync(child_path).isFile();
        if (is_file) {
            let category = get_category(child_path);
            console.log(child_path, "belongs to --> ", category);
            //  copy / cut  files to that organized directory inside of any of category folder 
            send_files(child_path, dest, category);
        }
    }
}
function get_category(name) {
    let ext = path.extname(name);
    ext = ext.slice(1); //Remove . in the extention name
    for (let type in utility.types) {
        let cTypeArray = utility.types[type];
        for (let i = 0; i < cTypeArray.length; i++) {
            if (ext == cTypeArray[i]) {
                return type;
            }
        }
    }
    return "others";
}
function send_files(src_file_path, dest, category) {
    let category_path = path.join(dest, category);
    //If category directory/folder does not exist create it first
    if (fs.existsSync(category_path) == false) {
        fs.mkdirSync(category_path);
    }
    //How does cut copy work
    // -> we create a empty file with same name on destination
    // -> contents of original file is copied in empty file
    // -> Original file is deleted
    let file_name = path.basename(src_file_path);
    let dest_file_path = path.join(category_path, file_name);
    //Copy the content
    fs.copyFileSync(src_file_path, dest_file_path);
    //Delete the file
    //fs.unlinkSync(src_file_path);
    console.log(src_file_path, "copied to ", category);

}

module.exports = {
    organizer : organizer
};
