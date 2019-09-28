/*jshint esversion: 6 */

//------------------------------------------------------------------------------------------------------
// Required for version information of the module, this is only used in the first module
//
const path = require('path');
const fs = require('fs');
const pkg = require(path.join(__dirname, '..', 'package.json'));

//------------------------------------------------------------------------------------------------------
// Try to load the umic library
//
try
{
    const umic = require('/usr/local/lib/node_modules/umic');
} 
catch (error)
{
    console.log('oh no big error');
    console.log(error);
}


/*
 * module.exports = function(RED) {
 *  //
 * ----------------------------------------------------------------------------- //
 * RED.log.info('node-red-contrib-umic version: ' + pkg.version);
 * 
 * function UmicReadPin(config) { RED.nodes.createNode(this, config);
 * 
 * var node = this; this.pin = config.pin; this.outputs = config.outputs;
 * 
 * node.on('input', function(msg) { let result =
 * umic.dio_get_input_pin(parseInt(this.pin)); msg.payload = result;
 * node.send(msg); });
 *  } RED.nodes.registerType("umic-dio", UmicReadPin); };
 */


module.exports = function (RED) {
    
    //---------------------------------------------------------------------------------------------
    // show version of package
    //
    RED.log.info('node-red-contrib-umic version: ' + pkg.version);
    
    //---------------------------------------------------------------------------------------------
    // Definition of class 'UmicDioNode'
    //
    class UmicDioNode {
        constructor(config) {
            RED.nodes.createNode(this, config);
            this.pin=config.pin;
            this.outputs=config.outputs;
            
            this.on('input', this.input);
            this.on('close', this.destructor);
            
            setInterval(this.trigger, 1200);
        }
        
        destructor(done) {
            done();
            
        }
        
        output(msg) {
            let result = umic.dio_get_input_pin(parseInt(this.pin));
            msg.payload=result;
            return msg.payload;
        }
        
        input(msg) {
            RED.log.info('bingo ');
            let result = umic.info_get_system_temperature();
            msg.payload=result;
        }
        
        trigger()
        {
            // RED.log.info('bongo ');
            // var newMsg = { payload: msg.payload.length }; --> this does not
            // work
        }
    }
    
    RED.nodes.registerType('umic-dio', UmicDioNode);
}

