class Date{

    constructor({day, month, year}){
        if(day<0 || month<0 || year<0)
            //Greska
        
        if(day>31)
            day = 31
        
        if(month>12)
            month = 12

        
        if(day<10)
            this.day = `0${day}`
        else
            this.day = `${day}`


        this.month = month
        this.year = year
    }

    getDay(){
        return this.day
    }
    getMonthNumber(){
        return this.month
    }
    getMonthAbbr(){

    }
    getYear(){
        return this.year
    }

    toString(format){

        return `${this.day} ${this.month} ${this.year}`
    }
    toString(){
        return `${this.day} ${this.month} ${this.year}`
    }


}