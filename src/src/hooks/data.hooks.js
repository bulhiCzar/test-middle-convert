import {useCallback, useEffect, useMemo, useState} from "react";
import {useHttp} from "./http.hooks";

const storageName = 'bulhiStorage'

export const useData = () => {
    const {request} = useHttp()
    // const [coins, setCoins] = useState([{CoinInfo: '', RAW: '', DISPLAY: ''}])
    const [coins, setCoins] = useState([])
    const [likeCoins, setLikeCoins] = useState([])

    const setLikesCoins = useCallback((name) => {
        let arr = likeCoins

        let filtered = []
        filtered = arr.concat(name)

        arr.forEach(item=>{
           if (item === name)
               filtered = arr.filter(i=>i!==name)
        })

        if (arr.length === 0){
            filtered = arr.concat(name)
        }

        setLikeCoins(filtered)
        localStorage.setItem(storageName, JSON.stringify(filtered))
    }, [likeCoins])




    useEffect(() => {
        (() => {
            const data = JSON.parse(localStorage.getItem(storageName))
            if (data && data.length > 0)
                return setLikeCoins(data)
        })()
    }, [setLikeCoins])

    const resCoins = useMemo(async ()=>{
        const headers = {
            authorization: 'Apikey 6c5fb9c433f708764bacf8f7e06dfc80c13ab49dbe1722de2edeff9c1ad51a3c'
        }
        const res = await request('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD', 'GET', null, headers)
        return res.Data
    }, [request])

    useEffect(() => {
        (async () => {
            let arr = await resCoins
            arr = arr.map((item, idx)=>{
                item.like = false
                for(let i=0; i <= likeCoins.length; i++){
                    if (likeCoins[i] === item.CoinInfo.Name)
                        item.like = true
                }
                return item
            })
            setCoins(arr)
        })()
    }, [likeCoins, resCoins])

    return {likeCoins, coins, setLikesCoins, }
}