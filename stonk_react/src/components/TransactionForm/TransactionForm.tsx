import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseDates, chooseTicker, chooseTransactedPrice, chooseTransactedShares } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface TransactionFormProps {
    id?:string;
    data?:{}
}

interface TransactionState {
    ticker: string;
    transacted_price: number;
    transacted_shares: number;
    transacted_investment: number;
    dates: Date;
}

export const TransactionForm = (props:TransactionFormProps) => {
    const dispatch = useDispatch();
    let { stonkData, getData } = useGetData();
    const store = useStore()
    const ticker = useSelector<TransactionState>(state => state.ticker)
    const transacted_price = useSelector<TransactionState>(state => state.transacted_price)
    const transacted_shares = useSelector<TransactionState>(state => state.transacted_shares)
    const dates = useSelector<TransactionState>(state => state.dates)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log('line 34')
        // if( props.id!){
        //     server_calls.update(props.id!, data)
        //     console.log(`Updated:${data} ${props.id}`)
        //     window.location.reload()
        //     event.target.reset();
        // } else {
            dispatch(chooseTicker(data.ticker))
            console.log(data.ticker)
            dispatch(chooseTransactedPrice(data.transacted_price))
            dispatch(chooseTransactedShares(data.transacted_shares))
            dispatch(chooseDates(data.dates))
            await server_calls.create(store.getState())
            window.location.reload()
        // }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="ticker">Ticker</label>
                    <Input {...register('ticker')} name="ticker" placeholder='Ticker' />
                </div>
                <div>
                    <label htmlFor="transacted_price">Transacted Price</label>
                    <Input {...register('transacted_price')} name="transacted_price" placeholder="Transacted Price"/>
                </div>
                <div>
                    <label htmlFor="transacted_shares">Transacted Shares</label>
                    <Input {...register('transacted_shares')} name="transacted_shares" placeholder="Transacted Shares"/>
                </div>
                <div>
                    <label htmlFor="dates">Date</label>
                    <Input {...register('dates')} name="dates" placeholder="Date"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}