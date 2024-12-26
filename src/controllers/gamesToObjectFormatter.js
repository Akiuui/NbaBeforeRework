import Game from "../models/Game.js"
import Team from "../models/Team.js"


export default function gamesToObjectFormatter(data, date) {

    let gamesObjects = []

    data.map(e => {

        let obj = new Game({
            id: e.id,
            homeScore: e.home_team_score,
            visitorScore: e.visitor_team_score,
        })

        let home = new Team({id: e.home_team.id, name: e.home_team.full_name, abbr: e.home_team.abbreviation})
        let visitor = new Team({id: e.visitor_team.id, name: e.visitor_team.full_name, abbr: e.visitor_team.abbreviation})
        
        obj.setHomeTeam(home)
        obj.setVisitorTeam(visitor)
       
        gamesObjects.push(obj)

    })
    
    return gamesObjects
}