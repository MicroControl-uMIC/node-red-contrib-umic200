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



module.exports = function(RED) {
    
    //---------------------------------------------------------------------------------------------
    // Definition of class 'UmicRelay'
    //
    class UmicRelay {
        
        //------------------------------------------------------------------------------------
        // Constructor
        //
        constructor(config) 
        {
            RED.nodes.createNode(this, config);
            
            this.outputNumber = config.outputNumber;
            
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
        // Set the state of the relay
        //
        input(msg) 
        {
            if (msg.payload === false)
            {
                umic.relay_off();
            }
            
            if (msg.payload === true)
            {
                umic.relay_on();
            }
            
        }
        
    }
    
    RED.nodes.registerType("umic-relay", UmicRelay);
};

