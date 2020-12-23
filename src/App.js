import {useEffect, useState} from "react";
import s from './App.module.css';
import {useData} from "./src/hooks/data.hooks";
import Table from './src/pages/Table'
import Convector from "./src/pages/Convector";

let selectChang = {firstInput: 1, secondInput: 1, firstBtn: '', secondBtn: ''}

function App() {
    const {coins, setLikesCoins} = useData()
    const [state, setState] = useState({
        firstInput: 1, secondInput: 1, firstBtn: '', secondBtn: ''
    })

    const setLike = (e)=>{
        const obj = {
            ...state,
            firstInput: '',
            secondInput: '',
            firstBtn: {
                value: coins[0].CoinInfo.Name,
                price: coins[0].RAW.USD.PRICE
            },
            secondBtn: {
                value: coins[0].CoinInfo.Name,
                price: coins[0].RAW.USD.PRICE
            }
        }
        console.log(e)

        selectChang = obj
        setState(obj)
        setLikesCoins(e)
    }

    const changeInput = e => {
        const name = e.name
        const value = e.value

        if(/[^\d\.]/g.test(value)){
            return;
        }
        if (!value){
            const obj = {...state, firstInput: value, secondInput: value}
            selectChang = obj
            setState(obj)
            return;
        }

        const count = name === 'firstInput' ? (state.firstBtn.price / state.secondBtn.price) * value : (state.secondBtn.price / state.firstBtn.price) * value
        const obj = {...state, [name]: value, [name === 'firstInput' ? 'secondInput' : 'firstInput']: count}
        selectChang = obj
        setState(obj)
    }

    const changeSelect = e => {
        const obj = {
            ...state,
            firstInput: '',
            secondInput: '',
            [e.name === 'firstBtn' ? 'firstBtn' : 'secondBtn']: {
                price: e.price,
                value: e.value
            }
        }

        selectChang = obj
        setState(obj)
    }


    const setInput = e => {
        switch (e.name) {
            case 'firstInput':
                changeInput(e)
                break;
            case 'secondInput':
                changeInput(e)
                break;
            case 'firstBtn':
                changeSelect(e)
                break;
            case 'secondBtn':
                changeSelect(e)
                break;
            default:
                break;
        }
    }


    useEffect(() => {

        if (!(coins.length > 0))
            return

        const obj = {
            ...state,
            firstBtn: {
                value: coins[0].CoinInfo.Name,
                price: coins[0].RAW.USD.PRICE
            },
            secondBtn: {
                value: coins[0].CoinInfo.Name,
                price: coins[0].RAW.USD.PRICE
            }
        }
        selectChang = obj
        setState(obj)

    }, [coins])

    return (
        <div className={s.main}>
            <div className={s.wrapper}>
                <div className={s.wrptable}>
                    <Table setLike={setLike} coins={coins}/>
                </div>

                <div className={s.calc}>
                    <div className={s.title}>Конвектор валют</div>
                    <div className={s.calcBoby}>
                        <Convector
                            state={state}
                            setInput={setInput}
                            coins={coins}
                            name='first'
                        />
                        <Convector
                            state={state}
                            setInput={setInput}
                            coins={coins}
                            name='second'
                        />
                    </div>
                </div>


            </div>
        </div>
    );
}

export default App;
