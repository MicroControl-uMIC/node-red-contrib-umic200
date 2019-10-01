//------------------------------------------------------------------------------------------------------
// This is a dummy library if the nodes are exectued on hardware other than the uMIC.200 controller
//

"use strict";

const pinMax = 8;
let   temperature = 25;
let   tempChange  = 1;
let   port = 0;
let   direction = 0;


//------------------------------------------------------------------------------------------------------//
// umic_dio_get_input_pin()                                                                             //
//
//------------------------------------------------------------------------------------------------------//
function umic_dio_get_input_pin(pinNumber)
{
    let result = false;
    if (pinNumber > pinMax)
    {
        result = true;
    }
    
    return result;
}


//------------------------------------------------------------------------------------------------------//
// umic_dio_init()                                                                                      //
//
//------------------------------------------------------------------------------------------------------//
function umic_dio_init()
{
    port = 0;
    direction = 0;
}


//------------------------------------------------------------------------------------------------------//
//umic_dio_init()                                                                                      //
//
//------------------------------------------------------------------------------------------------------//
function umic_dio_set_direction_pin(pinNumber)
{

}

//------------------------------------------------------------------------------------------------------//
// umic_dio_set_output_pin()                                                                                      //
//
//------------------------------------------------------------------------------------------------------//
function umic_dio_set_output_pin(pinNumber, value)
{
    
}

//------------------------------------------------------------------------------------------------------//
// umic_info_get_library_version()                                                                                      //
//
//------------------------------------------------------------------------------------------------------//
function umic_info_get_library_version()
{
  return 'This is the fake lib';    
}


//------------------------------------------------------------------------------------------------------//
// umic_info_get_serial_cpu()                                                                                      //
//
//------------------------------------------------------------------------------------------------------//
function umic_info_get_serial_cpu()
{
   
}


//------------------------------------------------------------------------------------------------------//
// umic_info_get_system_temperature()                                                                   //
//
//------------------------------------------------------------------------------------------------------//
function umic_info_get_system_temperature()
{   
    
    if (temperature > 45)
    {
        tempChange = -1;
    }

    if (temperature < 25)
    {
        tempChange = 1;
    }

    temperature = temperature + tempChange;
    return temperature;
}


//------------------------------------------------------------------------------------------------------//
// umic_relay_off()                                                                                     //
//
//------------------------------------------------------------------------------------------------------//
function umic_relay_off(relayNumber)
{

}


//------------------------------------------------------------------------------------------------------//
// umic_relay_on()                                                                                      //
//
//------------------------------------------------------------------------------------------------------//
function umic_relay_on(relayNumber)
{

}


//---------------------------------------------------------------------------------------
// Definition of exports
//
module.exports = {
    dio_get_input_pin           : umic_dio_get_input_pin,
    dio_init                    : umic_dio_init,
    dio_set_direction_pin       : umic_dio_set_direction_pin,
    dio_set_output_pin          : umic_dio_set_output_pin,
    info_get_library_version    : umic_info_get_library_version,
    info_get_serial_cpu         : umic_info_get_serial_cpu,
    info_get_system_temperature : umic_info_get_system_temperature,
    relay_off                   : umic_relay_off,
    relay_on                    : umic_relay_on
}
