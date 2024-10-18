import { useState, useEffect } from "react";
import { fetchNui } from "../../utils/utils";

interface RuleBookProps {
	GamePlay: string[];
	Server: string[];
	Character: string[];
}
declare global {
	interface Window {
		invokeNative: (method: string, url: string) => void;
	}
}
const RuleBook: React.FC = () => {
	const [discord, setDiscord] = useState<string>("");
	const [ruleBook, setRuleBook] = useState<RuleBookProps>({
		GamePlay: [
			"No Metagaming: Players should not use out-of-character (OOC) information for in-character (IC) actions. Knowledge gained OOC (like player locations from a Discord chat) should not influence their character's decisions.",
			"No Powergaming: Players must not force their actions on other players. This means allowing for natural character development and interactions, and not insisting that only your narrative or actions succeed.",
			"Respect Safe Zones: Designate areas such as hospitals and police stations as 'safe zones' where no violent or illegal activities can take place.",
		],
		Server: [
			"No Random Deathmatch (RDM): Players should not attack or kill other characters without a valid in-character reason. Engage in interactions that lead up to conflict instead of instant aggression.",
			"No Vehicle Deathmatch (VDM): Players should not use vehicles as weapons against other players without a valid roleplay reason. Accidents can happen, but intentional harm using vehicles is not allowed.",
			"Roleplay Over Ruleplay: While following rules is important, always prioritize good roleplay. Don't let rules hinder creative and engaging storytelling.",
			"Respect Player Etiquette: Treat all players with respect, regardless of the in-character relationship. Discriminatory, abusive, or harassing behavior should not be tolerated.",
			"Follow Legal and Illegal Item Usage: Understand and respect the laws of the game world regarding weapon, drug, and item use to maintain realism.",
			"Report Rule Breaks Properly: Use the server's designated method for reporting rule violations. Avoid public accusations and allow admins to handle situations appropriately.",
		],
		Character: [
			"Keep Out of Character Chat Minimal: Use OOC chat sparingly and only when absolutely necessary. Always try to stay in character and use appropriate channels for OOC communication.",
			"Consent for Permadeath: A player's character should only be killed off permanently with the consent of the character's owner, unless server rules specify scenarios where permadeath is applicable.",
			"Use Character-appropriate Speech and Actions: Players should ensure their character's actions and speech reflect their backstory and personality consistently.",
			"Maintain Character Separation: Each character you play should be distinct and separate. Avoid transferring knowledge, relationships, or items between your characters unless it's realistic and logical within the game world.",
			"Adhere to Character Creation Guidelines: Make sure your character's backstory, skills, and traits are realistic and fitting within the game's setting.",
		],
	});

	useEffect(() => {
		fetchNui("getDiscord")
			.then((data: any) => {
				setDiscord(data);
			})
			.catch((error) => {
				console.error("Failed to fetch discord data:", error);
			});
	}, []);

	const handleClick = () => {
		const url = "https://" + discord;
		console.log("Opening URL:", url);
		window.invokeNative("openUrl", url);
	};

	return (
		<>
			{/* Rulebook Container */}
			<div className="flex flex-col h-full w-full ml-56">
				{/* Background */}
				<div className="overflow-hidden">
					{/* Navigation Bar */}
					<nav className="w-[65%] border rounded-md overflow-hidden p-4 sticky top-0 left-0 z-10">
						<ul className="flex justify-between text-lg">
							<li>
								<a
									href="#GamePlay"
									className="px-4 py-2  transition duration-300 ease-in-out text-white"
								>
									Game Play Rules
								</a>
							</li>
							<li>
								<a
									href="#Server"
									className="px-4 py-2 text-white transition duration-300 ease-in-out"
								>
									Server Rules
								</a>
							</li>
							<li>
								<a
									href="#Character"
									className="px-4 py-2 text-white transition duration-300 ease-in-out"
								>
									Character Rules
								</a>
							</li>
						</ul>
					</nav>

					{/* Rulebook Content */}
					<div className="flex flex-col h-[80%] overflow-y-auto mt-4">
						{/* Disclaimer */}
						<h1 className="text-bold text-white">
							These are simply general rules. Join{" "}
							<a
								onClick={handleClick}
								className="text-blue-500 underline cursor-pointer"
							>
								discord
							</a>{" "}
							for full list of rules.
						</h1>
						{/* Background Container */}
						<div
							className="p-4 relative"
							style={{ overflow: "auto", width: "65%" }}
						>
							{/* Game Play Rules */}
							<div
								id="GamePlay"
								className="rounded-md shadow-md border overflow-hidden mb-4 text-white"
							>
								<h2 className="text-3xl font-semibold">Game Play Rules</h2>
								<ul className="list-disc pl-10 text-white">
									{ruleBook.GamePlay.map((rule: string, index: number) => (
										<li key={index} className="py-2">
											{rule}
										</li>
									))}
								</ul>
							</div>

							{/* Server Rules */}
							<div
								id="Server"
								className="rounded-md shadow-md border overflow-hidden mb-4 mt-4 text-white"
							>
								<h2 className="text-3xl font-semibold">Server Rules</h2>
								<ul className="list-disc pl-10 text-white">
									{ruleBook.Server.map((rule: string, index: number) => (
										<li key={index} className="py-2">
											{rule}
										</li>
									))}
								</ul>
							</div>

							{/* Character Rules */}
							<div
								id="Character"
								className="rounded-md shadow-md border overflow-hidden mt-4 text-white"
							>
								<h2 className="text-3xl font-semibold">Character Rules</h2>
								<ul className="list-disc pl-10 text-white">
									{ruleBook.Character.map((rule: string, index: number) => (
										<li key={index} className="py-2">
											{rule}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RuleBook;
