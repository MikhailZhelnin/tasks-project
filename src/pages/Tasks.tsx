import { useCallback, useState } from "react";

import TasksList from "./TasksList";
import TasksInput from "./TasksInput";

import type { ITask } from "./interfaces";

const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const handleAddNewTask = useCallback((name: string) => {
        const value = name.trim();
        if (!value) return;
        const id = crypto.randomUUID();
        setTasks(prev => [...prev, { id: id, title: name }]);
    }, []);

    const handleClear = useCallback(() => {
        setTasks([]);
    }, []);

    return (
        <div className="flex justify-center">
            <div className="container flex flex-col justify-center">
                <h1 className="text-4xl font-bold text-center mb-3">Your tasks</h1>
                <TasksInput onAdd={handleAddNewTask} onClear={handleClear} tasksLength={tasks.length} />
                <TasksList tasks={tasks} />
            </div>
        </div>
    );
};

export default Tasks;