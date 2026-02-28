import React, { Component, useState, useEffect } from 'react';

export class AboutDev extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about dev" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Dev's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutDev;

export const displayAboutDev = () => {
    return <AboutDev />;
}


function About() {
    return (
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/dev-bitmoji.png" alt="Dev Patel Logo" />
            </div>
            <div className="mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>Hi, I'm <span className="font-bold">Dev Patel</span></div>
                <div className="font-normal mt-1">
                    <span className="text-pink-600 font-bold">Full Stack Engineer</span>
                    <span className="text-gray-400 font-light"> · </span>
                    <span className="text-ubt-gedit-orange font-semibold">ML Enthusiast</span>
                </div>
            </div>
            <div className="mt-4 relative md:my-6 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className="mt-2 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className="list-pc">
                    <span className="font-medium">MS Computer Science</span> from the University of Florida <span className="text-gray-400">(GPA 3.8/4.0)</span> with <span className="font-medium">2+ years of industry experience</span> shipping production-grade full-stack systems. Actively seeking full-time Software Engineer roles — <a className="text-ubt-gedit-orange underline" href="mailto:devrpatel26@gmail.com">devrpatel26@gmail.com</a>
                </li>
                <li className="mt-3 list-building">
                    I build end-to-end — <span className="font-medium">React / Next.js</span> frontends, <span className="font-medium">Node.js / Go</span> backends, and <span className="font-medium">ML pipelines</span> with PyTorch. I care as much about DX and clean architecture as I do about shipping fast.
                </li>
                <li className="mt-3 list-star">
                    Passionate about bridging <span className="font-medium text-ubt-gedit-orange">AI research and real-world products</span> — NLP, computer vision, and generative models are my playground. Also obsessed with crafting delightful UI/UX (this portfolio is exhibit A).
                </li>
                <li className="mt-3 list-time">
                    Off the keyboard: Elden Ring ⚔️, GTA V, Call of Duty, Formula 1 🏎️, and <a className="underline" href="https://www.youtube.com/@Sidemen" target="_blank" rel="noreferrer">Sidemen</a> marathons. Sometimes a book, if the game servers are down.
                </li>
            </ul>
        </>
    )
}
function Education() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="w-10/12 mt-4 ml-4 px-0 md:px-1 space-y-6">
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        University of Florida
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Master of Science · Computer Science · 2022 – 2024</div>
                    <div className="text-sm text-green-400 font-semibold mt-1">GPA 3.8 / 4.0</div>
                    <div className="mt-2 text-xs text-gray-300 font-medium uppercase tracking-wide">Relevant Coursework</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {["Advanced Data Structures", "Operating Systems", "Distributed Computing", "Machine Learning", "Computer Vision", "Natural Language Processing", "Compilers", "Analysis of Algorithms"].map(c => (
                            <span key={c} className="px-2 py-0.5 bg-gray-700 bg-opacity-60 rounded text-xs text-gray-200">{c}</span>
                        ))}
                    </div>
                </li>
                <li className="list-disc">
                    <div className="text-lg md:text-xl text-left font-bold leading-tight">
                        Dharmsinh Desai University
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Bachelor of Technology · Computer Engineering · 2018 – 2022</div>
                    <div className="text-sm text-green-400 font-semibold mt-1">CGPA 8.9 / 10</div>
                    <div className="mt-2 text-xs text-gray-300 font-medium uppercase tracking-wide">Relevant Coursework</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {["Data Structures & Algorithms", "Database Management", "Computer Networks", "Object-Oriented Programming", "Software Engineering", "Web Technologies", "Artificial Intelligence", "Cloud Computing"].map(c => (
                            <span key={c} className="px-2 py-0.5 bg-gray-700 bg-opacity-60 rounded text-xs text-gray-200">{c}</span>
                        ))}
                    </div>
                </li>
            </ul>
        </>
    )
}
function Skills() {
    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className="tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className="list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    Full-stack engineer with depth across <strong className="text-ubt-gedit-orange">systems programming, web development, and applied ML</strong>. Comfortable from bare-metal algorithms to cloud deployments.
                </li>
                <li className="list-arrow text-sm md:text-base mt-3 leading-tight tracking-tight">
                    Here's my current toolkit:
                </li>
            </ul>

            {/* Languages */}
            <div className="w-full md:w-10/12 mt-5">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 pl-1">Languages</div>
                <div className="flex flex-wrap justify-start items-center gap-1 px-1">
                    <img className="m-0.5" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" alt="JavaScript" />
                    <img className="m-0.5" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
                    <img className="m-0.5" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="Python" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white" alt="Go" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Java-ED8B00?style=flat&logo=openjdk&logoColor=white" alt="Java" />
                    <img className="m-0.5" src="https://img.shields.io/badge/C%2B%2B-00599C?style=flat&logo=c%2B%2B&logoColor=white" alt="C++" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Dart-0175C2?style=flat&logo=dart&logoColor=white" alt="Dart" />
                    <a href="https://www.google.com/search?q=is+html+a+language%3F" target="_blank" rel="noreferrer"><img title="yes it's a language!" className="m-0.5" src="https://img.shields.io/badge/-HTML5-%23E44D27?style=flat&logo=html5&logoColor=ffffff" alt="HTML5" /></a>
                    <img className="m-0.5" src="https://img.shields.io/badge/-Sass-%23CC6699?style=flat&logo=sass&logoColor=ffffff" alt="Sass" />
                </div>
            </div>

            {/* Frameworks & Libraries */}
            <div className="w-full md:w-10/12 mt-4">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 pl-1">Frameworks & Libraries</div>
                <div className="flex flex-wrap justify-start items-center gap-1 px-1">
                    <img className="m-0.5" src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=ffffff" alt="Next.js" />
                    <img className="m-0.5" src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=ffffff" alt="React" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white" alt="Angular" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white" alt="Flutter" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
                    <img className="m-0.5" src="https://img.shields.io/badge/-Nodejs-339933?style=flat&logo=Node.js&logoColor=ffffff" alt="Node.js" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white" alt="Redux" />
                    <img className="m-0.5" src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white" alt="PyTorch" />
                    <img className="m-0.5" src="https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white" alt="jQuery" />
                </div>
            </div>

            {/* Tools & Infra */}
            <div className="w-full md:w-10/12 mt-4">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2 pl-1">Tools & Infrastructure</div>
                <div className="flex flex-wrap justify-start items-center gap-1 px-1">
                    <img className="m-0.5" src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="Git" />
                    <img className="m-0.5" src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white" alt="GitHub Actions" />
                    <img className="m-0.5" src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=firebase&logoColor=ffffff" alt="Firebase" />
                    <img className="m-0.5" src="https://img.shields.io/badge/MySQL-00000F?style=flat&logo=mysql&logoColor=white" alt="MySQL" />
                    <img className="m-0.5" src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL" />
                    <img className="m-0.5" src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker" />
                    <img className="m-0.5" src="http://img.shields.io/badge/-Linux-0078D6?style=flat&logo=linux&logoColor=ffffff" alt="Linux" />
                </div>
            </div>
        </>
    )
}

