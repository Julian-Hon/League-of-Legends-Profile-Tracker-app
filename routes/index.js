const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')


// Env Vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async (req,res) =>{
    try{
        console.log(url.parse(req.url, true).query)
        
        const params2 = url.parse(req.url, true).query
        const name= params2.name;
        const tag = params2.tag;
        const params= new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,

        })
        
        const apiRes = await needle('get', `${API_BASE_URL}${name}/${tag}?${params}`)
        const account = apiRes.body
        const pid = account.puuid
        const apiRes2 = await needle('get',`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${pid}/ids?start=0&count=20&${params}`)
        const matches = apiRes2.body
        const apiRes3 = await needle('get', `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${pid}?${params}`)
        const summonerinfo = apiRes3.body
        const apiRes4 = await needle('get', `https://americas.api.riotgames.com/lol/match/v5/matches/${matches[0]}?${params}`)
        const matchdata = apiRes4.body;
        var playerindex = matchdata['metadata']['participants'].indexOf(pid);
        var kills = matchdata['info']['participants'][playerindex]['kills'];
        var deaths = matchdata['info']['participants'][playerindex]['deaths'];
        var assists = matchdata['info']['participants'][playerindex]['assists'];
        //log request to the public API
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_BASE_URL}${name}/${tag}?${params}`)
        }
        res.status(200).json({account,matches,summonerinfo, matchdata})
    }catch(error){
        res.status(500).json({error})
    }


})

module.exports=router