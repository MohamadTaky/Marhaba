import React from "react";
import { useTranslation } from "react-i18next";

export default function LagnuageSelector() {
	const { t, i18n } = useTranslation();
	return (
		<>
			<p className="mt-auto">{t("language")} :</p>
			<div className="bg-skin-element flex rounded-lg overflow-hidden">
				<button
					onClick={() => i18n.changeLanguage("ar")}
					className={`${i18n.language === "ar" && "bg-skin-interactable-active"} px-2 py-1`}>
					العربية
				</button>
				<button
					onClick={() => i18n.changeLanguage("en")}
					className={`${i18n.language === "en" && "bg-skin-interactable-active"} px-2 py-1`}>
					English
				</button>
			</div>
		</>
	);
}
