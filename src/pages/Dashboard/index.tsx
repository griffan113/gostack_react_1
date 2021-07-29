import React, { Fragment, useState, useEffect, useRef, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Input, Button, Repositories, Error } from './styles';
import logo from '../../assets/logo_eliel.png';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [inputError, setInputError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const newRepo = inputRef.current?.value;

    if (!newRepo) {
      setInputError('Digite o autor/nome_do_repositório.');
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
    } catch (err) {
      setInputError('Erro na busca por esse repositório.');
    }
  }

  return (
    <Fragment>
      <img style={{ maxWidth: '100px' }} src={logo} alt="logo" />
      <Title>Explore Repositórios no GitHub</Title>
      <Form onSubmit={handleAddRepository}>
        <Input ref={inputRef} placeholder="Digite o nome do repositório..." />
        <Button type="submit">Pesquisar</Button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="test">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </Fragment>
  );
};

export default Dashboard;
