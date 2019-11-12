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
            const node = this;

            let inputNumber = config.inputNumber;
            let inputState  = false;
            
            node.on('input', node.input);
            node.on('close', node.close);
            
            //---------------------------------------------------------------------------
            // this is neccassary to store objects within node to access it in other
            // functions
            //
            const context = node.context();
            
            //---------------------------------------------------------------------------
            // keep the context
            //
            context.set('inputNumber', inputNumber);
            context.set('inputState'  , inputState);
            context.set('node'  , node);
            
            //---------------------------------------------------------------------------
            // The intervalTime determines how often the digital input is sampled 
            //
            node.intervalTime = 100;
            node.interval_id  = null;
            node.interval_id  = setInterval(function() 
            {
                node.emit("input", {});
            }, node.intervalTime);
        }
        
        //------------------------------------------------------------------------------------
        // This method is called when the node is being stopped, e.g. a new flow
        // configuration is deployed
        //
        close() 
        {
            //---------------------------------------------------------------------------
            // neccassary to access context storage
            //
            let context = this.context();
            
            //---------------------------------------------------------------------------
            // read context variable
            //
            const node = context.get('node');
            //---------------------------------------------------------------------------
            // Stop the interval timer
            //
            if (node.interval_id != null) 
            {
                clearInterval(node.interval_id);
            }
            
        }
         
        //------------------------------------------------------------------------------------
        // Get the state of the digital input
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
            const inputNumber = context.get('inputNumber');
            const node = context.get('node');
        
            let result = umic.dio_get_input_pin(parseInt(inputNumber) - 1);
            if (result != this.inputState)
            {
                this.inputState = result;
                msg.payload = result;
                msg.topic   = 'umic-dio/' + inputNumber;
                node.send(msg);
            }
        }
        
    }
    
    RED.nodes.registerType('umic-dio in', UmicDiNode);
}

