import React, { useEffect, useState } from "react";
import { PawPrint, Syringe } from "lucide-react";

export default function Home() {
  const [totalAnimais, setTotalAnimais] = useState(0);
  const [totalCuidados, setTotalCuidados] = useState(0);

  useEffect(() => {
    const fetchDados = async () => {
      const resAnimais = await fetch("http://localhost:5236/api/animal");
      const animais = await resAnimais.json();
      setTotalAnimais(animais.length);

      const resCuidados = await fetch("http://localhost:5236/api/cuidado");
      const cuidados = await resCuidados.json();
      setTotalCuidados(cuidados.length);
    };

    fetchDados();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Bem-vindo ao Sistema de Gerenciamento do Zoológico 🐾
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center transition hover:shadow-lg hover:scale-[1.02] duration-200">
          <PawPrint className="w-10 h-10 text-blue-600 mb-2" />
          <p className="text-lg font-semibold">Total de Animais</p>
          <p className="text-2xl text-blue-700 font-bold">{totalAnimais}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center transition hover:shadow-lg hover:scale-[1.02] duration-200">
          <Syringe className="w-10 h-10 text-green-600 mb-2" />
          <p className="text-lg font-semibold">Total de Cuidados</p>
          <p className="text-2xl text-green-700 font-bold">{totalCuidados}</p>
        </div>
      </div>
    </div>
  );
}