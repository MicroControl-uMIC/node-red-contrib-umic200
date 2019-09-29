/*jshint esversion: 6 */ 

//------------------------------------------------------------------------------------------------------
//Try to load the umic library
//
let umic = '';
try
{
    umic = require('/usr/local/lib/node_modules/umic2');
} 
catch (error)
{
    umic = require('./libs/umic200');
}



module.exports = function(RED) {
	
    function UmicTempNode(config) {
        RED.nodes.createNode(this,config);
        
        var node = this;
        this.pin=config.pin;
        this.outputs=config.outputs;
        
       
        setInterval(function() {
          node.emit("input", {});
        }, 1000);

        node.on('input', function(msg) {
            let result = umic.info_get_system_temperature();
            msg.payload=result;
            node.send(msg);
        });

    }
    
    RED.nodes.registerType("umic-temp",UmicTempNode);
};


/*
module.exports = function (RED) {
	"use strict";
	
    class UmicTempNode {

        constructor(config) {
            RED.nodes.createNode(this, config);
            this.topic = config.topic;
            this.pin=config.pin;
            this.outputs=config.outputs;
            this.on('input', this.input);
            this.on('close', this.close);
            //setInterval(this.trigger, 1000);
            setInterval(function() {
                //emit("input", {});
            }, 1000);
        }
        
        //---
        // this method is called when the node is being stopped, e.g. a new flow
        // cofiguration is deployed
        //
        close() {
            RED.log.info('close called with ' + done);
        	//done();
        	
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
        	RED.log.info('bongo ');
        	var self = this;
        	setImmediate(function() {
        	    //self.emit("input", {});
        	}
        	);
        	//node.emit();
        	// var newMsg = { payload: msg.payload.length }; --> this does not work
        }
    }
    
    RED.nodes.registerType('umic-temp', UmicTempNode);
}
*/