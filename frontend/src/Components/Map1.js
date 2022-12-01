import React from 'react'

export default function Map1({ id, name, map }) {
  return (
      <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>
        <button>Посмотреть</button>
        <button>Редактировать</button>
        <button>Удалить</button>
          </td>
      </tr>
  )
}
