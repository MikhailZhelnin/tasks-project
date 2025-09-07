import { memo, useState } from "react";

interface ITasksInputProps {
    onAdd: (title: string) => void
    onClear: () => void
    tasksLength: number
}

const TasksInput = memo(function TasksInput({ onAdd, onClear, tasksLength }: ITasksInputProps) {

    const [formInput, setFormInput] = useState('');

    return (
        <div className="mb-5 flex items-center justify-center">
            <input
                className="border-1 mr-3 p-2"
                type="text"
                value={formInput}
                onChange={(e) => setFormInput(e.target.value)}
                placeholder="Enter your task..."
            />
            <button
                className="mr-3 p-2 border-1 border-blue-300 bg-blue-300 cursor-pointer"
                onClick={() => { onAdd(formInput); setFormInput('') }}
            >
                Add new task
            </button>
            <button
                className="mr-3 p-2 border-1 border-red-300 bg-red-300 cursor-pointer"
                onClick={onClear}
                disabled={tasksLength === 0}
            >
                Clear
            </button>
        </div>
    )
});

export default TasksInput