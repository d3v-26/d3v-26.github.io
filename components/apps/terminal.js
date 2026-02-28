import React, { Component } from 'react'
import $ from 'jquery';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["books", "projects", "private_records", "skills", "languages", "DDU", "interests", "Desktop"],
            books: ["Agatha_Christie_Death_on_the_Nile.pdf", "Agatha_Christie_THE_ABC_MURDERS.pdf", "The Magicians by Lev Grossman.pdf", "Rich_Dad_Poor_Dad.pdf"],
            skills: ["Full Stack development", "React.js", "jQuery", "Flutter", "Express.js", "SQL", "Firebase", "Node", "AWS", "ML", "NLP"],
            projects: ["Intermediate-task-transfer-learning", "compact-compiler", "automated-time-table-generator", "gatortaxi-simulation", "flutter-shabdamitra-app"],
            interests: ["Software Engineering", "Full Stack Dev", "MLOps", "DevOps"],
            languages: ["Python", "Javascript", "C++", "Java"],
            DDU: ["18CEUOG126.pdf"]
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">d3v@ubuntu</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            let terminal_row_id = $(e.target).data("row-id");
            let currentInput = $(`input#terminal-input-${terminal_row_id}`).val();
            let completed = this.tabComplete(currentInput);
            if (completed !== null) {
                $(`input#terminal-input-${terminal_row_id}`).val(completed);
                $(`#show-${terminal_row_id}`).text(completed);
            }
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    getDesktopFiles = () => {
        try {
            return JSON.parse(localStorage.getItem('new_folders') || '[]').map(f => f.name);
        } catch (_) {
            return [];
        }
    }

    longestCommonPrefix = (strs) => {
        if (!strs.length) return '';
        let prefix = strs[0];
        for (let i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.slice(0, -1);
                if (!prefix) return '';
            }
        }
        return prefix;
    }

    tabComplete = (input) => {
        const trimmed = input.trimStart();
        const words = trimmed.split(' ');

        // Completing the command itself (no space yet)
        if (words.length === 1) {
            const partial = words[0];
            const commands = ['cd', 'ls', 'pwd', 'echo', 'clear', 'exit', 'mkdir', 'rm', 'rename',
                'whoami', 'date', 'uname', 'fortune', 'neofetch', 'history',
                'code', 'spotify', 'chrome', 'about-dev', 'todoist', 'trash', 'settings', 'sendmsg', 'terminal', 'help', 'sudo'];
            const matches = commands.filter(c => c.startsWith(partial));
            if (!matches.length) return null;
            const completed = this.longestCommonPrefix(matches);
            return completed || null;
        }

        const cmd = words[0];
        const partial = words[words.length - 1];

        if (cmd === 'cd' || cmd === 'ls') {
            const dirs = [...(this.child_directories[this.curr_dir_name] || [])];
            // also offer ~/Desktop shorthand if not in Desktop already
            if (this.curr_dir_name !== 'Desktop') dirs.push('~/Desktop');
            const matches = dirs.filter(d => d.startsWith(partial));
            if (!matches.length) return null;
            const completed = this.longestCommonPrefix(matches);
            if (!completed) return null;
            return words.slice(0, -1).join(' ') + (words.length > 1 ? ' ' : '') + completed;
        }

        if (cmd === 'rm') {
            const folders = this.getDesktopFiles();
            const matches = folders.filter(f => f.toLowerCase().startsWith(partial.toLowerCase()));
            if (!matches.length) return null;
            const completed = this.longestCommonPrefix(matches);
            if (!completed) return null;
            return cmd + ' ' + completed;
        }

        if (cmd === 'rename' && words.length === 2) {
            // Only complete the first argument (old name)
            const folders = this.getDesktopFiles();
            const matches = folders.filter(f => f.toLowerCase().startsWith(partial.toLowerCase()));
            if (!matches.length) return null;
            const completed = this.longestCommonPrefix(matches);
            if (!completed) return null;
            return cmd + ' ' + completed;
        }

        return null;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        const NOT_FOUND = `<span class="text-red-400">Command '<b>${main}</b>' not found.</span><br>Run <b>help</b> for available commands.`;
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "cd: too many arguments";
                    break;
                }

                if (rest === "private_records") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (rest === "~/Desktop" || rest === "~/desktop") {
                    this.current_directory = "~/Desktop";
                    this.curr_dir_name = "Desktop";
                    break;
                }

                if ((this.child_directories[this.curr_dir_name] || []).includes(rest)) {
                    if (rest === "Desktop") {
                        this.current_directory = "~/Desktop";
                        this.curr_dir_name = "Desktop";
                    } else {
                        this.current_directory += "/" + rest;
                        this.curr_dir_name = rest;
                    }
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `cd: ${rest}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (target === "~/Desktop" || target === "~/desktop" || target === "Desktop") {
                    let dt_folders = JSON.parse(localStorage.getItem('new_folders') || '[]');
                    if (dt_folders.length === 0) {
                        result = "No folders on Desktop. Use 'mkdir &lt;name&gt;' to create one (limit: 10).";
                    } else {
                        let flist = ['<div class="flex justify-start flex-wrap items-center">'];
                        dt_folders.forEach(f => {
                            flist.push(`<span class="font-bold mr-3 text-ubt-blue">'${this.xss(f.name)}'</span>`);
                        });
                        flist.push(`<span class="text-gray-400 ml-1">(${dt_folders.length}/10)</span>`);
                        flist.push('</div>');
                        result = flist.join('');
                    }
                    break;
                }

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${target}': No such file or directory`;
                }
                break;
            case "mkdir":
                if (rest !== "") {
                    let mkdirErr = this.props.addFolder(rest);
                    result = mkdirErr || "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "rm":
                if (rest === "") {
                    result = "rm: missing operand";
                    break;
                }
                {
                    let rm_folders = JSON.parse(localStorage.getItem('new_folders') || '[]');
                    let rm_target = rm_folders.find(f => f.name.toLowerCase() === rest.toLowerCase());
                    if (!rm_target) {
                        result = `rm: '${this.xss(rest)}': No such folder on Desktop`;
                    } else {
                        this.props.deleteFolder(`new-folder-${rm_target.id}`);
                        result = `Removed '${this.xss(rm_target.name)}' from Desktop.`;
                    }
                }
                break;
            case "rename":
                if (words.length < 2) {
                    result = "rename: usage: rename &lt;old-name&gt; &lt;new-name&gt;";
                    break;
                }
                {
                    let rn_old = words[0];
                    let rn_new = words.slice(1).join(' ');
                    let rn_folders = JSON.parse(localStorage.getItem('new_folders') || '[]');
                    let rn_target = rn_folders.find(f =>
                        f.name.toLowerCase() === rn_old.toLowerCase() ||
                        f.id === rn_old.toLowerCase().replace(/\s+/g, '-')
                    );
                    if (!rn_target) {
                        result = `rename: '${this.xss(rn_old)}': No such folder on Desktop`;
                    } else {
                        let rn_err = this.props.renameFolder(`new-folder-${rn_target.id}`, rn_new);
                        result = rn_err || `Renamed to '${this.xss(rn_new)}'`;
                    }
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/dev")
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "whoami":
                result = `d3v — full-stack dev, professional googler, and occasional bug creator 🐛<br>Currently deployed to: Earth 🌍 | Status: caffeine-dependent ☕`;
                break;
            case "date": {
                const d = new Date();
                result = `${d.toDateString()} ${d.toLocaleTimeString()} — yes, you're still procrastinating 😄`;
                break;
            }
            case "uname":
                result = "Linux d3v-ubuntu 6.5.0-portfolio #1 SMP PREEMPT Dev Edition x86_64 GNU/Linux";
                break;
            case "fortune": {
                const fortunes = [
                    "Talk is cheap. Show me the code. — Linus Torvalds",
                    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Fowler",
                    "First, solve the problem. Then, write the code. — John Johnson",
                    "Code is like humor. When you have to explain it, it's bad. — Cory House",
                    "It works on my machine. — Every developer, ever 🤷",
                    "sudo make me a sandwich. — Anonymous sysadmin",
                ];
                result = `🎱 ${fortunes[Math.floor(Math.random() * fortunes.length)]}`;
                break;
            }
            case "history":
                if (this.prev_commands.length === 0) {
                    result = "No commands in history yet.";
                } else {
                    result = this.prev_commands
                        .map((cmd, i) => `<span class="text-gray-400">${i + 1}</span>  ${this.xss(cmd)}`)
                        .join('<br>');
                }
                break;
            case "neofetch":
                result = `<pre class="text-ubt-green">   _____  ____  _  __\n  |  __ \\|___ \\| |/_ |\n  | |  | | __) | |_| |\n  | |  | ||__ &lt;|____  |\n  | |__| |___) |   | |\n  |_____/|____/    |_|</pre><div class="grid grid-cols-2 gap-x-3 mt-1"><span class="text-ubt-green">OS</span><span>Ubuntu 22.04 LTS (Portfolio Edition)</span><span class="text-ubt-green">Shell</span><span>d3vsh 1.0.0</span><span class="text-ubt-green">Role</span><span>Full-Stack Developer</span><span class="text-ubt-green">Stack</span><span>React · Node · Python · AWS</span><span class="text-ubt-green">Coffee/day</span><span>∞ cups ☕</span><span class="text-ubt-green">Uptime</span><span>since 2001</span><span class="text-ubt-green">GitHub</span><span>github.com/d3v-26</span></div>`;
                break;
            case "code":      this.props.openApp("vscode");    break;
            case "spotify":   this.props.openApp("spotify");   break;
            case "chrome":    this.props.openApp("chrome");    break;
            case "todoist":   this.props.openApp("todo-ist");  break;
            case "trash":     this.props.openApp("trash");     break;
            case "about-dev": this.props.openApp("about-dev"); break;
            case "terminal":  this.props.openApp("terminal");  break;
            case "settings":  this.props.openApp("settings");  break;
            case "sendmsg":   this.props.openApp("gedit");     break;
            case "help":
                result = `<div class="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-1"><span class="text-ubt-green font-bold col-span-2 mt-1">Navigation</span><span class="text-yellow-300">cd &lt;dir&gt;</span><span class="text-gray-300">change directory</span><span class="text-yellow-300">ls [dir]</span><span class="text-gray-300">list directory contents</span><span class="text-yellow-300">pwd</span><span class="text-gray-300">print working directory</span><span class="text-ubt-green font-bold col-span-2 mt-1">Desktop Folders</span><span class="text-yellow-300">mkdir &lt;name&gt;</span><span class="text-gray-300">create a folder on desktop</span><span class="text-yellow-300">rm &lt;name&gt;</span><span class="text-gray-300">delete a desktop folder</span><span class="text-yellow-300">rename &lt;old&gt; &lt;new&gt;</span><span class="text-gray-300">rename a desktop folder</span><span class="text-ubt-green font-bold col-span-2 mt-1">Open Apps</span><span class="text-yellow-300">code / spotify / chrome</span><span class="text-gray-300">open app windows</span><span class="text-yellow-300">about-dev / todoist / settings</span><span class="text-gray-300">open app windows</span><span class="text-ubt-green font-bold col-span-2 mt-1">Fun</span><span class="text-yellow-300">whoami</span><span class="text-gray-300">who is d3v?</span><span class="text-yellow-300">neofetch</span><span class="text-gray-300">system info, portfolio style</span><span class="text-yellow-300">fortune</span><span class="text-gray-300">random dev wisdom</span><span class="text-yellow-300">date</span><span class="text-gray-300">what time is it?</span><span class="text-yellow-300">history</span><span class="text-gray-300">your command history</span><span class="text-yellow-300">sudo rm -rf /</span><span class="text-gray-300">try it 😏</span></div>`;
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":
                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            default:
                result = NOT_FOUND;
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '"':
                    return '&quot;';
                case "'":
                    return '&#x27;';
                case '/':
                    return '&#x2F;';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp, deleteFolder, renameFolder) => {
    return <Terminal addFolder={addFolder} openApp={openApp} deleteFolder={deleteFolder} renameFolder={renameFolder}> </Terminal>;
}
