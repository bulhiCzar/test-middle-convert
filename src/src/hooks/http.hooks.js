import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const request = useCallback(async (url, method, body, headers={} ) => {
        try {

            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
            // headers['Apikey'] = '6c5fb9c433f708764bacf8f7e06dfc80c13ab49dbe1722de2edeff9c1ad51a3c'
            // headers = 'application/json'
            if (method === 'GET')
                body = null

            setLoading(true)
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            // if (!response.ok) {
            //     return data
            // }
            // console.log(token)

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            throw e
        }
    }, [])

    return {request, loading}
}