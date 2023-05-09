import React from "react";

export default function NavCompanyIcon({ onClickNavigate, robodocIcon, companyName }) {
	return (
		<div>
			<button type="button" onClick={onClickNavigate} className="flex items-center py-4 px-2">
				<img src={robodocIcon} alt="RoboDoc Icon" className="w-10 mr-2" />
				<span className="font-semibold text-gray-500 text-base">{companyName}</span>
			</button>
		</div>
	);
}
