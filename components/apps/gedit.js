import React, { useRef } from 'react';

export function Gedit() {
    const nameRef = useRef(null);
    const subjectRef = useRef(null);
    const messageRef = useRef(null);

    const sendMessage = () => {
        const name = nameRef.current.value.trim();
        const subject = subjectRef.current.value.trim();
        const message = messageRef.current.value.trim();

        if (!name) {
            nameRef.current.value = '';
            nameRef.current.placeholder = 'Name must not be Empty!';
            return;
        }
        if (!message) {
            messageRef.current.value = '';
            messageRef.current.placeholder = 'Message must not be Empty!';
            return;
        }

        const body = `From: ${name}\n\n${message}`;
        const mailto = `mailto:devrpatel26@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(body)}`;
        window.open(mailto);
    };

    return (
        <div className="w-full h-full relative flex flex-col bg-ub-cool-grey text-white select-none">
            <div className="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm">
                <span className="font-bold ml-2">Send a Message to Me</span>
                <div className="flex">
                    <div onClick={sendMessage} className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80 cursor-pointer">Send</div>
                </div>
            </div>
            <div className="relative flex-grow flex flex-col bg-ub-gedit-dark font-normal windowMainScreen">
                <div className="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"></div>
                <div className="relative">
                    <input ref={nameRef} className=" w-full text-ubt-gedit-orange focus:bg-ub-gedit-light outline-none font-medium text-sm pl-6 py-0.5 bg-transparent" placeholder="Your Email / Name :" spellCheck="false" autoComplete="off" type="text" />
                    <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold light text-sm text-ubt-gedit-blue">1</span>
                </div>
                <div className="relative">
                    <input ref={subjectRef} className=" w-full my-1 text-ubt-gedit-blue focus:bg-ub-gedit-light gedit-subject outline-none text-sm font-normal pl-6 py-0.5 bg-transparent" placeholder="subject (maybe a feedback for this website!)" spellCheck="false" autoComplete="off" type="text" />
                    <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold  text-sm text-ubt-gedit-blue">2</span>
                </div>
                <div className="relative flex-grow">
                    <textarea ref={messageRef} className=" w-full gedit-message font-light text-sm resize-none h-full windowMainScreen outline-none tracking-wider pl-6 py-1 bg-transparent" placeholder="Message" spellCheck="false" autoComplete="none" />
                    <span className="absolute left-1 top-1 font-bold  text-sm text-ubt-gedit-blue">3</span>
                </div>
            </div>
        </div>
    );
}

export default Gedit;

export const displayGedit = () => {
    return <Gedit />;
};
