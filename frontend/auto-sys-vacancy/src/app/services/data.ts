import { Candidate } from "../models/Candidate"

export const DataCandidates:Candidate[]=[
    {
      id: 1,
      fullname: 'Иван Иванов',
      phone: '+7 900 123 45 67',
      phone2:" +7 546 343 54 22",
      experience: "no_experience",
      status: 'В ожиданни',
      education: 'Высшее',
      detail: 'Разработчик Java с 3-летним опытом работы.',
      meetDate: '2024-12-01T09:15',
      dateNote: 'Собеседование назначено на 15:00',
      email:"local@mail.com",
      skills:" мощный мужик",
      vacancy:"",
      dateRec:""
    },
    {
      id: 2,
      fullname: 'Анна Петрова',      
      phone: '+7 901 456 78 90',
      phone2:'+7 546 767 34 76',
      experience: "1_year",
      status: 'Получен оффер',
      education: 'Среднее',
      detail: 'Фронтенд-разработчик с опытом в Angular и React.',
      meetDate: '2025-03-06T14:30',
      dateNote: 'Заключение контракта 2024-02-25',
      email:"local@mail.com",
      skills:" мощная женщина",
      vacancy:"",
      dateRec:""
    } ,

]