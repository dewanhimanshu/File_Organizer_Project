function help(){
    console.log(`
    List of All the commands supported:
                node main.js tree "directory_path"
                node main.js organize "directory_path"
                node main.js help
                `);
    console.log(`
    Created by : Himanshu Dewan
                `);
}
module.exports={
    help: help
}