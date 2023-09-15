const zl = require("zip-lib");
const fs = require('fs');

async function zip(fileName){ 

const zip = new zl.Zip();
zip.addFolder("./output/");

await zip.archive("./zip/"+fileName+".zip").then(function () {
    // console.log("done");
}, function (err) {
    console.log(err);
})
await cleanup();
return 
}

async function cleanup(){
const files = fs.readdirSync('./output');
// console.log(files);

// // Delete each file
for (const file of files) {
  fs.unlink('./output/' + file,(error)=>{console.log(error)});
}
return
}

module.exports=zip