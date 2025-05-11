import React, { useEffect, useState } from "react";
import { PawPrint, Pencil, Trash2 } from "lucide-react";
import { useHistory } from "react-router-dom";

const API_URL = "http://localhost:5236/api/animal";

export default function Animais() {
  const [animais, setAnimais] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    dataNascimento: "",
    especie: "",
    habitat: "",
    paisOrigem: "",
  });
  const [editId, setEditId] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const history = useHistory();

  const fetchAnimais = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setAnimais(data);
  };

  useEffect(() => {
    fetchAnimais();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposVazios = Object.values(form).some((valor) => !valor?.toString().trim());
    if (camposVazios) {
      alert("⚠️ Preencha todos os campos antes de enviar.");
      return;
    }

    try {
      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, id: editId }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      setForm({
        nome: "",
        descricao: "",
        dataNascimento: "",
        especie: "",
        habitat: "",
        paisOrigem: "",
      });
      setEditId(null);
      setMensagem("✔️ Animal salvo com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
      fetchAnimais();
    } catch (error) {
      console.error("Erro ao salvar animal:", error);
    }
  };

  const handleEdit = (animal) => {
    setForm({ ...animal });
    setEditId(animal.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchAnimais();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        <PawPrint className="w-6 h-6" />
        {editId ? "Editar Animal" : "Cadastro de Animais"}
      </h1>

      {mensagem && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded border border-blue-300 shadow">
          {mensagem}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 bg-white p-6 rounded-lg shadow"
      >
        {[
          { key: "nome", label: "Nome" },
          { key: "descricao", label: "Descrição" },
          { key: "dataNascimento", label: "Data de Nascimento" },
          { key: "especie", label: "Espécie" },
          { key: "habitat", label: "Habitat" },
          { key: "paisOrigem", label: "País de Origem" },
        ].map(({ key, label }) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={key}
              type={key === "dataNascimento" ? "date" : "text"}
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition"
        >
          {editId ? "Salvar Alterações" : "Cadastrar"}
        </button>
      </form>

      <ul className="space-y-4">
        {animais.map((a) => (
          <li
            key={a.id}
            className="bg-white border border-gray-200 shadow-md p-4 rounded-md flex justify-between items-center transition hover:shadow-lg hover:scale-[1.01] duration-200"
          >
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-blue-600" />
                {a.nome} <span className="text-sm text-gray-500">(ID: {a.id})</span>
              </h3>
              <p className="text-sm text-gray-600">
                {a.especie} • {a.habitat} • {a.paisOrigem}
              </p>
              <p className="text-sm text-gray-500 mt-1">{a.descricao}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(a)}
                className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
              >
                <Pencil className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
              >
                <Trash2 className="w-4 h-4" />
                Excluir
              </button>
              <button
                onClick={() => history.push(`/cuidados?animalId=${a.id}`)}
                className="flex items-center gap-1 bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded transition"
              >
                Ver Cuidados
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}