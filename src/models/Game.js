class Game{

    constructor({id, homeScore, visitorScore}){
        this.id = id
        this.homeScore = homeScore
        this.visitorScore = visitorScore
        this.teams = {
            home: null,
            visitor: null
        }
    }

    setHomeTeam(team){
        this.teams.home = team
    }
    setVisitorTeam(team){
        this.teams.visitor = team
    }
    getWinner(){
        if(this.homeScore>this.visitorScore)
            return this.teams.home
        else
            return this.teams.visitor
    }
    isHomeWinner(){
        if(this.homeScore>this.visitorScore)
            return true
        else 
            return false
    }


}
export default Game