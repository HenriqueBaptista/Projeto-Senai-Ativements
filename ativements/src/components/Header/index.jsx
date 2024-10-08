
import React, { useContext } from "react";
import context from "../../context/userContext";

import logomarca from "../../assets/images/logomarca_dark.png"

import { FaPowerOff } from 'react-icons/fa'
import { ButtonTransparent } from "../Button/index";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const { user } = useContext(context) // Buscando dento do contexot os dados do usuario logado

    const navigate = useNavigate();

    const logoutUser = () => {
        try {
            const data = {
                ...user,
                ultimoAcesso : new Date().toLocaleString()
            }

        fetch("http://localhost:3000/usuarios" + user.id, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        navigate("/");
        } catch {
            alert("Não foi possível registrar o seu acesso")
        }
    }

    return (
        <header className='w-full flex justify-between items-center py-6'>
            <img src={logomarca} alt="" />

            <div className='flex justify-center items-center gap-5'>
                <a target="_blank" href={`https://github.com/${user.login}`} title={`Acessar o perfil de ${user.login}`}>
                    <img className="w-16 rounded" src={user.imagem} alt="Foto de perfil do usuario logado " />
                </a>

                <ButtonTransparent onClick={logoutUser} styles="border-primary-red w-16 h-16"> <FaPowerOff fill='#bf0000' />  </ButtonTransparent>
            </div>

        </header>
    )
}