import React from 'react'
import ReactDOM from 'react-dom';
import Header from '../Header';
import { X } from 'lucide-react';

type Props = {
    children:React.ReactNode;
    isOpen:boolean;
    onClose:()=>void;
    name:string;
}

const Modal = ({
    children,
    isOpen,
    onClose,
    name
}: Props) => {
    if(!isOpen) return null;
    
  return (
    ReactDOM.createPortal(
        <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-2 sm:p-4 z-50">
            <div className="w-full max-w-2xl rounded-lg bg-white p-3 sm:p-4 shadow-lg dark:bg-black">
                <Header name={name} buttonComponent={
                    <button className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-400 text-white hover:bg-pink-500 transition-colors"
                    onClick={onClose}>
                        <X size={18}/>
                    </button>
                }
                isSmallText/>
                {children}
            </div>
        </div>,
        document.body
    )
  )
}

export default Modal