import displaySpotify from './components/apps/spotify';
import displayVsCode from './components/apps/vscode';
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayTrash } from './components/apps/trash';
// import { displayGedit } from './components/apps/gedit';
import { displayAboutDev } from './components/apps/dev';
import { displayTerminalCalc } from './components/apps/calc';

const openLinkedIn = () => {
    window.open('https://www.linkedin.com/in/dev-patel26/', '_blank');
};

const openGithub = () => {
    window.open('https://github.com/d3v-26', '_blank');
};

const openCacheUp = () => {
    window.open('https://cacheup.tech', '_blank');
};
  

const apps = [
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayChrome,
    },
    {
        id: "calc",
        title: "Calc",
        icon: './themes/Yaru/apps/calc.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminalCalc,
    },
    {
        id: "about-dev",
        title: "About Dev",
        icon: './themes/Yaru/system/user-home.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAboutDev, // Edit name
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        icon: './themes/Yaru/apps/vscode.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayVsCode,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/bash.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "spotify",
        title: "Spotify",
        icon: './themes/Yaru/apps/spotify.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySpotify, // India Top 50 Playlist 😅
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/gnome-control-center.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySettings,
    },
    {
        id: "trash",
        title: "Trash",
        icon: './themes/Yaru/system/user-trash-full.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayTrash,
    },
    {
        id: "linkedin",
        title: "LinkedIn",
        icon: './themes/Yaru/apps/linkedin.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: openLinkedIn,
    },
    {
        id: "github",
        title: "Github",
        icon: './themes/Yaru/apps/github.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: openGithub,
    },
    {
        id: "cacheup",
        title: "Cache Up",
        icon: './themes/Yaru/apps/cacheup.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: openCacheUp,
    },
]

export default apps;