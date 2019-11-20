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
            const node = this;
                        
            let outputNumber = config.outputNumber;
            
            umic.dio_set_direction_pin(outputNumber - 1, true);
            
            this.on('input', node.input);
            this.on('close', node.close);
            
            //---------------------------------------------------------------------------
            // this is neccassary to store objects within node to access it in other
            // functions
            //
            const context = node.context();
            
            //---------------------------------------------------------------------------
            // keep the context
            //
            context.set('outputNumber'  , outputNumber);
            context.set('node'  , node);
            
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
            //---------------------------------------------------------------------------
            // neccassary to access context storage
            //
            let context = this.context();
            //---------------------------------------------------------------------------
            // read context variable
            //
            const outputNumber = context.get('outputNumber');
        
            umic.dio_set_output_pin(outputNumber - 1, msg.payload);
        }
        
    }
    
    RED.nodes.registerType('umic-dio out', UmicDoNode);
}

