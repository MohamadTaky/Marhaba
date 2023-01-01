import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = set => ({
	status: "",
	setStatus: payload => set({ status: payload }),
	statusMessage: "",
	setStatusMessage: payload => set({ statusMessage: payload }),
	errorMessage: "",
	setErrorMessage: payload => set({ errorMessage: payload }),

	leftBarActive: true,
	toggleLeftBar: _ => set(state => ({ leftBarActive: !state.leftBarActive })),
	rightBarActive: true,
	toggleRightBar: _ => set(state => ({ rightBarActive: !state.rightBarActive })),

	currentChat: {},
	setCurrentChat: payload => set({ currentChat: payload }),
	currentTab: "chats",
	setCurrentTab: payload => set({ currentTab: payload }),
});

const persistedStore = set => ({
	darkMode: true,
	toggleDarkMode: _ => set(state => ({ darkMode: !state.darkMode })),
});

export const usePersistedStore = create(persist(devtools(persistedStore)));
const useStore = create(devtools(store));

export default useStore;
