/*const fetchSummoner = async () =>{
    const url = `/api`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
}
    */
function findSummoner(){
    fetchSummoner(document.getElementById("namebox").value,document.getElementById("tagbox").value)
}
async function fetchSummoner(summonerName,summonerTag){
    const url = `/api?name=${summonerName}&tag=${summonerTag}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    //summoner info
    document.getElementById("profile").src = "https://ddragon.leagueoflegends.com/cdn/14.14.1/img/profileicon/" + data.summonerinfo.profileIconId + ".png"
    document.getElementById("summonername").textContent = "Summoner Name: " + summonerName + "#" + summonerTag;
    document.getElementById("summonerlevel").innerHTML = "Summoner Level: " + data.summonerinfo.summonerLevel;

    
}