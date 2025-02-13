import React, { useState } from 'react';
import InputText from '../../Forms/InputText';
import RadioInput from '../../Forms/RadioInput';
import RadioBinario from '../../Forms/RadioBinario';
import InputFile from '../../Forms/InputFile';
import SelectInputCursos from '../../Forms/SelectInputCursos';
import SelectInput from '../../Forms/SelectInput';


import { FaRegTrashAlt } from "react-icons/fa";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { handleChangeCurso, handleChange } from '../../../util/hooks'
import {handleChangeMatricula,deleteDivTermino} from './util'
import { checkErrors } from '../../../util/utils';

const Formulario = ({ cursos }) => {
    const [formData, setFormData] = useState({
        nome: '',
        num_usp: '',
        email: '',
        select_curso: '',
        ano_ingresso: '',
        telefone: '',
        cred_momento: '',
        ano_termino: '',
        select_semestre: '',
        ano_termino2: '',
        select_semestre2: '',
        ano_termino3: '',
        select_semestre3: '',
        ano_termino4: '',
        select_semestre4: '',
        tot_creditos: '',
        just_exclusao: '',
        outros_justificativa: '',
        select_displinas: '',
        radio_termo: ''
    });

    const [terminoDiv, setTerminoDiv] = useState([false, false, false]);

    const handleSubmit = (e) => {
        e.preventDefault();
        checkErrors(formData)
    };


    const [cursoSelect, setCursoSelect] = useState();

    return (

        <div className="mx-auto max-w-2xl px-8 py-16 bg-white border-0 shadow-lg sm:rounded-3xl">
            <h1 className="text-2xl font-bold mb-8">
                Trancamento total do curso
            </h1>
            <p>
                    A solicitação de trancamento total do curso pode ser feita em qualquer momento do semestre desde que o aluno já tenha obtido, pelo menos, 24 créditos em seu currículo (equivalências não são consideradas).
                    É possível solicitar o trancamento total por até 4 semestres, com a possibilidade de prorrogação por mais 2 semestres.
                    O período em que o aluno estiver legalmente afastado não será computado nos cálculos relativos ao cancelamento de matrícula.
                    Para retornar à atividade no curso, o aluno deve entrar em contato com o Serviço de Graduação via e-mail e solicitar o destrancamento do curso.
            </p>
            <form id="form" onSubmit={handleSubmit}>
                <InputText
                    id="nome"
                    label="Nome completo"
                    name="nome"
                    value={formData.nome}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-nome"
                    errorMessage="Você não digitou seu nome"
                />
                <InputText
                    id="num_usp"
                    label="Número USP"
                    name="num_usp"
                    pattern="[0-9]{8}"
                    value={formData.num_usp}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-num_usp"
                    errorMessage="Você não digitou seu número USP"
                />
                <InputText
                    id="email"
                    label="E-mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-email"
                    errorMessage="Você não digitou seu e-mail"
                />
                <SelectInputCursos
                    id="select_curso"
                    label="Escolha seu curso"
                    name="select_curso"
                    value={formData.select_curso}
                    onChange={(e) => handleChangeCurso(e, setCursoSelect, setFormData, formData)}
                    options={cursos}
                    errorId="error-select_curso"
                    errorMessage="Você não selecionou um curso"
                />
                <InputText
                    id="ano_ingresso"
                    label="Ano de ingresso"
                    name="ano_ingresso"
                    pattern="[0-9]{4}"
                    value={formData.ano_ingresso}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-ano_ingresso"
                    errorMessage="Você não digitou seu ano de ingresso"
                />
                <InputText
                    id="telefone"
                    label="Telefone (DDD número)"
                    type="tel"
                    name="telefone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={formData.telefone}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-telefone"
                    errorMessage="Você não digitou seu telefone"
                />
                <InputText
                    id="cred_momento"
                    label="Número total de créditos cumprido até o momento"
                    name="cred_momento"
                    pattern="[0-9]{4}"
                    value={formData.ano_ingresso}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-cred_momento"
                    errorMessage="Você não digitou seus créditos cumpridos até o momento"
                />

                <RadioBinario
                    textoPrincipal="Já trancou o curso anteriormente:"
                    name="tranc_prev"
                    id="tranc_prev"
                    idError="tranc_prev_Error"
                    label="Sim"
                    label2="Não"
                />

                <RadioBinario
                    textoPrincipal="Você está cumprindo o plano de término de curso:"
                    name="plano_Ok"
                    id="plano_Ok"
                    idError="plano_Ok_Error"
                    label="Sim"
                    label2="Não"
                />

                <div >
                    <div className="flex flex-row space-x-4">
                        <InputText
                            id="ano_termino"
                            label="Previsão de ano de término do curso"
                            name="ano_termino"
                            pattern="[0-9]{4}"
                            value={formData.ano_termino}
                            onChange={(e) => handleChange(e, setFormData, formData)}
                            errorId="error-ano_termino"
                            errorMessage="Você não digitou seu ano do término"
                        />
                        <SelectInput
                            id="select_semestre"
                            label="Semestre"
                            name="select_semestre"
                            value={formData.select_semestre}
                            onChange={(e) => handleChangeMatricula(e, setFormData, formData, setTerminoDiv, 0)}
                            options={[
                                { value: '1', label: '1° semestre' },
                                { value: '2', label: '2° semestre' }
                            ]}
                            errorId="error-select_semestre"
                            errorMessage="Você não selecionou o semestre de término"
                        />
                    </div>
                    

                    {terminoDiv[0] && (
                        <div className="flex flex-row space-x-4 ">
                            <InputText
                                id="ano_termino2"
                                label="Previsão de ano de término do curso"
                                name="ano_termino2"
                                pattern="[0-9]{4}"
                                value={formData.ano_termino2}
                                onChange={(e) => handleChange(e, setFormData, formData)}
                                errorId="error-ano_termino2"
                                errorMessage="Você não digitou seu ano do término"
                            />
                    
                            <SelectInput
                                id="select_semestre2"
                                label="Semestre"
                                name="select_semestre2"
                                value={formData.select_semestre2}
                                onChange={(e) => handleChangeMatricula(e, setFormData, formData, setTerminoDiv, 1)}
                                options={[
                                    { value: '1', label: '1° semestre' },
                                    { value: '2', label: '2° semestre' }
                                ]}
                                errorId="error-select_semestre"
                                errorMessage="Você não selecionou o semestre de término"
                            />
                            <div className='flex items-center justify-center text-blue-600 text-xl hover:text-blue-400 cursor-pointer' onClick={() => deleteDivTermino(setTerminoDiv,0)}>
                                <FaRegTrashAlt />
                            </div>
                            
                        </div>
                    )}

                    {terminoDiv[1] && (
                        <div className="flex flex-row space-x-4">
                            <InputText
                                id="ano_termino3"
                                label="Previsão de ano de término do curso"
                                name="ano_termino3"
                                pattern="[0-9]{4}"
                                value={formData.ano_termino3}
                                onChange={(e) => handleChange(e, setFormData, formData)}
                                errorId="error-ano_termino3"
                                errorMessage="Você não digitou seu ano do término"
                            />
                            <SelectInput
                                id="select_semestre3"
                                label="Semestre"
                                name="select_semestre3"
                                value={formData.select_semestre3}
                                onChange={(e) => handleChangeMatricula(e, setFormData, formData, setTerminoDiv, 2)}
                                options={[
                                    { value: '1', label: '1° semestre' },
                                    { value: '2', label: '2° semestre' }
                                ]}
                                errorId="error-select_semestre3"
                                errorMessage="Você não selecionou o semestre de término"
                            />
                            <div className='flex items-center justify-center text-blue-600 text-xl hover:text-blue-400 cursor-pointer' onClick={() => deleteDivTermino(setTerminoDiv,1)}>
                                <FaRegTrashAlt />
                            </div>
                        </div>
                    )}

                    {terminoDiv[2] && (
                        <div className="flex flex-row space-x-4">
                            <InputText
                                id="ano_termino4"
                                label="Previsão de ano de término do curso"
                                name="ano_termino4"
                                pattern="[0-9]{4}"
                                value={formData.ano_termino4}
                                onChange={(e) => handleChange(e, setFormData, formData)}
                                errorId="error-ano_termino4"
                                errorMessage="Você não digitou seu ano do término"
                            />
                            <SelectInput
                                id="select_semestre4"
                                label="Semestre"
                                name="select_semestre4"
                                value={formData.select_semestre4}
                                onChange={(e) => handleChange(e, setFormData, formData)}
                                options={[
                                    { value: '1', label: '1° semestre' },
                                    { value: '2', label: '2° semestre' }
                                ]}
                                errorId="error-select_semestre4"
                                errorMessage="Você não selecionou o semestre de término"
                            />

                            <div className='flex items-center justify-center text-blue-600 text-xl hover:text-blue-400 cursor-pointer' onClick={() => deleteDivTermino(setTerminoDiv,2)}>
                                <FaRegTrashAlt />
                            </div>
                        </div>
                    )}



                </div>

                <InputText
                    id="justificativa"
                    label="Justificativa"
                    name="justificativa"
                    pattern="[0-9]{4}"
                    value={formData.ano_ingresso}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-justificativa"
                    errorMessage="Você não digitou a justificativa"
                />

                <InputFile
                    id="formFileSm"
                    texto="Anexe seu histórico escolar em formato pdf"
                    accept=".pdf"
                />

                <InputFile
                    id="formFileSm2"
                    texto="Anexe aqui outro documento, se necessário"
                    accept=""
                />

                <RadioInput
                    id="radio_term"
                    label="Termo de aceitação"
                    name="radio_term"
                    options={[
                        { value: 'radio_term', label: 'Estou ciente de que, de acordo com com o artigo 2º da Resolução CoG nº 3761/1990, o trancamento não será efetuado se eu não tiver, pelo menos, 24 créditos cumpridos até o momento e se eu já estiver reprovado por faltas em disciplinas cuja soma de créditos ultrapasse 25% do total de créditos em que estou matriculado neste semestre.' }
                    ]}
                    onChange={(e) => handleChange(e, setFormData, formData)}
                    errorId="error-radio_term"
                    errorMessage="Você não  aceitou o termo."
                />

                <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-900 to-blue-900 group-hover:from-cyan-900 group-hover:to-blue-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    type="submit" onClick={handleSubmit}>
                    <span className="text-lg w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Enviar
                    </span>
                </button>
            </form>
        </div>

    );
};

export default Formulario;
