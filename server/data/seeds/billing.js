
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('billing').del()
    .then(function () {
      // Inserts seed entries
      return knex('billing').insert([
        {id: 1, street: '1234 any st', city: 'san diego', state: 'CA', country: 'usa', zipcode: 92119, mailingStreet: '453 anywhere st', mailingCity: 'los angeles', mailingState: 'CA', mailingZipcode: '99990', mailingCountry: 'usa', ccn: '1111222233334444', expireMonth: 01, expireYear: 2020, code: 123, monthlyBill: 200, accountStatus: 'ok', targetsUsed: 2, accountType: 1, mobilePhone: '1234567890', homePhone: '8421236543' },
        {id: 2, street: '1234 this st', city: 'dallas', state: 'TX', country: 'usa', zipcode: 92229, mailingStreet: '1401 somewhere st', mailingCity: 'dallas', mailingState: 'TX', mailingZipcode: '99990', mailingCountry: 'usa', ccn: '1111222233334444', expireMonth: 02, expireYear: 2019, code: 456, monthlyBill: 100, accountStatus: 'bad', targetsUsed: 6, accountType: 2, mobilePhone: '5234567890', homePhone: '6547651234' },
        {id: 3, street: '1234 that st', city: 'new york', state: 'NY', country: 'usa', zipcode: 92349, mailingStreet: '4053 where st', mailingCity: 'new york', mailingState: 'NY',  mailingZipcode: '99990', mailingCountry: 'usa', ccn: '1111222233334444', expireMonth: 03, expireYear: 2021, code: 789, monthlyBill: 50, accountStatus: 'ok', targetsUsed: 4, accountType: 3, mobilePhone: '9234567890', homePhone: '7531546172' },
      ]);
    });
};


