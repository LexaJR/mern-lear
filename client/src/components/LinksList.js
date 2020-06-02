import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({ workers }) => {
  // console.log(workers)
  if (!workers.length) {
    return <p className="center">Сотрудников пока нет</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Отчество</th>
        <th>Номер телефона</th>
        <th>Емайл</th>
        <th>Редактировать</th>
      </tr>
      </thead>

      <tbody>
      { workers.map((worker, index) => {
        return (
          <tr key={worker._id}>
            <td>{index + 1}</td>
            <td>{worker.name}</td>
            <td>{worker.surname}</td>
            <td>{worker.patronymic}</td>
            <td>{worker.phoneNumber}</td>
            <td>{worker.email}</td>
            <td>
              <Link to={`/detail/${worker._id}`}>Редактировать</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
