import React, { useEffect } from "react";
import { Paragraph } from "../Texts/index"

export const Tabs = ({
    places,
    setSelectedPlace,
    selectedPlace
}) => {
    return (
        <ul className="list-none w-full flex gap-5">
            {
                places.length ? places.map((item, index) => {
                    return (
                        <li className={selectedPlace === item.id && "border-b-2 border-primary-blue text-primary-blue cursor-pointer"}>
                            <a
                                onClick={e => setSelectedPlace(item.id)}
                                className="
                            p-5
                            text-center
                            w-[200px]
                            flex
                            justify-center
                            font-semibold
                            text-lg"
                            >{item.nome}</a>
                        </li>
                    )
                }) : <Paragraph>Nenhum local encontrado</Paragraph>
            }
        </ul>
    )
}