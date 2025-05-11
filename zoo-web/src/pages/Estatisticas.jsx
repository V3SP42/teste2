import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Estatisticas() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchAnimais = async () => {
      try {
        const res = await fetch("http://localhost:5236/api/animal"); // Ajuste se estiver usando HTTPS
        const animais = await res.json();

        // Agrupar por espécie
        const especieCount = animais.reduce((acc, animal) => {
          acc[animal.especie] = (acc[animal.especie] || 0) + 1;
          return acc;
        }, {});

        const dadosFormatados = Object.entries(especieCount).map(([especie, total]) => ({
          especie,
          total,
        }));

        setDados(dadosFormatados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchAnimais();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">
        Quantidade de Animais por Espécie
      </h1>

      <div className="bg-white rounded-lg shadow p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="especie" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="total" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}