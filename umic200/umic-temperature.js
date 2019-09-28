/*jshint esversion: 6 */ 

//------------------------------------------------------------------------------------------------------
//Try to load the umic library
//
let umic = '';
//require('/usr/local/lib/node_modules/umic');
try
{
    umic = require('/usr/local/lib/node_modules/umic2');
} 
catch (error)
{
    umic = require('./libs/umic_dummy');
    console.log('Using umic dummy libary');
}



/*
module.exports = function(RED) {
	RED.log.info('node-red-contrib-umic version: ' + pkg.version);
	
    function UmicGetSystemTemperature(config) {
        RED.nodes.createNode(this,config);
        
        var node = this;
        this.pin=config.pin;
        this.outputs=config.outputs;
        
        node.on('input', function(msg) {
            let result = umic.info_get_system_temperature();
            msg.payload=result;
            node.send(msg);
        });

    }
    
    RED.nodes.registerType("temp",UmicGetSystemTemperature);
};
*/

module.exports = function (RED) {
	
    class UmicTempNode {
        constructor(config) {
            RED.nodes.createNode(this, config);
            this.pin=config.pin;
            this.outputs=config.outputs;
            
            this.on('input', this.input);
            this.on('close', this.destructor);
            
            setInterval(this.trigger, 1200);
        }
        
        destructor(done){
        	done();
        	
        }
        
        output(msg) {
        	let result = umic.info_get_system_temperature();
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
        	// var newMsg = { payload: msg.payload.length }; --> this does not work
        }
    }
    
    RED.nodes.registerType('temp', UmicTempNode);
}
