import React from 'react';
import { useRouteMatch } from 'react-router';

import { Header } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return <Header></Header>;
};

export default Repository;
