const TasksList = ({ tasks }: any) => {
  return (
    <div>
      {tasks.map((task: any) => (
        <div>
          <p>{task.name}</p>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksList;