import RequestReset from "../components/RequestReset"
import Reset from "../components/Reset"

export default function ResetPage({query}) {
    if (!query
        ?.token) {
        return <div>
            <p>
                Sorry you must supply a token.
                <RequestReset />
            </p>
        </div>
    }
    console.log(query.token)
    return <div>
        <Reset/>
    </div>
}