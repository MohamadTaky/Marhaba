import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n.use(initReactI18next).use(Backend).init({
	fallbackLng: "en",
});
i18n.services.formatter.add(
	"capitalize",
	(value, lng, options) => `${value[0].toUpperCase()}${value.slice(1)}`
);
