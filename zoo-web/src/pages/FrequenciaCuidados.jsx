import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

export default function FrequenciaCuidados() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchCuidados = async () => {
      try {
        const res = await fetch("http://localhost:5236/api/cuidado");
        const cuidados = await res.json();

        const freqCount = cuidados.reduce((acc, cuidado) => {
          const freq = cuidado.frequencia || "Não Informado";
          acc[freq] = (acc[freq] || 0) + 1;
          return acc;
        }, {});

        const dadosFormatados = Object.entries(freqCount).map(([frequencia, total]) => ({
          frequencia,
          total,
        }));

        setDados(dadosFormatados);
      } catch (err) {
        console.error("Erro ao buscar dados de cuidados:", err);
      }
    };

    fetchCuidados();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Frequência dos Cuidados
      </h1>

      <div className="bg-white rounded-lg shadow p-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dados}
              dataKey="total"
              nameKey="frequencia"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {dados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}