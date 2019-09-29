//------------------------------------------------------------------------------------------------------
// This is a dummy library if the nodes are exectued on hardware other than the uMIC.200 controller
//

const pinMax = 8;

function umic_dio_get_input_pin(pinNumber)
{
    let result = FALSE;
    if (pinNumber > pinMax)
    {
        result = TRUE;
    }
}

function umic_dio_init()
{

}

function umic_dio_set_direction_pin()
{

}

function umic_dio_set_output_pin()
{
    
}

function umic_info_get_library_version()
{
    
}

function umic_info_get_serial_cpu()
{
   
}

function umic_info_get_system_temperature()
{   
    return 260;
}
    

module.exports = {
    dio_get_input_pin           : umic_dio_get_input_pin,
    dio_init                    : umic_dio_init,
    dio_set_direction_pin       : umic_dio_set_direction_pin,
    dio_set_output_pin          : umic_dio_set_output_pin,
    info_get_library_version    : umic_info_get_library_version,
    info_get_serial_cpu         : umic_info_get_serial_cpu,
    info_get_system_temperature : umic_info_get_system_temperature
}
