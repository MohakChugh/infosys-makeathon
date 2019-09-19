const axious = require('axios');
var FormData = require('form-data');
let smsurl = 'https://2factor.in/API/V1/<TOKEN FROM 2FACTOR>/ADDON_SERVICES/SEND/PSMS';

const sendsms = async (message, phonenumber) => {
    var form = new FormData();
    form.append('From', 'Mohak Chugh');
    form.append('Msg', `${message}`);
    form.append('To', `${phonenumber}`);
    try {
        let result = await axious.post(smsurl, {
            'From': 'PROBLM',
            'Msg': `${message}`,
            'To': `${phonenumber}`
        });
        if (result) {
            console.log(`${result}`);
            return result;
        }
    } catch (error) {
        console.log(`Error in request : ${error}`);
        throw error;
    }
};
exports.sendsms = sendsms;