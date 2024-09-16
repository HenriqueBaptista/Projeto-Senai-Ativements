import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { FormAtivement } from "../../components/Forms";
import { Tabs } from "../../components/Tabs";
import { Table } from "../../components/Table";

export const Painel = () => {
    const [selectedPlace, setSelectedPlace] = useState("");
    const [places, setPlaces] = useState([]);
    const [listAtivements, setListAtivements] = useState([]);
    const [update, setUpdate] = useState({})

    // buscar locais cadastradados no banco
    const getPlaces = () => {
        fetch("http://localhost:3000/locais")
            .then(response => response.json())
            .then(response => {
                setPlaces(response);

                if (response[0]) {
                    setSelectedPlace(response[0].id);
                }
            })
            .catch(() => {
                alert("Erro inesperado, não foi possível obter os locais dos ativos");
            })
    }

    useEffect(() => {
        getPlaces();
    }, [])

    useEffect(() => {
        if (selectedPlace === "") {
            getPlaces();
        }
    }, [])

    // função de listar os ativos de acordo com o local informado
    const filterAtivements = (local) => {
        fetch("http://localhost:3000/ativos?local=" + local)
            .then(response => response.json())
            .then(response => {
                setListAtivements(response);
            })
            .catch(() => {
                alert("Não foi possível obter os ativos");
            })
    }

    useEffect(() => {
        filterAtivements(selectedPlace);
    }, [selectedPlace])

    return (
        <div className="w-10/12 my-0 mx-auto">
            <Header />

            {/* formulário para criação/edição de ativos */}
            <FormAtivement
                places={places}
                setPlaces={setPlaces}
                list={listAtivements}
                setList={setListAtivements}
                update={update}
                setUpdate={setUpdate}
            />

            {/* tabs - listagem de locais de ativos */}
            <Tabs places={places} setSelectedPlace={setSelectedPlace} selectedPlace={selectedPlace} />

            {/* listagem dos ativos cadastrados */}
            <Table
                list={listAtivements.filter(x => x.local === selectedPlace)}
                setList={setListAtivements}
                setUpdate={setUpdate}
            />
        </div>
    )
}