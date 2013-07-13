#!/usr/bin/env node
/* 
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:
 + Cheerio
 + commander.js
 + JSON
*/

// Variables --- 
var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "";
var CHECKSFILE_DEFAULT = "checks.json";
var URLPATH_DEFAULT = "";
var noFile = false;

var assertFileExists = function(file)
{
  var instr = file.toString();
  if(!fs.existsSync(instr))
  {
    console.log("%s does not exist. Exiting.", instr);
    process.exit(1);
  }
  return instr;
};

var assertUrlExists = function(url)
{
  // Perform Check
  rest.get(url).on('complete', function(result) {
  if (result instanceof Error)
  {
    console.log("%s doesn't exist. Exiting.");
    process.exit(1);
  }
  else
  {
    return result;
  }
  });
};

var cheerioHtmlFile = function(htmlfile)
{
  return cheerio.load(fs.readFileSync(htmlfile));
};

var cheerioUrl = function(url)
{
  return cheerio.load(url);
};

var loadChecks = function(checksfile)
{
  return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile)
{
  $ = cheerioHtmlFile(htmlfile);
  var checks = loadChecks(checksfile).sort();
  var out = {};
  for(var ii in checks) 
  {
    var present = $(checks[ii]).length > 0;
    out[checks[ii]] = present;
  }
  return out;
};

var checkUrlFile = function(urlfile, checksfile)
{
  $ = cheerioUrl(urlfile);
  var checks = loadChecks(checksfile).sort();
  var out = {};
  for(var ii in checks)
  {
    var present = $(checks[ii]).length > 0;
    out[checks[ii]] = present;
  }
  return out;
};

var clone = function(fn)
{
  // Workaround for commander.js issue
  // http://stackoverflow.com/a/6772648
  return fn.bind({});
};

if (require.main == module)
{
  program
    .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
    .option('-f, --file <html_file>', 'Path to index.html', HTMLFILE_DEFAULT)
    .option('-u, --url <url_link>', 'URL Path', URLPATH_DEFAULT)
    .parse(process.argv);
  if (program.file)
  {
    var checkfileJson = checkHtmlFile(program.file, program.checks);
    var outfileJson = JSON.stringify(checkfileJson, null, 4);
    console.log(outfileJson);
  }
  if (program.url)
  {
    var checkurlJson = checkUrlFile(program.url, program.checks);
    var outurlJson = JSON.stringify(checkurlJson, null, 4);
    console.log(outurlJson);
  }
}
else
{
  exports.checkHtmlFile = checkHtmlFile;
}
