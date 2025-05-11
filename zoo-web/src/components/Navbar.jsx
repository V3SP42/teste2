import React from "react";
import { Home, PawPrint, Syringe } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import { PieChart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-6 items-center">
      <Link to="/" className="flex items-center gap-2 hover:underline">
        <Home className="w-5 h-5" />
        Início
      </Link>
      <Link to="/animais" className="flex items-center gap-2 hover:underline">
        <PawPrint className="w-5 h-5" />
        Animais
      </Link>
      <Link to="/cuidados" className="flex items-center gap-2 hover:underline">
        <Syringe className="w-5 h-5" />
        Cuidados
      </Link>
      <Link to="/estatisticas" className="flex items-center gap-2 hover:underline">
        <BarChart3 className="w-5 h-5" />
        Estatísticas
        </Link>
        <Link to="/frequencia-cuidados" className="flex items-center gap-2 hover:underline">
         <PieChart className="w-5 h-5" />
        Cuidados por Frequência
        </Link>
    </nav>
  );
}