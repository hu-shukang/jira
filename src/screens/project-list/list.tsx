import React from 'react';
import { type Project } from 'types/project.type';
import { type User } from 'types/user.type';

interface Props {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: Props) => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{users.find((u) => u.id === item.id)?.name ?? '未知'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
