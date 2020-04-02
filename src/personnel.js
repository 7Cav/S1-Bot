class Person {
    constructor(milpac, fName, lName, shRank) {
        this.milpacLink = milpac;
        this.firstName = fName;
        this.lastName = lName;
        this.shorthandRank = shRank;
    }

    set setMilpac(link) {
        this.milpacLink = link;
    }

    get getMilpac() {
        return this.milpacLink;
    }
}