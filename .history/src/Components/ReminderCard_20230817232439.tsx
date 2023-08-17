import React, { useState } from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Radio, Space } from "antd";
import { Button, Checkbox, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import AddTaskModal from "./AddTaskModal";

interface Props {
  task: any;
  getData: () => void;
  mode: boolean;
  setMode: any;
  existingTodoId: string;
}

const ReminderCard = ({
  task,
  getData,
  mode,
  setMode,
  existingTodoId,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(task.plans.length).fill(false)
  );

  const [disabled, setDisabled] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div className="">Delete</div>,
    },
  ];

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/task/${existingTodoId}/plan/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 200) {
        getData(); // Refresh the data after successful deletion
      } else {
        console.error("Failed to delete plan");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="bg-white rounded-[12px] shadow-md p-3 mt-2 ">
      <div className="flex flex-row justify-between">
        <h2 className="font-medium text-xl">{task.topic}</h2>
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <MoreOutlined className="cursor-pointer" />
        </Dropdown>
      </div>
      <div className="mt-4 ">
        <div className="flex items-center">
          <PlusOutlined />
          <p
            className="ml-2 cursor-pointer"
            onClick={() => {
              setOpen(true);
              setMode(false);
            }}
          >
            Add a Task
          </p>
        </div>

        <div className="mt-4">
          <div className="flex flex-col">
            {task.plans.map((plan: any, index: any) => (
              <div className="flex fex-row mb-4" key={index}>
                <div className="flex w-full flex-col justify-between">
                  {plan && plan.title && (
                    <Checkbox
                      checked={checkedItems[plan.taskId]}
                      disabled={disabled}
                      onChange={() => onChange(index)}
                    >
                      {plan.title}
                    </Checkbox>
                  )}
                  <div className="mt-2 ml-6">
                    {plan && plan.describ && (
                      <p className="text-[12px]">{plan.describ}</p>
                    )}
                  </div>
                </div>
                <div>
                  <AiOutlineDelete
                    onClick={() => handleDelete(plan.taskId)} // Call handleDelete with the taskId of the plan to be deleted
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && (
        <AddTaskModal
          mode={mode}
          modal={setOpen}
          openState={open}
          getData={getData}
          existingTodoId={task.id}
        />
      )}
    </div>
  );
};

export default ReminderCard;
