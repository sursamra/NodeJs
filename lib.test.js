const { TestScheduler } = require('jest');
const lib = require('./lib');
const db = require('./db');
const mail = require('./mail');
describe('absolute',()=>{

    it('should return a positive num if input is positive',()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    it('should return a positive num if input is negative',()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    it('should return a 0 if input is 0',()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet',()=>{
    it('should return the greeting message',()=>{
        const result = lib.greet('Surjit');
        expect(result).toMatch(/Surjit/);
        expect(result).toContain('Surjit');
    });
});

describe('currency',()=>{
        it('should return supported currencies',()=>{
                    const result = lib.getCurrencies();
                        // proper way
                            expect(result).toContain('USD');
                            expect(result).toContain('GBP');
                            expect(result).toContain('EUR');

                            // ideal way
                            expect(result).toEqual(expect.arrayContaining(['EUR','GBP','USD']));

                    });
});

describe('getProduct',()=>{
    it('should return the product with the given id',()=>{
                const result = lib.getProduct(1);
                        expect(result).toEqual({id:1,price:10});
                        expect(result).toMatchObject({id:1,price:10});
                        expect(result).toHaveProperty('id',1);
    });
});
describe('registerUser',()=>{
        it('should throw if username is falsy',()=>{
            //Null
            //undefined
            //Nan
            // ''
            //0
            //false
            const args = [null,undefined,NaN,'',0,false];
            args.forEach(a=>{
                expect(()=>{lib.registerUser(null)}).toThrow();    
            });            
        });
        it('should return a user object if valid username is passed',()=>{
            const result = lib.registerUser('Surjit');
            expect(result).toMatchObject({username:'Surjit'});
            expect(result.id).toBeGreaterThan(0);

        });
});

    describe('applyDiscount',()=>{
            it('should apply 10% discount if customer has more than 10 points',()=>{
                db.getCustomerSync = function(customerId){
                    console.log('fake reading');
                    return {id:customerId,points:20};
                }
                const order = {customerId:1, totalPrice:10};
                lib.applyDiscount(order);
                expect(order.totalPrice).toBe(9)
            });
        });

describe('notifyCustomer',()=>{
        it('should send an email to customer',()=>{
            
            db.getCustomerSync = jest.fn().mockReturnValue({email:'a'});
            mail.send =jest.fn();
            /*db.getCustomerSync = function(customerId){
                return { email:'a'}
            }
            let mailSent = false;
            mail.send = function(email,message){
                mailSent = true;
            }*/
            lib.notifyCustomer({customerId:1});
            //expect(mailSent).toBe(true);
            expect(mail.send).toHaveBeenCalled();
            expect(mail.send.mock.calls[0][0]).toBe('a'); //check first argument as 'a'
            expect(mail.send.mock.calls[0][1]).toMatch(/order/); // check 2nd argument contains 'order'
    });
});
