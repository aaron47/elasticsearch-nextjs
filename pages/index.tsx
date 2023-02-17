import type { NextPage } from 'next';
import { useCallback, useState } from 'react';
import NoTaskFound from '../components/NoTaskFound';
import TasksList from '../components/TasksList';

// hook pour fetcher les donnees
function useSearchTasks() {
  return useCallback(async (query: string) => {
    return fetch(`/api/search?q=${query}`).then((r) => r.json());
  }, []);
}

// creer un component de searchbar...
function SearchInput(
  props: React.PropsWithChildren<{
    onSearch: (query: string) => void;
  }>
) {
  return (
    <form className="flex gap-x-4">
      <input
        className="outline-none p-2 border border-purple-500 rounded-md"
        name="query"
        placeholder="Search task..."
        onChange={(e) => {
          props.onSearch(e.target.value);
        }}
      />

      <button className="border rounded-md p-2 border-purple-500">
        Search Tasks
      </button>
    </form>
  );
}

const Home: NextPage = () => {
  const [tasks, setTasks] = useState([]);
  const searchTasks = useSearchTasks();

  const onSearch = useCallback(
    async (query: string) => {
      const tasks = await searchTasks(query);

      setTasks(tasks);
    },
    [searchTasks]
  );

  return (
    <div className="flex flex-col gap-y-4 items-center h-screen">
      <div>Type below to search for your tasks:</div>

      <SearchInput onSearch={onSearch} />

      {tasks && tasks.length ? <TasksList tasks={tasks} /> : <NoTaskFound />}
    </div>
  );
};

export default Home;

// l'exemple a utiliser pour le form onSubmit, chercher seulemnt quand on submit le form
// onSubmit={(e) => {
//         e.preventDefault();

//         // avoir la valeur de input avec name="query"
//         const query = new FormData(e.currentTarget).get('query');
//         props.onSearch(query as string);
//       }}
//       }
