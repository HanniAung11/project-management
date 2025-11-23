import React from 'react';
import Modal from '../Modal';
import { Comment } from '@/state/api';
import Image from 'next/image';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    comments: Comment[];
    taskTitle: string;
}

const ModalComments = ({ isOpen, onClose, comments, taskTitle }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} name={`Comments - ${taskTitle}`}>
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {comments && comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div 
                                key={comment.id} 
                                className="rounded-lg border border-gray-200 p-4 dark:border-stroke-dark"
                            >
                                <div className="flex items-start gap-3">
                                    {comment.user?.profilePictureUrl && (
                                        <Image
                                            src={`/${comment.user.profilePictureUrl}`}
                                            alt={comment.user.username}
                                            width={40}
                                            height={40}
                                            className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover dark:border-dark-tertiary"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {comment.user?.username || 'Unknown User'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-neutral-300">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-neutral-400">
                        <p>No comments yet.</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalComments;

