import React from 'react';
import { type ProjectQueryForm } from 'types/project.type';
import { type User } from 'types/user.type';

interface Props {
  param: ProjectQueryForm;
  setParam: (data: ProjectQueryForm) => void;
  users: User[];
}

export const SearchPanel = ({ param, setParam, users }: Props) => {
  return (
    <form action="">
      <input
        type="text"
        value={param.name}
        onChange={(e) => setParam({ ...param, name: e.target.value })}
      />
      <select
        value={param.personId}
        onChange={(e) => setParam({ ...param, personId: e.target.value })}
      >
        <option value="">选择</option>
        {users.map((u) => (
          <option value={u.id} key={u.id}>
            {u.name}
          </option>
        ))}
      </select>
    </form>
  );
};
