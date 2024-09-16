import { Paragraph, Title } from "./components/Texts";
import logomarca from "./assets/images/logomarca.png";
import { Register } from "./pages/Register";

import { Login } from "./pages/Login";
import { useState } from "react";

function App() {
  const [statusRegister, setStatusRegister] = useState(true);

  return (
    <main className="
    flex
    w-screen
    h-screen

    max-md:flex-col

    flex-row
    "
    >
      <Register onLinking={e => setStatusRegister(false)} />

      <Login onLinking={e => setStatusRegister(true)} />

      <section className={`
        bg-atvGradient
        flex
        flex-col
        justify-center
        items-center
        transition-all
        duration-500
        absolute
        
        max-md:w-screen
        max-md:h-1/2
        max-md:left-0
        max-md:top-1/2
        max-md:${statusRegister ? "top-0" : "top-0"}

        h-screen
        w-1/2 
        ${statusRegister ? "left-1/2" : "left-0"}
        `
      }>
        <Title styles="
        text-complementary-white

        max-md:text-1x1
        "
        >Bem-vindo ao <img className="mt-3" src={logomarca} alt="Ativements" /></Title>

        <Paragraph styles="text-complementary-white mt-16">
          A plataforma eficiente para gerenciar e acompanhar todos os recursos da escola SENAI Informática
        </Paragraph>
      </section>
    </main>
  );
}

export default App;
