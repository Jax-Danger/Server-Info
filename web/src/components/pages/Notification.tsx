import React, { useEffect, useState } from "react";

interface NotificationProps {
	message: string;
	duration: number;
	onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
	message,
	duration,
	onClose,
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div className="fixed top-80 right-4 bg-red-300 border border-red-500 text-red-800 px-4 py-2 rounded shadow-md transition-opacity duration-500 ease-in-out opacity-100">
			<div>{message}</div>
			<div className="w-full bg-red-400 h-1 mt-2">
				<div className="bg-red-600 h-1 animate-loading-bar"></div>
			</div>
		</div>
	);
};

export default Notification;
