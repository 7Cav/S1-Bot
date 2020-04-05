const moment = require('moment');
// Class to make life easier
export class Person {
    // How constructors are used: var something = Person(constructor, items, here);
    // This is very similar to how C# works if you ever get into it.
    constructor(date) {
        // Set the Person.inputYear to the year. Do the same with month and day
        this.inputDate = date;
        this.today = moment();
    }

    // Variables for the Person
    firstName = ''
    lastName = ''
    milpac = ''
    shortRank = ''

    // Functions for the Person
    fullName = function() {
        return this.firstName + " " + this.lastName;
    }

    // We are outside the class now
    // Create promotion finder: https://github.com/7Cav/CAV-Promotion-GCM/blob/master/Personnel.py#L65
    // Get all possible promotions up until input date.
    pfcArr = [];
    spcArr = [];
    cplArr = [];

    now = Date(Date.now());
    inputDate;
    // Write to file for promotions: https://github.com/7Cav/CAV-Promotion-GCM/blob/master/Personnel.py#L344
}