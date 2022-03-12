import axios from "axios";
import React, { useState, useEffect } from "react";
import { server_calls } from '../api';

var nowDate = new Date(); 
var date = nowDate.getFullYear()+'-0'+(nowDate.getMonth()+1)+'-'+(nowDate.getDate()-1); 

export const useGetData = () => {
    const [ stonkData, setData ] = useState<any>([]);

    async function handleDataFetch(){
        const result = await server_calls.get_p();

        // external api data
        const apiresult = await Promise.all(result.map(async (result:any) => {
            const symbol = result['ticker']
            // try{
                const api =  await axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=AT7AY09V00DSTXKE`)
                result.company = api.data.Name
                result.industry = api.data.Sector

            // }catch(e){
                // result.company = 'loading'
                // result.industry = 'loading'
            // }
            // try{
            const price = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${date}/${date}?adjusted=true&sort=asc&limit=120&apiKey=OSzsAVcDBJNUzZdronBnIwgBNH1fCXPe`)
            result.price = price.data.results[0].c
            result.return = (result.price/result.avg_price)-1
            result.equity = result.price*result.shares
            result.gl = result.investment - result.equity
            console.log(price)
            // }catch(e){
            //     result.price = 'loading'
            //     result.return = 'loading'
            //     result.equity = 'loading'
            //     result.gl = 'loading'
            // }

            return api.data
            
        }))

        console.log(result)

        console.log(apiresult)

        setData(result)
    }

    useEffect( () =>{
        handleDataFetch(); 
    }, [])

    return {stonkData, getData:handleDataFetch}
}

export const useGetData_t = () => {
    const [ transData, setData ] = useState<any>([]);

    async function handleDataFetch_t(){
        const result_t = await server_calls.get_t();
        console.log(result_t)
        setData(result_t)
    }

    useEffect( () =>{
        handleDataFetch_t(); 
    }, [])

    return {transData, getTransData:handleDataFetch_t}
}



