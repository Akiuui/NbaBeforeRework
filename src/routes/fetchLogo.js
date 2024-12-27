import axios from "axios"

export default async function fetchLogo({name, year}) {

    let res = await axios.get(`https://nbalogosapi-1.onrender.com/nbalogos?teamName=${name}&teamYear=${year}`)

    return res
}