import React from 'react'

export const LinksList = ({ workers }) => {
  console.log(workers)
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
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
