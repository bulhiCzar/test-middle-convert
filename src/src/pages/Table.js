import s from "../../App.module.css";


const Table = ({
                   coins,
                   setLike
               })=>{
    const coinsPreloader = ['', '', '', '' , '', '','', '', '','']

    return(
        <table className={s.table}>
            <thead>
            <tr>
                <th />
                <th>Валюта</th>
                <th>Цена</th>
                <th>Max 24h</th>
                <th>Min 24h</th>
                <th />
            </tr>
            </thead>
            <tbody>
            {
                (coins.length > 1) ? coins
                        .sort(i => !i.like)
                        .map((item, idx) => {
                            return (
                                <tr key={idx}>
                                    <td><img className={s.img_icon}
                                             src={'https://cryptocompare.com' + item.CoinInfo.ImageUrl} alt=""/>
                                    </td>
                                    <td>{item.CoinInfo.Name}</td>
                                    <td>$ {item.RAW.USD.PRICE.toFixed(2)}</td>
                                    <td>$ {item.RAW.USD.HIGH24HOUR.toFixed(2)}</td>
                                    <td>$ {item.RAW.USD.LOW24HOUR.toFixed(2)}</td>
                                    <td
                                        onClick={() => {
                                            setLike(item.CoinInfo.Name, item)
                                        }}
                                    >
                                        <svg
                                            version="1.1"
                                            className={!item.like ? s.img_like : s.img_like_active}
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px" y="0px"
                                            viewBox="0 0 391.837 391.837"
                                        >
                                            <g>
                                                <path
                                                    className={s.img_like}
                                                    d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
                                                        c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
                                                        c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"/>
                                            </g>
                                        </svg>
                                    </td>
                                </tr>
                            )
                        })
                    :
                    coinsPreloader.map((_, idx)=>{
                        return(
                            (
                                <tr key={idx}>
                                    <td><div className={s.preloader}/></td>
                                    <td><div className={s.preloader}/></td>
                                    <td><div className={s.preloader}/></td>
                                    <td><div className={s.preloader}/></td>
                                    <td><div className={s.preloader}/></td>
                                    <td><div className={s.preloader}/></td>
                                </tr>
                            )

                        )
                    })
            }
            </tbody>
        </table>
    )
}

export default Table