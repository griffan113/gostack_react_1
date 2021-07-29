import React, {
  Fragment,
  useState,
  useRef,
  FormEvent,
  useCallback,
} from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';
import { Link } from 'react-router-dom';

import {
  Title,
  Form,
  Button,
  Repositories,
  Error,
  NoRepositories,
} from './styles';
import logo from '../../assets/logo_eliel.png';
import octocat from '../../assets/octocat.png';
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

  const handleClearInput = useCallback(() => {
    setInputError('');
    if (inputRef.current !== null) inputRef.current.value = '';
  }, []);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const newRepo = inputRef.current?.value;

    if (!newRepo) {
      setInputError('Digite o autor/nome_do_repositório.');
      inputRef.current?.focus();
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      if (inputRef.current !== null) inputRef.current.value = '';
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório.');
      inputRef.current?.focus();
    }
  }

  return (
    <Fragment>
      <img style={{ maxWidth: '100px' }} src={logo} alt="logo" />
      <Title>Explore Repositórios no GitHub</Title>
      {/* "!!" indicates a string value to boolean; */}
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input ref={inputRef} placeholder="Digite o nome do repositório..." />
        <span onClick={handleClearInput}>
          <MdClear size={20} />
        </span>
        <Button type="submit">Pesquisar</Button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
      {repositories.length < 1 && (
        <NoRepositories>
          <strong>Digite um repositório para ver suas informações!</strong>
          <img src={octocat} alt="GitHub Octocat" />
        </NoRepositories>
      )}
    </Fragment>
  );
};

export default Dashboard;
