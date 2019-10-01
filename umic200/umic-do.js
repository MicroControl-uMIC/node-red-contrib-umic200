/*jshint esversion: 6 */

"use strict";

//------------------------------------------------------------------------------------------------------
// Try to load the umic library
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
    // Definition of class 'UmicDoNode'
    //
    class UmicDoNode {
        
        //------------------------------------------------------------------------------------
        // Constructor
        //
        constructor(config) 
        {
            RED.nodes.createNode(this, config);
            
            this.outputNumber = config.outputNumber;
            
            umic.dio_set_direction_pin(this.outputNumber - 1, true);
            
            this.on('input', this.input);
            this.on('close', this.close);
            
        }

        
        //------------------------------------------------------------------------------------
        // This method is called when the node is being stopped, e.g. a new flow
        // configuration is deployed
        //
        close() 
        {
            
        }
        
        //------------------------------------------------------------------------------------
        // Set the state of the digital output
        //
        input(msg) 
        {
            umic.dio_set_output_pin(this.outputNumber - 1, msg.payload);
        }
        
    }
    
    RED.nodes.registerType('umic-dio out', UmicDoNode);
}

