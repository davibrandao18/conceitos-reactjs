import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'htps://',
      tecs: ['react', 'native', 'js']
    });

    const repository = response.data;

    setRepositories([ ... repositories, response.data]);
  }


  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id != id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(`${repository.id}`)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
