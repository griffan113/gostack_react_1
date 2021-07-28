import React, { Fragment, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Input, Button, Repositories } from './styles';
import logo from '../../assets/logo_eliel.png';

const Dashboard: React.FC = () => {
  return (
    <Fragment>
      <img style={{ maxWidth: '100px' }} src={logo} alt="logo" />
      <Title>Explore Repositórios no GitHub</Title>
      <Form>
        <Input placeholder="Digite o nome do repositório..." />
        <Button type="submit">Pesquisar</Button>
      </Form>
      <Repositories>
        <a href="test">
          <img
            src="https://avatars.githubusercontent.com/u/70238970?v=4"
            alt="Eliel"
          />
          <div>
            <strong>griffan113/electron_react_template</strong>
            <p>Electron / React and TypeScript template</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </Fragment>
  );
};

export default Dashboard;
