import React, { useState } from 'react';
import Modal from '../Modal';
import { Priority, Status } from '@/state/api';
import { X } from 'lucide-react';

type FilterState = {
    priority?: Priority | '';
    status?: Status | '';
    assigneeId?: number | '';
    tag?: string;
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterState) => void;
    currentFilters: FilterState;
    availableUsers?: Array<{ userId?: number; username: string }>;
}

const ModalFilter = ({ isOpen, onClose, onApplyFilters, currentFilters, availableUsers = [] }: Props) => {
    const [filters, setFilters] = useState<FilterState>(currentFilters);

    const handleApply = () => {
        onApplyFilters(filters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters: FilterState = {
            priority: '',
            status: '',
            assigneeId: '',
            tag: ''
        };
        setFilters(resetFilters);
        onApplyFilters(resetFilters);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} name="Filter Tasks">
            <div className="mt-4 space-y-6">
                {/* Priority Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priority
                    </label>
                    <select
                        value={filters.priority || ''}
                        onChange={(e) => setFilters({ ...filters, priority: e.target.value as Priority | '' })}
                        className="w-full rounded-md border border-gray-300 p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
                    >
                        <option value="">All Priorities</option>
                        <option value={Priority.Urgent}>Urgent</option>
                        <option value={Priority.High}>High</option>
                        <option value={Priority.Medium}>Medium</option>
                        <option value={Priority.Low}>Low</option>
                        <option value={Priority.Backlog}>Backlog</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                    </label>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value as Status | '' })}
                        className="w-full rounded-md border border-gray-300 p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
                    >
                        <option value="">All Statuses</option>
                        <option value={Status.ToDo}>To Do</option>
                        <option value={Status.WorkInProgress}>Work In Progress</option>
                        <option value={Status.UnderReview}>Under Review</option>
                        <option value={Status.Completed}>Completed</option>
                    </select>
                </div>

                {/* Assignee Filter */}
                {availableUsers.length > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Assignee
                        </label>
                        <select
                            value={filters.assigneeId || ''}
                            onChange={(e) => setFilters({ ...filters, assigneeId: e.target.value ? Number(e.target.value) : '' })}
                            className="w-full rounded-md border border-gray-300 p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
                        >
                            <option value="">All Assignees</option>
                            {availableUsers.map((user) => (
                                <option key={user.userId} value={user.userId}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Tag Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tag
                    </label>
                    <input
                        type="text"
                        value={filters.tag || ''}
                        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                        placeholder="Enter tag name"
                        className="w-full rounded-md border border-gray-300 p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-stroke-dark">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-dark-tertiary dark:hover:bg-dark-primary"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 text-white bg-pink-400 rounded-md hover:bg-pink-600"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalFilter;
export type { FilterState };

