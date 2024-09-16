import { useContext, useEffect, useState } from "react";
import { Button, ButtonTransparent } from "../Button";
import { Input, Select } from "../Input";
import context from "../../context/userContext";
import { v4 as uuid } from "uuid";

export const FormAccess = ({
    textButton,
    value,
    onChange,
    onSubmit,
    load,
    styles,
    formLabelStyle,
    formInputStyle
}) => {
    return (
        <form onSubmit={onSubmit} className={`w-1/2 ${styles}`}>
            <Input styleLabel={formLabelStyle} styleInput={formInputStyle} id="camporegistro" value={value} onChange={onChange}>Usuário de acesso</Input>

            <Button load={load} styles="w-full mt-4">{textButton}</Button>
        </form>
    )
}

export const FormAtivement = ({
    list,
    setList,
    places,
    setPlaces,
    update
}) => {
    const { user } = useContext(context);
    const [ativement, setAtivement] = useState({
        nome: "",
        numero: "",
        local: ""
    });

    // quando houver uma mudança nos dados do update, vamos passar os valores parao ativement
    useEffect(() => {
        const filter = places.filter(x => x.id === update.local)

        if (filter[0]) {
            setAtivement({ ...update, local: filter[0].nome });
        }
    }, [update])

    const clearInput = () => {
        setAtivement({
            nome: "",
            numero: "",
            local: ""
        })
    }

    const updateAtivement = async () => {
        try {
            // procurar pelo local informado
            const localId = await findLocal(ativement.local)

            const data = {
                ...ativement,
                local: localId,
                dataAlteracao: new Date().toLocaleString(),
                usuarioAlteracao: user.id
            }

            fetch("http://localhost/3000/ativos/" + ativement.id, {
                method: "PUT",
                body: JSON.stringify(data)
            })

            // atualizar na lista de visualização os novos dados do ativo
            setList(list.map(item => item.id === ativement.id ? data : item));
        } catch {
            alert("Não foi possível atualizar os dados do ativo")
        }
    }

    const validateData = async (e) => {
        e.preventDefault();

        // Armazenando a validacao do numero do ativo
        const numeroEmUso = await validateNumberAtivement()

        // Verificar se os campos estão vazios (mesmo com espacos)
        if (ativement.nome.trim() === "" || ativement.local.trim() === "") {
            alert("Campos em branco, favor preenche-los");

        } else if (ativement.numero.length !== 7) {
            // Limite de caracteres para o numero do ativo == 7
            alert("Numeração do ativo com tamanho inválido, favor utilizar somente 7 caracteres")

        } else if (ativement.nome.length < 2) {
            // Limite de caracteres para o nome do ativo > 2
            alert("Nome do ativo com poucos caracteres, informar ao menos 2 caracteres")

        } else if (/[^\w\s]+/.test(ativement.nome)) {
            // Verificar se o item contem caracteres especiais
            alert("O nome não podem conter caracteres especiais")

        } else if (/[^\w\s]+/g.test(ativement.local)) {
            // Verificar se o item contem caracteres especiaisf
            alert("O local não podem conter caracteres especiais")

        } else if (numeroEmUso) {
            // Verificar se o numero do ativo já existe
            alert("O número do ativo já está cadastrado, informe outro número")

        } else {
            if (!ativement.id) {
                createAtivement();
            }
            else {
                updateAtivement();
            }
        }
    }

    const validateNumberAtivement = () => {
        return fetch("http://localhost:3000/ativos?numero=" + ativement.numero)
            .then(response => response.json())
            .then(response => {
                if (response[0]) {
                    return true;
                }

                return false;
            }).catch(() => {
                return false;
            })
    }

    const createAtivement = async (event) => {
        // validar se o local existe ou se precisa cadastrar
        const localId = await findLocal(ativement.local);

        try {
            const data = {
                ...ativement,
                local: localId,
                id: uuid(),
                dataRegistro: new Date().toLocaleString(),
                usuario_id: user.id,
                status: true
            }

            fetch("http://localhost:3000/ativos", {
                method: "POST",
                body: JSON.stringify(data)
            })

            setList([
                ...list,
                data
            ])
        } catch {
            alert("Não foi possível registrar o ativo")
        }
    }

    const findLocal = (local) => {
        return fetch("http://localhost:3000/locais?nome=" + local)
            .then(response => response.json())
            .then(response => {
                // se não tiver um item no bano, registrar um novo local
                if (response.length === 0) {
                    return createLocal(local);
                } else { // caso ele exista, retorne o id do local
                    return response[0].id
                }
            })
            .catch(() => {
                alert("Não foi encontrado o local")
            })
    }

    const createLocal = (local) => {
        try {
            const data = {
                id: uuid(),
                nome: local
            }

            fetch("http://localhost:3000/locais", {
                method: "POST",
                body: JSON.stringify(data)
            });

            setPlaces([...places, data])

            return data.id
        } catch {
            alert("Não foi possível registrar o novo local")
        }
    }

    return (
        <form
            onSubmit={validateData}
            className="
            bg-[#D9D3F6]
            w-full
            py-5
            px-10 mt-2
            rounded flex
            justify-around
            items-end shadow-md"
        >
            <Input
                disabled={!!ativement.id}
                styles="w-[20%]"
                type="number"
                id="numeroativo"
                value={ativement.numero}
                onChange={e => setAtivement({ ...ativement, numero: e.target.value })}
            >Número do ativo</Input>

            <Input
                styles="w-[20%]"
                type="text"
                id="nomeativo"
                value={ativement.nome}
                onChange={e => setAtivement({ ...ativement, nome: e.target.value })}
            >Nome do ativo</Input>

            <Select
                places={places}
                styles="w-[20%]"
                id="localativo"
                value={ativement.local}
                onChange={e => setAtivement({ ...ativement, local: e.target.value })}
            >Local do ativo</Select>

            <ButtonTransparent
                styles="
                w-[15%] 
                text-primary-blue 
                border-primary-blue"
                onClick={clearInput}
            >Limpar Campos</ButtonTransparent>

            <Button styles="w-[15%]">Inserir ativo</Button>
        </form>
    )
}