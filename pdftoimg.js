const pdfPoppler = require('pdf-poppler');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const express = require('express');

const zip=require('./zip')

async function pdfToImg(fileName){
  fileName=fileName.slice(0, -4);


const pdfPath = './uploads/'+fileName+'.pdf'; //  PDF file path

const opts = {
  format: 'jpg', // output format (png, jpg, tiff, etc.)
  out_dir: './output' ,// Output directory for the image
};

await pdfPoppler.convert(pdfPath, opts)
  .then(async (result) => {
    // console.log('Successfully converted PDF to image:', result);
    resolution()

  })
  .catch((error) => {
    console.error('Error converting PDF to image:', error);
  });

async function resolution(){
  const files = fs.readdirSync('./output');

      for (i=0;i<files.length;i++){
      var inputSharpPath = './output/'+files[i]; //  imput image path of sharp
      var outputSharpPath ='./output/'+fileName+i+'.jpg' // output image path of sharp
      // console.log(inputSharpPath)
      await sharp(inputSharpPath)
      .resize({ width: 1200, height: 1600 }) // Set the desired resolution
      .toFile(outputSharpPath);

      fs.unlink(inputSharpPath, (error) => {
        if (error) {console.log(error,"⬅️ error in deleting ➡️",inputSharpPath);}
      });
      
      }
    // console.log('Image resolution adjusted.');
    fs.unlinkSync("./uploads/"+fileName+".pdf");
    await zip(fileName)
    // await sendZipFile(fileName) 
}

}

module.exports=pdfToImg