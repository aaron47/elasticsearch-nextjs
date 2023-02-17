const TasksList = ({ tasks }: any) => {
  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task: any) => (
        <div className="border rounded-md border-pink-600 w-fit p-2">
          <p>{task.name}</p>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
