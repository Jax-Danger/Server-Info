import { useState } from "react";
import Notification from "./Notification"; // Adjust the import path as needed
import { fetchNui } from "../../utils/utils";

interface PlayerReportProps {
	playerName: string;
	setPlayerName: (value: string) => void;
	playerID: string;
	setPlayerID: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
}

interface BugErrorIssueReportProps {
	imageLink?: string;
	setImageLink: (value: string) => void;
	details: string;
	setDetails: (value: string) => void;
}

const PlayerReport: React.FC<PlayerReportProps> = ({
	playerName,
	setPlayerName,
	playerID,
	setPlayerID,
	description,
	setDescription,
}) => (
	<>
		<div className="mb-4">
			<label
				className="block text-slate-100 text-sm font-bold mb-2"
				htmlFor="playerName"
			>
				Player Name
			</label>
			<input
				id="playerName"
				type="text"
				value={playerName}
				onChange={(e) => setPlayerName(e.target.value)}
				className="shadow appearance-none border rounded w-full  py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Enter the Player's name"
			/>
		</div>
		<div className="mb-4">
			<label
				className="block text-slate-200 text-sm font-bold mb-2"
				htmlFor="playerID"
			>
				Player ID
			</label>
			<input
				id="playerID"
				type="text"
				value={playerID}
				onChange={(e) => setPlayerID(e.target.value)}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Enter the Player's ID"
			/>
		</div>
		<div className="mb-6">
			<label
				className="block text-slate-200 text-sm font-bold mb-2"
				htmlFor="description"
			>
				Description
			</label>
			<textarea
				id="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className="resize-none min-h-20 shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Enter the description"
			/>
		</div>
	</>
);

const BugErrorIssueReport: React.FC<BugErrorIssueReportProps> = ({
	imageLink,
	setImageLink,
	details,
	setDetails,
}) => (
	<>
		<div className="mb-6">
			<label
				className="block text-slate-200 text-sm font-bold mb-2"
				htmlFor="details"
			>
				Details
			</label>
			<textarea
				id="details"
				value={details}
				onChange={(e) => setDetails(e.target.value)}
				className="resize-none min-h-20 shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Enter the details"
			/>
		</div>
		<div className="mb-4">
			<label
				className="block text-slate-200 text-sm font-bold mb-2"
				htmlFor="imageLink"
			>
				Image Link
			</label>
			<input
				id="imageLink"
				type="text"
				value={imageLink}
				onChange={(e) => setImageLink(e.target.value)}
				className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Enter the image link"
			/>
		</div>
	</>
);

const SubmitReport = () => {
	const [playerName, setPlayerName] = useState("");
	const [playerID, setPlayerID] = useState("");
	const [subject, setSubject] = useState("");
	const [details, setDetails] = useState("");
	const [reportType, setReportType] = useState("Player");
	const [imageLink, setImageLink] = useState("");
	const [showNotification, setShowNotification] = useState(false);
	const [notificationMessage, setNotificationMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validation logic
		if (
			!subject ||
			(reportType === "Player" && (!playerName || !playerID || !details)) ||
			((reportType === "Bug" ||
				reportType === "Error" ||
				reportType === "Issue") &&
				(!imageLink || !details))
		) {
			setNotificationMessage("Err: You need to fill in all details of report.");
		} else {
			// Handle form submission logic here
			console.log({
				playerName,
				playerID,
				subject,
				details,
				reportType,
				imageLink,
			});
			fetchNui("submitReport", {
				playerName: playerName,
				playerID: playerID,
				subject: subject,
				details: details,
				reportType: reportType,
				imageLink: imageLink,
			});
			setNotificationMessage("Report submitted");
		}

		setShowNotification(true);
	};

	return (
		<div className="max-w-xl mx-auto">
			<h1 className="text-2xl text-[#CCCCCC] font-bold mb-4 ml-5 text-center">
				Submit Report
			</h1>
			<form onSubmit={handleSubmit} className="px-10 pt-2 pb-8 mb-2">
				<div className="mb-4">
					<label
						className="block text-slate-100 text-sm font-bold mb-2"
						htmlFor="reportType"
					>
						Report Type
					</label>
					<select
						id="reportType"
						value={reportType}
						onChange={(e) => setReportType(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
					>
						<option value="Player">Player</option>
						<option value="Bug">Bug</option>
						<option value="Error">Error</option>
						<option value="Issue">Issue</option>
					</select>
				</div>

				<div className="mb-4">
					<label
						className="block text-slate-200 text-sm font-bold mb-2"
						htmlFor="subject"
					>
						Subject
					</label>
					<input
						id="subject"
						type="text"
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-800 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Enter the subject"
					/>
				</div>

				{reportType === "Player" && (
					<PlayerReport
						playerName={playerName}
						setPlayerName={setPlayerName}
						playerID={playerID}
						setPlayerID={setPlayerID}
						description={details}
						setDescription={setDetails}
					/>
				)}

				{(reportType === "Bug" ||
					reportType === "Error" ||
					reportType === "Issue") && (
					<BugErrorIssueReport
						imageLink={imageLink}
						setImageLink={setImageLink}
						details={details}
						setDetails={setDetails}
					/>
				)}

				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-[#121820] hover:-bg-[#232b32] text-slate-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Submit
					</button>
				</div>
			</form>
			{showNotification && (
				<Notification
					message={notificationMessage}
					duration={2000}
					onClose={() => setShowNotification(false)}
				/>
			)}
		</div>
	);
};

export default SubmitReport;
