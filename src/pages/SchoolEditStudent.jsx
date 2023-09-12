import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../axios/api";
import toast from "react-hot-toast";
import NavbarSchool from "../components/NavbarSchool";

export default function SchoolEditStudent() {

    const [user, setUser] = useState({});
    const [formStudent, setFormStudent] = useState({
        name: "",
        parentsName: "",
        email: "",
        class: "",
        register: "",
        password: "",
      });

    const [reload, setReload] = useState(false);
    const params = useParams();


    useEffect(() => {

        async function getStudent() {
            try {
                const response = await api.get(`/school/get_one/${params.id_student}`);
                setUser(response.data);
                setFormStudent({...response.data, password: ""});
            } catch (error) {
                console.log(error);
            }
        }
        getStudent();
    }, [reload]);

    function handleChangeStudent(e) {
        setFormStudent({ ...formStudent, [e.target.name]: e.target.value });
    }

    async function handleSubmitStudent(e) {
        e.preventDefault();
        try {
            const response = await api.put(`/school/edit_one/${params.id_student}`, formStudent);
            setReload(!reload);
            toast.success("Aluno editado com sucesso!");
        } catch (error) {
            console.log(error);

        }
    }



return (
    <div className="h-screen w-screen ">
        <NavbarSchool />
        <div className=" flex flex-col justify-center items-center">

            <div className="w-1/3 mt-4 rounded-3xl border-2 p-12 bg-white shadow-md border-blue-500">
                <h1 className="text-center text-2xl font-bold text-gray-600">
                    Editar Aluno
                </h1>
                <p className="text-center text-gray-500 mb-10 font-medium">
                    Edite os campos abaixo para alterar o aluno.
                </p>

                <form onSubmit={handleSubmitStudent}>
                    <div className="flex flex-col mt-6">
                        <label htmlFor="name" className="text-gray-500 font-medium">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formStudent.name}
                            onChange={handleChangeStudent}
                            className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
                        />
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="parentsName" className="text-gray-500 font-medium">
                            Nome dos pais
                        </label>
                        <input
                            type="text"
                            name="parentsName"
                            id="parentsName"
                            value={formStudent.parentsName}
                            onChange={handleChangeStudent}
                            className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
                        />
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="email" className="text-gray-500 font-medium">
                            E-mail
                        </label>
                        <input

                            type="email"
                            name="email"
                            id="email"
                            autoComplete="current-password"
                            value={formStudent.email}
                            onChange={handleChangeStudent}
                            className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
                        />
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="class" className="text-gray-500 font-medium">
                            Turma
                        </label>
                        <input
                            type="text"
                            name="class"
                            id="class"
                            value={formStudent.class}
                            onChange={handleChangeStudent}
                            className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
                        />
                    </div>

                    <div className="flex flex-col mt-6">

                        <label htmlFor="register" className="text-gray-500 font-medium">
                            Matrícula
                        </label>
                        <input
                            type="text"
                            name="register"
                            id="register"
                            value={formStudent.register}
                            onChange={handleChangeStudent}
                            className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
                        />
                    </div>

                    <div className="flex flex-col mt-6">
                        <label htmlFor="password" className="text-gray-500 font-medium">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            value={formStudent.password}
                            onChange={handleChangeStudent}
                            className="rounded-md border border-gray-300 p-2 text-gray-500 mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#6A7AF5] text-white border p-3 mt-5 rounded-lg"
                    >
                        Salvar Edição
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

