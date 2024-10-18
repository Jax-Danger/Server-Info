// App.tsx
import { useEffect, useState } from "react";
import { fetchNui } from "../utils/utils";
import {
	Router,
	Routes,
	Route,
	useNavigate,
	useLocation,
	HomePage,
	SubmitReport,
	RuleBook,
} from "./imports"; /* These are just a bunch of imports that are used in the app.
Found in the imports.ts file.*/

// This is a component that will be used to navigate between the pages.
const NavigationButtons: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [activePath, setActivePath] = useState(location.pathname);
	const [initialNavigationDone, setInitialNavigationDone] = useState(false);
	/* This function changes the button's background color based on the current path.
	This is used to indicate what page the user is viewing.*/
	const getButtonClass = (path: string) => {
		return location.pathname === path
			? "bg-[#121820] text-white p-2 rounded-lg"
			: "bg-[#050709] text-white hover:bg-[#232b32] p-2 rounded-lg";
	};
	const handleClick = (path: string) => {
		setActivePath(path);
		navigate(path);
	};
	useEffect(() => {
		if (!initialNavigationDone) {
			navigate("/");
			setActivePath("/");
			setInitialNavigationDone(true);
		}
	}, [navigate, initialNavigationDone]);

	return (
		<div className="absolute left-2 top-4 flex flex-col space-y-4">
			<button className={getButtonClass("/")} onClick={() => handleClick("/")}>
				Home
			</button>
			<button
				className={getButtonClass("/reports")}
				onClick={() => handleClick("/reports")}
			>
				Submit Report
			</button>
			<button
				className={getButtonClass("/rules")}
				onClick={() => handleClick("/rules")}
			>
				Rule Book
			</button>
		</div>
	);
};

// This is the main component that will be rendered.
const App: React.FC = () => {
	return (
		<Router>
			<div className="absolute left-[25%] top-[14%] w-[52%] h-[65%] bg-[#1b2227] border-[3px] border-black rounded-3xl font-sans">
				<NavigationButtons />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/reports" element={<SubmitReport />} />
					<Route path="/rules" element={<RuleBook />} />
				</Routes>
				{/* Close UI Button */}
				<button
					className="select-none absolute top-4 right-4 bg-red-500 text-white px-3 p-2 rounded-md"
					onClick={() => fetchNui("hideFrame")}
				>
					X
				</button>
			</div>
		</Router>
	);
};

export default App;
