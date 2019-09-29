/*jshint esversion: 6 */

//------------------------------------------------------------------------------------------------------
// Required for version information of the module, this is only used in the first module
//
const path = require('path');
const fs   = require('fs');
const pkg  = require(path.join(__dirname, '..', 'package.json'));


//------------------------------------------------------------------------------------------------------
// Try to load the umic library
//
let umic = '';
let info = '';
try
{
  umic = require('/usr/local/lib/node_modules/umic');
  info = 'using native library on µMIC.200 controller';
} 
catch (error)
{
  umic = require('./libs/umic200');
  info = 'using dummy library for testing';
}


module.exports = function (RED) {
    
    //---------------------------------------------------------------------------------------------
    // show version of package
    //
    RED.log.info('node-red-contrib-umic : version ' + pkg.version);
    RED.log.info('node-red-contrib-umic : ' + info);
    
    //---------------------------------------------------------------------------------------------
    // Definition of class 'UmicDiNode'
    //
    class UmicDiNode {
        
        //------------------------------------------------------------------------------------
        // Constructor
        //
        constructor(config) 
        {
            RED.nodes.createNode(this, config);
            var node = this;

            this.pin = config.pin;
            this.interval_id = null;
            this.on('input', this.input);
            this.on('close', this.close);
            
            this.interval_id = setInterval(function() {
                node.emit("input", {});
              }, 1000);
        }
        
        //------------------------------------------------------------------------------------
        // This method is called when the node is being stopped, e.g. a new flow
        // cofiguration is deployed
        //
        close() 
        {
            if (this.interval_id != null) 
            {
                clearInterval(this.interval_id);
            }
            
        }
         
        //------------------------------------------------------------------------------------
        // 
        input(msg) 
        {
            let result = umic.dio_get_input_pin(parseInt(this.pin));
            msg.payload=result;
            this.send(msg);
        }
        
    }
    
    RED.nodes.registerType('umic-dio in', UmicDiNode);
}

