import s from "../../App.module.css";

const Convector = ({state, setInput, coins, name})=>{

    return(
        <div className={s.calcInput}>
            <input
                type='text'
                name={name + 'Input'}
                value={state[name + 'Input']}
                onChange={e => setInput({value: e.target.value, name: e.target.name})}
            />
            <select>
                {
                    coins.map((item, idx) => {
                        return (
                            <option
                                key={idx}
                                data-name={name + 'Btn'}
                                value={item.CoinInfo.Name}
                                onClick={(e) => {
                                    setInput({
                                        name: e.target.dataset.name,
                                        value: e.target.value,
                                        price: item.RAW.USD.PRICE
                                    })
                                }}
                            >
                                {item.CoinInfo.Name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default Convector