/*jshint esversion: 6 */ 

//const umic = require ('umic.node');
const umic = require ('/Users/koppe/Projekte/uMIC-Lib/nodejs/build/Release/umic.node');

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

