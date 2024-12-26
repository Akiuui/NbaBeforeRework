export default function PageSizeForFetchGames() {

    let per_page
    if (window.innerHeight <= 857) {
        per_page = 3
    }
    else if (window.innerHeight <= 947) {
        per_page = 4
    }
    else if (window.innerHeight <= 1240)
        per_page = 5

    if (window.innerWidth >= 765)
        per_page = per_page * 2

    return per_page
}