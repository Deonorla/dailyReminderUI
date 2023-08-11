import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal, DatePicker, Form, Input, TimePicker } from "antd";
import CustomTextArea from "./CustomTextArea";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
interface Props {
  modal: any;
  openState: any;
  getData: () => void;
  mode: boolean;
  existingTodoId: string;
}
interface Todo {
  id: string;
  user_email: string;
  topic: string;

  plans: {
    taskId: string;
    title: string;
    progress: number;
    describ: string;
    remind: string;
    day_date: string;
    day_time: string;
  }[];
}
type SizeType = Parameters<typeof Form>[0]["size"];

const AddTaskModal = ({
  modal,
  openState,
  getData,
  mode,
  existingTodoId,
}: Props) => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const id = uuidv4();
  const taskId = uuidv4();
  const format = "HH:mm";
  const [cookie, setCookie, removeCookie] = useCookies();

  const [data, setData] = useState<Todo>({
    id: id,
    user_email: cookie.Email,
    topic: "",
    plans: [
      {
        taskId: taskId,
        title: "",
        progress: 0,
        describ: "",
        remind: "",
        day_date: "",
        day_time: "",
      },
    ],
  });
  useEffect(() => {
    console.log("Final data", data);
  }, [setData, data]);

  const addNewTask = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/taskid/${existingTodoId}`
      );
      if (response.status === 200) {
        const existingTodo = await response.json();

        const updatedPlans = [
          ...existingTodo.plans,
          ...data.plans.map((plan) => ({
            taskId: plan.taskId,
            title: plan.title,
            progress: plan.progress,
            describ: plan.describ,
            remind: plan.remind,
            day_date: plan.day_date,
            day_time: plan.day_time,
          })),
        ];

        const updatedTodo = {
          ...existingTodo,
          plans: updatedPlans.map((plan) => ({
            ...plan,
            progress: plan.progress, // Convert progress to string
          })),
        };
        console.log("updatedTodo", updatedTodo);

        const updateResponse = await fetch(
          `${process.env.REACT_APP_SERVERURL}/todos/task/${existingTodoId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTodo),
          }
        );

        if (updateResponse.status === 200) {
          console.log("Worked");
          modal(false);
          getData();
        }

        console.log(updateResponse);
      } else {
        console.error("Failed to fetch existing todo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTask = (name: string, value: any, index: number) => {
    const updatedPlans = [...data.plans];

    if (index >= updatedPlans.length) {
      updatedPlans.push({
        taskId: taskId,
        title: "",
        progress: 0,
        describ: "",
        remind: "",
        day_date: "",
        day_time: "",
      });
    }

    updatedPlans[index] = {
      ...updatedPlans[index],
      [name]: value,
    };

    // Concatenate date and time values if both are present
    if (name === "day_date" || name === "day_time") {
      const { day_date, day_time } = updatedPlans[index];
      const datetime = day_date && day_time ? `${day_date}T${day_time}:00` : "";

      updatedPlans[index] = {
        ...updatedPlans[index],
        remind: datetime,
      };
    }

    setData((prevData) => ({
      ...prevData,
      plans: updatedPlans,
    }));
  };

  const postData = async (e: any) => {
    e.preventDefault();
    try {
      const plansArray = data.plans.map((plan) => ({
        taskId: plan.taskId,
        title: plan.title,
        progress: plan.progress,
        describ: plan.describ,
        remind: plan.remind,
        day_date: plan.day_date,
        day_time: plan.day_time,
      }));

      const updatedData = {
        ...data,
        plans: plansArray,
      };

      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedData,
          plans: JSON.stringify(updatedData.plans),
          topic: data.topic, // Include topic in the request
          title: data.plans[0]?.title, // Include the title of the first plan in the request
          day_time: data.plans[0]?.day_time, // Include the day_time of the first plan in the request
          day_date: data.plans[0]?.day_date, // Include the day_date of the first plan in the request
        }),
      });

      if (response.status === 200) {
        console.log("Worked");
        modal(false);
        getData();
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (name: string, value: any) => {
    setData((prevData) => {
      const updatedPlans = prevData.plans.map((plan, index) => {
        if (index === 0) {
          const updatedPlan = {
            ...plan,
            [name]: value,
          };

          // Concatenate date and time values if both are present
          if (name === "day_date" || name === "day_time") {
            const { day_date, day_time } = updatedPlan;
            const datetime =
              day_date && day_time ? `${day_date}T${day_time}:00` : "";
            return {
              ...updatedPlan,
              remind: datetime,
            };
          }

          return updatedPlan;
        }

        return plan;
      });

      return {
        ...prevData,
        topic: name === "topic" ? value : prevData.topic,
        plans: updatedPlans,
      };
    });
  };

  return (
    <div>
      {mode ? (
        <Modal
          title={"Lets create you a New List"}
          centered
          open={openState}
          onOk={postData}
          onCancel={() => modal(false)}
          width={500}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 600 }}
            className="mt-4 flex flex-col "
          >
            <div className="mt-8 mb-4">
              <Input
                name="topic"
                value={data.topic}
                placeholder="Enter the Topic for your list"
                onChange={(e) => handleChange("topic", e.target.value)}
              />
            </div>
            <div className="mt-8 mb-4">
              <Input
                name="title"
                value={data.plans[0]?.title || ""}
                placeholder="Title"
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <CustomTextArea
              name="describ"
              placeholder="Enter a Description for your task"
              className="block p-2.5 w-full text-sm 
              text-gray-900 bg-gray-50 
              rounded-lg border border-gray-300
               focus:ring-blue-200 focus:border-blue-200
               "
              value={data.plans[0]?.describ || ""}
              onChange={(name, value) => handleChange("describ", value)}
              style={{ resize: "vertical", minHeight: 64 }}
            />

            <div className="mt-4 flex">
              <DatePicker
                className="ml-2"
                name="date"
                onChange={(date, dateString) =>
                  handleChange("day_date", dateString)
                }
              />
              <TimePicker
                defaultValue={dayjs("00:00", format)}
                format={format}
                className="ml-3"
                onChange={(time, timeString) =>
                  handleChange("day_time", timeString)
                }
              />
            </div>
          </Form>
        </Modal>
      ) : (
        <Modal
          title={"Add a new Task"}
          centered
          open={openState}
          onOk={addNewTask}
          onCancel={() => modal(false)}
          width={500}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 600 }}
            className="mt-4 flex flex-col "
          >
            <div className="mt-8 mb-4">
              <Input
                name="title"
                placeholder="Title"
                value={data.plans[data.plans.length - 1]?.title || ""}
                onChange={(e) =>
                  handleTask("title", e.target.value, data.plans.length - 1)
                }
              />
            </div>
            <CustomTextArea
              name="describ"
              placeholder="Enter a Description for your task"
              className="block p-2.5 w-full text-sm 
              text-gray-900 bg-gray-50 
              rounded-lg border border-gray-300
               focus:ring-blue-200 focus:border-blue-200
               "
              value={data.plans[data.plans.length - 1]?.describ || ""}
              onChange={(name, value) =>
                handleTask(name, value, data.plans.length - 1)
              }
              style={{ resize: "vertical", minHeight: 64 }}
            />
            <div className="mt-4 flex flex-row">
              <DatePicker
                className="ml-2"
                name="date"
                onChange={(date, dateString) =>
                  handleTask("day_date", dateString, 0)
                }
              />
              <TimePicker
                defaultValue={dayjs("00:00", format)}
                format={format}
                className="ml-3"
                onChange={(time, timeString) =>
                  handleTask("day_time", timeString, 0)
                }
              />
              {/* <input type="time" name="time" /> */}
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AddTaskModal;