const project_list = [
    {
        name: "Ubuntu Themed Portfolio Website",
        date: "Apr 2024",
        link: "https://github.com/d3v-26/d3v-26.github.io",
        description: [
            "Ubuntu themed portfolio website built with Next.js and Tailwind CSS",
        ],
        domains: ["Next.js", "Tailwind CSS", "javascript"]
    },
    {
        name: "Walkie Talkie",
        date: "Apr 2025",
        link: "https://github.com/d3v-26/walkie-talkie",
        description: [
            "Simple walkie-talkie–style application written in Go that lets users on the same local network communicate using audio.",
        ],
        domains: ["GO", "UDP", "Audio Streaming"]
    },
    {
        name: "GatorTaxi",
        date: "Apr 2023",
        link: "https://github.com/d3v-26/GatorTaxi",
        description: [
            "Used Red-Black Trees & MinHeap for ride information storage using C++ from scratch",
        ],
        domains: ["C++", "MinHeap", "RedBlackTree"]
    },
    {
        name: "Compact Compiler",
        date: "Dec 2022",
        link: "https://github.com/d3v-26/Compiler-PLP-Project",
        description: [
            "Implement a complete compiler using Java and ASM for a user-defined language",
        ],
        domains: ["Java", "ASM"]
    },
    {
        name: "Distributed Concurrent Systems",
        date: "Aug 2023",
        link: "https://github.com/d3v-26/COP5615-Project3",
        description: [
            "Implemented a concurrent client-server system in F#",
        ],
        domains: ["F#", "Distributed Principles"]
    },
    {
        name: "Intermediate task transfer learning",
        date: "Apr 2023",
        link: "https://drive.google.com/file/d/1qhvBs44mK5bejG8WJHAC3k9GS7XnhP6a/view?usp=share_link",
        description: [
            "Implemented a task transfer learning project, for sarcasm detection, using transfer learning techniques from a related tasks such as sentiment detection, humor detection, irony detection etc",
        ],
        domains: ["Python", "PyTorch", "Multi-modal analysis", "NLP"]
    },
    {
        name: "GAN & VAE on MNIST",
        date: "Apr 2023",
        link: "https://github.com/d3v-26/GAN-VAE-MNIST",
        description: [
            "Implemented GAN and VAE on MNIST dataset.",
        ],
        domains: ["Python", "PyTorch", "GAN", "VAE"]
    },
    {
        name: "React Boilerplate",
        date: "Feb 2021",
        link: "https://github.com/d3v-26/react-boilerplate",
        description: [
            "Boilerplate code to get you started on your react project",
        ],
        domains: ["React", "javascript"]
    },
    {
        name: "HackerNews Feed",
        date: "Feb 2021",
        link: "https://github.com/d3v-26/hacker-feed",
        description: [
            "A side project to develop a pretty HackerNews Feed.",
        ],
        domains: ["javascript", "React", "Materialize"]
    },
    {
        name: "Automated Time Table Generator",
        date: "Sep 2022",
        link: "https://github.com/d3v-26/Automatic-Time-Table-Generator",
        description: [
            "An automated time table generator using genetic algorithms in java.",
        ],
        domains: ["Java", "JavaFX", "MySQL"]
    },
    {
        name: "Online Chatting",
        date: "Sep 2022",
        link: "https://github.com/d3v-26/Online-Chatting-Application",
        description: [
            "Online Chatting Application Using Angular.js",
        ],
        domains: ["Angular","TypeScript","SCSS"]
    }
];

