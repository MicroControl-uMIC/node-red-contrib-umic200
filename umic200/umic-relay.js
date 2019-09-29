/*jshint esversion: 6 */ 

//------------------------------------------------------------------------------------------------------
// Try to load the umic library
//
let umic = '';
let info = '';
try
{
  umic = require('/usr/local/lib/node_modules/umic');
} 
catch (error)
{
  umic = require('./libs/umic200');
}

module.exports = function(RED) {
    function UmicRelay(config) {
        RED.nodes.createNode(this,config);
        
        var node = this;
        this.setTo=config.setTo;
        
        node.on('input', function(msg) {
        	
        		if(this.setTo === "ON"){
        			umic.relay_on();
        		}
        		
        		if(this.setTo === "OFF"){
        			umic.relay_off();
        		}
        		
        		msg.payload='done';
            node.send(msg);
        });
        
    }
    RED.nodes.registerType("umic-relay", UmicRelay);
};

