/*jshint esversion: 6 */ 

const umic = require ('/home/umic/.node-red/node_modules/umic/build/Release/umic.node');

module.exports = function(RED) {
    function UmicReadPin(config) {
        RED.nodes.createNode(this,config);
        
        var node = this;
        this.pin=config.pin;
        this.outputs=config.outputs;
        
        node.on('input', function(msg) {
            let result = umic.dio_get_input_pin(parseInt(this.pin));
            msg.payload=result;
            node.send(msg);
        });
        
    }
    RED.nodes.registerType("readPin",UmicReadPin);
};

