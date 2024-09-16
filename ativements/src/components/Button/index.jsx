import { LoadSpinner } from "../LoadSpinner"

export const Button = (props) => {
    return (
        <button
            type="submit"
            className={`flex justify-center py-2 px-4 rounded text-complementary-white bg-[#004582] ${props.styles}`}
            disabled={props.load}
        >
            {
                props.load ?
                    <LoadSpinner />
                    :
                    props.children
            }
        </button>
    )
}

export const ButtonLink = (props) => {
    return (
        <button
            onClick={props.onClick}
            type="button"
            className={`p-1 underline text-[#372097] ${props.styles}`}
        >
            {props.children}
        </button>
    )
}

export const ButtonTransparent = (props) => {
    return(
        <button onClick={props.onClick} className={`flex justify-center items-center border rounded py-2 px-4 ${props.styles}`}>{props.children}</button>
    )
}