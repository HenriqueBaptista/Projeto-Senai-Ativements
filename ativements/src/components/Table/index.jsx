import React, { useEffect } from "react";
import { ButtonTransparent } from "../Button/index";

export const Table = ({
    list,
    setList,
    setUpdate
}) => {
    const removeAtivement = (ativo) => {
        try {
            const data = {
                ...ativo,
                status: !ativo.status
            }

            fetch("http://localhost:3000/ativos/" + ativo.id, {
                method: "PUT",
                body: JSON.stringify(data)
            })

            setList(list.map(item => item.id === ativo.id ? data : item))
        } catch (error) {
            alert("Não foi possível remover o ativo informado")
        }
    }

    const getAtivement = (ativo) => {
        setUpdate(ativo);
    }
    

    useEffect(() => {
        console.log(list);
    }, [])
    return (
        <table className="w-full mt-10">
            <thead>
                <tr className="bg-[#E1E0E7]">
                    <th className="py-5 px-10 text-left rounded-l">Identificação do ativo</th>
                    <th className="py-5 px-10 text-left">Nome do ativo</th>
                    <th className="py-5 px-10 text-left">Data do registro</th>
                    <th className="py-5 px-10 text-left rounded-r">Ações do ativo</th>
                </tr>
            </thead>

            <tbody>
                {
                    list.map((item, index) =>
                        <tr key={index} className="hover:bg-[#F1F0F5 hover:border-l-2 hover:border-primary-purple">
                            <td className={`py-5 px-10 text-left ${!item.status && "line-through"}`}>{item.numero}</td>
                            <td className={`py-5 px-10 text-left ${!item.status && "line-through"}`}>{item.nome}</td>
                            <td className={`py-5 px-10 text-left ${!item.status && "line-through"}`}>{item.dataRegistro}</td>
                            <td className={`py-5 px-10 text-left flex flex-row gap-5`}>
                                <ButtonTransparent onClick={e => getAtivement(item)} styles="border-none py-0 px-0 text-[#009E9E]">Editar ativo</ButtonTransparent>

                                <ButtonTransparent
                                    onClick={e => removeAtivement(item)}
                                    styles="border-none py-0 px-0 text-primary-red"
                                >Excluir ativo</ButtonTransparent>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}