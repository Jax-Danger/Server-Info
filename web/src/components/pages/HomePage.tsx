import React, { useState, useEffect } from "react";
import { debugData, useNuiEvent } from "../../utils/utils";
debugData([{ action: "setVisible", data: true }]);

/**This is the Home Page page.
 This is the first screen players see when they open the UI.*/
const HomePage: React.FC = () => {
	const [servername, setServerName] = useState<string>("Legion City RolePlay");
	const [subheader, setSubHeader] = useState<string>(
		"This is under the Header."
	);
	const [description, setDescription] = useState<string>(
		"This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description.This is the description."
	);
	const [footer, setFooter] = useState<string>("This is the footer");
	/*This fetches the server info from the server when the page is loaded.
        This happens only once due to the useEffect hook.	*/
	useNuiEvent("getServer", (data: any) => {
		setServerName(data.serverName);
		setSubHeader(data.subheader);
		setDescription(data.description);
		setFooter(data.footer);
	});

	return (
		<>
			{/* Default Title */}
			<div className="flex flex-col items-center justify-start h-full">
				<div className="relative max-w-[600px] w-full px-2 flex flex-col space-y-4 mt-4 flex-grow">
					<h1 className="text-2xl font-bold text-[#ededed] text-center">
						Welcome to {servername}
					</h1>
					<p className="mt-2 text-lg text-center text-[#CCCCCC]">{subheader}</p>
					<div className="mt-44 text-center text-[#999999]">
						<p className="break-words">{description}</p>
					</div>
				</div>
				<footer className="w-full text-center text-[#999999] mt-auto py-4">
					<p className="break-words">{footer}</p>
				</footer>
			</div>
		</>
	);
};

export default HomePage;