// Deterministic palette — full class names so Tailwind JIT includes them
const TAG_PALETTE = [
    ["border-yellow-300", "text-yellow-300"],
    ["border-pink-400", "text-pink-400"],
    ["border-blue-400", "text-blue-400"],
    ["border-green-400", "text-green-400"],
    ["border-purple-400", "text-purple-400"],
    ["border-orange-300", "text-orange-300"],
    ["border-cyan-400", "text-cyan-400"],
    ["border-red-400", "text-red-400"],
    ["border-indigo-400", "text-indigo-400"],
    ["border-teal-400", "text-teal-400"],
    ["border-yellow-500", "text-yellow-500"],
    ["border-pink-500", "text-pink-500"],
    ["border-blue-300", "text-blue-300"],
    ["border-green-300", "text-green-300"],
    ["border-purple-300", "text-purple-300"],
    ["border-orange-400", "text-orange-400"],
    ["border-cyan-300", "text-cyan-300"],
    ["border-red-300", "text-red-300"],
    ["border-indigo-300", "text-indigo-300"],
    ["border-teal-300", "text-teal-300"],
];

function tagColor(tag) {
    let h = 0;
    for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) >>> 0;
    return TAG_PALETTE[h % TAG_PALETTE.length];
}

function Projects() {
    const [projects, setProjects] = useState(project_list);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.github.com/users/d3v-26/repos?sort=pushed&per_page=100', {
            headers: { Accept: 'application/vnd.github+json' }
        })
            .then(res => { if (!res.ok) throw new Error(); return res.json(); })
            .then(repos => {
                const filtered = repos
                    .filter(r => !r.fork && r.description)
                    .map(r => ({
                        name: r.name.replace(/-/g, ' '),
                        date: new Date(r.pushed_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        link: r.html_url,
                        description: [r.description],
                        domains: [...(r.topics || []), r.language].filter(Boolean),
                    }));
                if (filtered.length > 0) setProjects(filtered);
            })
            .catch(() => { /* keep static fallback */ })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            {loading && (
                <div className="text-gray-400 text-sm mt-2 mb-1">fetching projects from github...</div>
            )}

            {
                projects.map((project, index) => {
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {project.domains && project.domains.map((domain, index) => {
                                        const [borderClass, textClass] = tagColor(domain);
                                        return <span key={index} className={`px-1.5 py-0.5 w-max border ${borderClass} ${textClass} m-1 rounded-full`}>{domain}</span>;
                                    })}
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
function Resume() {
    return (
        <iframe className="h-full w-full" src="https://d3v-26.github.io/resume/" title="Dev patel resume" frameBorder="0"></iframe>
    )
}