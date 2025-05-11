import React, { useEffect, useState } from "react";
import { Syringe, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useLocation, useHistory } from "react-router-dom";

export default function Cuidados() {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const animalId = Number(queryParams.get("animalId"));

  const [cuidados, setCuidados] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    frequencia: "",
    animalId: animalId || "",
  });
  const [editId, setEditId] = useState(null);
  const [nomeAnimal, setNomeAnimal] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchCuidados = async () => {
      const url = animalId
        ? `http://localhost:5236/api/cuidado/poranimal/${animalId}`
        : "http://localhost:5236/api/cuidado";

      const res = await fetch(url);
      const data = await res.json();
      setCuidados(data);
    };

    const fetchAnimal = async () => {
      if (!animalId) return;
      try {
        const res = await fetch(`http://localhost:5236/api/animal/${animalId}`);
        const data = await res.json();
        setNomeAnimal(data.nome);
      } catch {
        setNomeAnimal("");
      }
    };

    fetchCuidados();
    fetchAnimal();
  }, [animalId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposVazios = Object.values(form).some((v) => !v.toString().trim());
    if (camposVazios) {
      alert("⚠️ Preencha todos os campos antes de enviar.");
      return;
    }

    try {
      const url = "http://localhost:5236/api/cuidado";
      const method = editId ? "PUT" : "POST";
      const endpoint = editId ? `${url}/${editId}` : url;

      const payload = {
      nome: form.nome,
      descricao: form.descricao,
      frequencia: form.frequencia,
      animalId: Number(form.animalId),
    };

      if (editId !== null) {
      payload.id = editId;
    };

      console.log("Payload enviado:", payload);

      const result = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

        if (!result.ok) {
      const erro = await result.text();
      console.error("Erro na resposta:", erro);
      alert(`Erro ao cadastrar cuidado: ${erro}`);
      return;
    }

      setMensagem("✔️ Cuidado salvo com sucesso!");
      setForm({ nome: "", descricao: "", frequencia: "", animalId: animalId || "" });
      setEditId(null);
      setTimeout(() => setMensagem(""), 3000);
      const res = await fetch(`http://localhost:5236/api/cuidado/poranimal/${animalId}`);
      const data = await res.json();
      setCuidados(data);
    } catch (error) {
      console.error("Erro ao salvar cuidado:", error);
      alert("Erro inesperado ao salvar cuidado.");
    }
  };

  const handleEdit = (cuidado) => {
    setForm({
      nome: cuidado.nome,
      descricao: cuidado.descricao,
      frequencia: cuidado.frequencia,
      animalId: cuidado.animalId || animalId || "",
    });
    setEditId(cuidado.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5236/api/cuidado/${id}`, { method: "DELETE" });
    const res = await fetch(`http://localhost:5236/api/cuidado/poranimal/${animalId}`);
    const data = await res.json();
    setCuidados(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          <Syringe className="w-6 h-6" />
          {editId ? "Editar Cuidado" : "Cadastro de Cuidados"}
          {animalId && nomeAnimal && (
            <span className="text-base text-gray-500 ml-2">(Animal: {nomeAnimal})</span>
          )}
        </h1>
        <button
          onClick={() => history.push("/animais")}
          className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Animais
        </button>
      </div>

      {mensagem && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded shadow">
          {mensagem}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 bg-white p-6 rounded-lg shadow"
      >
        {[{ key: "nome", label: "Nome do Cuidado" },
          { key: "descricao", label: "Descrição" },
          { key: "frequencia", label: "Frequência" },
        ].map(({ key, label }) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              id={key}
              type="text"
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}

        {!animalId && (
          <div className="flex flex-col">
            <label htmlFor="animalId" className="text-sm font-medium text-gray-700 mb-1">
              ID do Animal
            </label>
            <input
              id="animalId"
              type="number"
              name="animalId"
              value={form.animalId}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        )}

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded transition"
        >
          {editId ? "Salvar Alterações" : "Cadastrar"}
        </button>
      </form>

      {cuidados.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded shadow mt-6">
          <p className="mb-4 font-medium">
            ⚠️ Nenhum cuidado encontrado para este animal.
          </p>
          <div className="flex">
            <button
              onClick={() => history.push("/animais")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            >
              Voltar para Animais
            </button>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {cuidados.map((c) => (
            <li
              key={c.id}
              className="bg-white border border-gray-200 shadow-md p-4 rounded-md flex justify-between items-center transition hover:shadow-lg hover:scale-[1.01] duration-200"
            >
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Syringe className="w-5 h-5 text-green-600" />
                  {c.nome}
                </h3>
                <p className="text-sm text-gray-600">Frequência: {c.frequencia}</p>
                <p className="text-sm text-gray-500 mt-1">{c.descricao}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition"
                >
                  <Pencil className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
