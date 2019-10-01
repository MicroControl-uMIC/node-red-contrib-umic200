/*jshint esversion: 6 */ 

"use strict";

    
//------------------------------------------------------------------------------------------------------
//Try to load the umic library
//
let umic = '';
try
{
    umic = require('/usr/local/lib/umic.node');
} 
catch (error)
{
    umic = require('./libs/umic200');
}


module.exports = function (RED) {
    
    //---------------------------------------------------------------------------------------------
    // Definition of class 'UmicTempNode'
    //
    class UmicTempNode {

        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            
            this.on('input', this.input);
            this.on('close', this.close);
            
            //---------------------------------------------------------------------------
            // The intervalTime determines how often the temperature is sampled 
            //
            this.intervalTime = 2000;
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
        // Get the value of the system temperature
        //
        input(msg) 
        {
            let result = umic.info_get_system_temperature();
            msg.payload = result;
            this.send(msg);
        }
        
    }
    
    RED.nodes.registerType('umic-temp', UmicTempNode);
}

