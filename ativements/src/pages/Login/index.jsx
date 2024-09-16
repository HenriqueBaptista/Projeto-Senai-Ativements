import React, { useState, useContext, useEffect } from "react";
import { Paragraph, TextError, Title } from "../../components/Texts";
import { ButtonLink } from "../../components/Button";
import { FormAccess } from "../../components/Forms";

import { octokit } from "../../utils/githubkey";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

import context from "../../context/userContext";

export const Login = ({
    onLinking
}) => {
    const { setUser } = useContext(context) // Importando dentro do contexto a função de alimentar os dados do usuário  

    const navigate = useNavigate();
    const [userAccess, setUserAccess] = useState();
    const [message, setMessage] = useState("");
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setUser({}) // limpando o acesso do usuário no context
    }, [])

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage("")
            }, 5000)
        }
    }, [message])

    const verifyAccess = (e) => {
        e.preventDefault();

        setLoad(true);

        fetch(`http://localhost:3000/usuarios?login=${userAccess.toLowerCase()}`)
            .then(response => response.json())
            .then(response => {
                if (response[0]) {
                    setUser(response[0])

                    navigate("/painel-ativos")
                } else {
                    setMessage("Usuário não encontrado, tente novamente");
                }
            }).catch(() => {
                setMessage("Não foi possível efetuar o login, tente novamente");
            });

        setLoad(false);

        setUserAccess("");
    }


    return (
        <section className="
            flex 
            flex-col
            items-center
            justify-center
            gap-2

            max-md:w-screen
            max-md:h-1/2

            text-lg

            h-screen
            w-1/2"
        >
            <Title>Acessar a plataforma</Title>

            <Paragraph styles="text-sm">Para acessar sua conta, informe seu usuário de acesso vinculado ao Github</Paragraph>

            <FormAccess
                load={load}
                onSubmit={verifyAccess}
                value={userAccess}
                onChange={e => setUserAccess(e.target.value)}
                textButton={"Acessar Conta"}
            />

            {/* Exebindo as mensagens de erro */}
            <TextError styles="text-sm">{message}</TextError>

            <Paragraph>Seu primeiro acesso? <ButtonLink onClick={onLinking}>Registre-se aqui</ButtonLink>!</Paragraph>
        </section>
    )
}