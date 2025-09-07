import { memo } from 'react';

import type { ITask } from './interfaces';

interface ITaskListProps {
    tasks: ITask[]
};

const TasksList = memo(function TasksList({ tasks }: ITaskListProps) {
    return tasks.length > 0 ? (
        <div className="flex flex-col items-center">
            <span className="mb-1 text-lg">You have {tasks.length} {tasks.length === 0 ? 'task' : 'tasks'}:</span>
            <ul className="w-90 p-2 border-1 border-gray-300 ">
                {tasks.map((task, index) => (
                    <li key={task.id} data-testId="task" className={tasks.length === 1 ? 'mb-0' : 'mb-2 last:mb-0'}>
                        <p>{index + 1}: {task.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <div data-testId="empty-tasks-list" className="text-center">You don't have any tasks. Please add at least one.</div>
    );
});

export default TasksList;