const express = require('express');
const router = express.Router();
const printer = require("printer"), util = require('util');
// const filename = "printme.txt";

// console.log("installed printers:\n"+util.inspect(printer.getPrinters(), {colors:true, depth:10}));

router.post('/test', (req, res) => {

   console.log('platform:', process.platform);

   const { fileName, url, defaultPrinter } = req.body;

   if (process.platform != 'win32') {
      printer.printFile({
         filename: fileName,
         printer: process.env[3], // printer name, if missing then will print to default printer
         // printer: process.env[3], // printer name, if missing then will print to default printer
         success: function (jobID) {
            console.log("sent to printer with ID: " + jobID);
         },
         error: function (err) {
            console.log(err);
         }
      });
   } else {
      // not yet implemented, use printDirect and text
      var fs = require('fs');
      printer.printDirect({
         data: fs.readFileSync(filename),
         printer: process.env[3], // printer name, if missing then will print to default printer
         success: function (jobID) {
            console.log("sent to printer with ID: " + jobID);
         },
         error: function (err) {
            console.log(err);
         }
      });
   };
   res.send(`defaultPrinter: ${defaultPrinter}, url: ${url}, file: ${fileName}`);
})

module.exports = router;