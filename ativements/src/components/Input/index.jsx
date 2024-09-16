export const Input = (props, {
    styleLabel,
    styleInput
}) => {
    return (
        <div className={props.style}>
            <label
                className={`
                block
                text-lg 
                mb-2 
                ${styleLabel}`
                }
                htmlFor={props.id}>
                {props.children}
            </label>

            <input
                className={`
                w-full 
                py-2 
                px-3 
                border
                border-complementary-black rounded
                ${styleInput}`
                }
                min={0}
                id={props.id}
                type={props.type}
                autoComplete="off"
                required
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
        </div>
    )
}

export const Select = (props) => {
    return (
        <div className={props.style}>
            <label
                className={`
                block
                text-lg 
                mb-2 `
                }
                htmlFor={props.id}>
                {props.children}
            </label>

            <input
                list="list-places"
                className={`
                w-full 
                py-2 
                px-3 
                border
                border-complementary-black rounded`
                }
                id={props.id}
                type="text"
                autoComplete="off"
                required
                value={props.value}
                onChange={props.onChange}
            />

            <datalist id="list-places">
                {
                    props.places.map((item, index) => {
                        return <option key={index} value={item.nome} />
                    })
                }
            </datalist>
        </div>
    )
}