import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReminderCard from "../Components/ReminderCard";
import AddTaskModal from "../Components/AddTaskModal";

interface Props {
  sortedTask: any;
  getData: () => void;
}

const Dashboard = ({ sortedTask, getData }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(true);
  const [existingTodoId, setExistingTodoId] = useState<string>("");

  const handleOpenModal = (id: string) => {
    setOpen(true);
    setMode(true);
    setExistingTodoId(id);
  };

  return (
    // <div className="ml-[21%] mt-[9%] mr-4  w-full">
    <div className="ml-4 mt-[8rem] xl:mt-[9%] mr-4  w-full">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Reminder List</h2>
        <Button
          type="default"
          className="flex items-center"
          icon={<PlusOutlined />}
          onClick={() => handleOpenModal(existingTodoId)}
        >
          Add List
        </Button>
      </div>
      {sortedTask.length === 0 ? (
        <div className="flex justify-center h-[60vh] items-center">
          <p className="text-xl text-center font-bold">
            You have no Reminder, Add a new list a create a reminder
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  2xl:grid-cols-4 mt-4 gap-6 mb-4">
          {sortedTask?.map((task: any) => (
            <ReminderCard
              key={task.id}
              task={task}
              getData={getData}
              mode={mode}
              setMode={setMode}
              existingTodoId={task.id}
            />
          ))}
        </div>
      )}
      {open && (
        <AddTaskModal
          mode={mode}
          modal={setOpen}
          openState={open}
          getData={getData}
          existingTodoId={existingTodoId}
        />
      )}
    </div>
  );
};

export default Dashboard;
