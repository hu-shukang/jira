import React, { useEffect, useState } from 'react';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { type Project } from 'types/project.type';
import { type User } from 'types/user.type';
import { qsUtil } from 'utils';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL as string;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [list, setList] = useState<Project[]>([]);
  useEffect(() => {
    fetch(`${apiBaseUrl}/users`)
      .then(async (resp) => {
        const data = await resp.json();
        setUsers(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    fetch(`${apiBaseUrl}/projects?${qsUtil.stringify(param)}`)
      .then(async (resp) => {
        if (resp.ok) {
          const data = await resp.json();
          setList(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [param]);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
