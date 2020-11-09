module.exports.getCustomerSync = function (customerId) {
    console.log('reading customer form database');
    return {id:customerId,points:11};    
}
module.exports.getCustomer = async function (customerId) {
    return new Promise((resolve,reject)=>{
        console.log('Reading a customer from db async');
        resolve({id:customerId,points:11});
    });
}