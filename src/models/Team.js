import axios from "axios"
import placeholderLogo from "../../public/placeholderLogo.js"
import TeamsColor from "../utils/teamsColor.js"
import fetchLogo from "../routes/fetchLogo.js"

class Team{

    constructor({id, name, abbr}){
        this.id = id
        this.name = name
        this.abbr = abbr
        this.logo = placeholderLogo
        this.color = TeamsColor(abbr);
        this.logoState = "notFetched"
    }

    async FetchLogo(year){

        try{
            let res = await fetchLogo({name: this.name, year: year})
            // const res = await axios.get(`https://nbalogosapi-1.onrender.com/nbalogos?teamName=${this.name}&teamYear=${year}`)
            this.logo = res.data[0].Base64String
            this.logoState = "fetched"
        }catch(error){

            console.error("Error fetching logo:", error);

        }


    }

}
export default Team