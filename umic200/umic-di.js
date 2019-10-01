/*jshint esversion: 6 */

"use strict";

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
    umic = require('/usr/local/lib/umic.node');
    info = umic.info_get_library_version();
} 
catch (error)
{
    umic = require('./libs/umic200');
    info = umic.info_get_library_version();
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

            this.inputNumber = config.inputNumber;
            this.inputState  = false;
            
            this.on('input', this.input);
            this.on('close', this.close);
            
            //---------------------------------------------------------------------------
            // The intervalTime determines how often the digital input is sampled 
            //
            this.intervalTime = 1500;
            this.interval_id  = null;
            this.interval_id  = setInterval(function() 
            {
                node.emit("input", {});
            }, this.intervalTime);
        }
        
        //------------------------------------------------------------------------------------
        // This method is called when the node is being stopped, e.g. a new flow
        // configuration is deployed
        //
        close() 
        {
        	//---------------------------------------------------------------------------
        	// Stop the interval timer
        	//
            if (this.interval_id != null) 
            {
                clearInterval(this.interval_id);
            }
            
        }
         
        //------------------------------------------------------------------------------------
        // Get the state of the digital input
        //
        input(msg) 
        {
            let result = umic.dio_get_input_pin(parseInt(this.inputNumber) - 1);
            if (result != this.pinState)
            {
                this.pinState = result;
                msg.payload = this.pinState;
                this.send(msg);
            }
        }
        
    }
    
    RED.nodes.registerType('umic-dio in', UmicDiNode);
}

