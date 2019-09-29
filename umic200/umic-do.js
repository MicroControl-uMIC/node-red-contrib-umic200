/*jshint esversion: 6 */


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



module.exports = function (RED) {
    
    
    //---------------------------------------------------------------------------------------------
    // Definition of class 'UmicDoNode'
    //
    class UmicDoNode {
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
    
    RED.nodes.registerType('umic-dio out', UmicDoNode);
}

