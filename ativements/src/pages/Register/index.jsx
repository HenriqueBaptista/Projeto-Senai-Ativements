import React, { useContext, useState } from 'react'

import context from '../../context/userContext'
import { v4 as uuid } from "uuid"
import { octokit } from "../../utils/githubkey"

import { useNavigate } from 'react-router-dom'
import { Paragraph, TextError, Title } from '../../components/Texts'
import { ButtonLink } from '../../components/Button'
import { FormAccess } from '../../components/Forms'

export const Register = ({ onLinking }) => {
    const { setUser } = useContext(context);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState("");
    const [userAccess, setUserAccess] = useState("");

    // Função para validar o perfil do github
    const validateUser = (e) => {
        e.preventDefault();

        setLoad(true);
        octokit.request("GET /users/{username}", {
            username: userAccess,
            headers: {
                "X-GitHub-Api-Version": "2022-11-28"
            }
        }).then(async response => {
            const verify = await checkUserExists()

            if (verify) {
                setMessage("Usuário já cadastrado ")
            } else {
                registerUser(response.data)
            }

        }).catch(() => {
            setMessage("Usuário inválido, tente novamente")
        });

        setLoad(false);
        setUserAccess("")
    }

    // Função para verificar se o usuário já está registrado
    const checkUserExists = () => {
        return fetch(`http://localhost:3000/usuarios?login=${userAccess.toLocaleLowerCase()}`)
            .then(response => response.json())
            .then(response => {
                if (response.length > 0) {
                    return true;
                }
                return false;
            }).catch(() => {
                alert("Não foi possível consultar o usuário")
            })
    }

    // Função para registrar o usuário
    const registerUser = (user) => {
        try {
            const data = {
                id: uuid(),
                login: user.login.toLowerCase(),
                imagem: user.avatar_url
            }

            fetch("http://localhost:3000/usuarios", {
                method: "POST",
                body: JSON.stringify(data)
            });

            setUser(data)
            navigate("/painel-ativos")

        } catch (e) {
            setMessage("Não foi possível registrar o usuário, tente novamente");
        }
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
            <Title styles="text-lg">Registrar-se na plataforma</Title>

            <Paragraph styles="text-sm">Para criar uma conta, informe a url de acesso ao seu perfil da plataforma do Github</Paragraph>

            <FormAccess
                load={load}
                onSubmit={validateUser}
                value={userAccess}
                textButton={"Cadastrar Conta"}
                onChange={e => setUserAccess(e.target.value)}
                formInputStyle={""}
                formLabelStyle={"text-sm"}
                styles={""}
            />

            {/* Exebindo as mensagens de erro */}
            <TextError styles="text-sm">{message}</TextError>

            <Paragraph styles="text-sm">Já possui registro? <ButtonLink onClick={onLinking}>Acesse sua conta</ButtonLink>!</Paragraph>
        </section>
    )
}