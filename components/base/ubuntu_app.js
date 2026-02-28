import React, { Component } from 'react'

export class UbuntuApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            isRenaming: false,
            newName: '',
            menuAbove: false,
            menuRight: false,
        };
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.closeMenu);
    }

    openApp = () => {
        this.props.openApp(this.props.id);
    }

    isUserFolder = () => {
        return this.props.id && this.props.id.startsWith('new-folder-');
    }

    handleContextMenu = (e) => {
        if (!this.isUserFolder()) return;
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        // Menu is ~96px wide (w-24) and ~64px tall; flip if it would overflow
        const menuAbove = rect.bottom + 64 > window.innerHeight;
        const menuRight = rect.left - 48 + 96 > window.innerWidth;
        this.setState({ showMenu: true, menuAbove, menuRight });
        document.addEventListener('click', this.closeMenu);
    }

    closeMenu = () => {
        this.setState({ showMenu: false });
        document.removeEventListener('click', this.closeMenu);
    }

    handleDelete = (e) => {
        e.stopPropagation();
        this.closeMenu();
        this.props.deleteFolder(this.props.id);
    }

    handleRenameStart = (e) => {
        e.stopPropagation();
        this.closeMenu();
        this.setState({ isRenaming: true, newName: this.props.name });
    }

    handleRenameSubmit = () => {
        const trimmed = this.state.newName.trim();
        if (trimmed && trimmed !== this.props.name) {
            this.props.renameFolder(this.props.id, trimmed);
        }
        this.setState({ isRenaming: false });
    }

    handleRenameKey = (e) => {
        if (e.key === 'Enter') this.handleRenameSubmit();
        if (e.key === 'Escape') this.setState({ isRenaming: false });
    }

    render() {
        return (
            <div
                className="p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-ub-orange focus:bg-opacity-50 focus:border-yellow-700 focus:border-opacity-100 border border-transparent outline-none rounded select-none w-24 h-20 flex flex-col justify-start items-center text-center text-xs font-normal text-white relative"
                id={"app-" + this.props.id}
                onDoubleClick={this.state.isRenaming ? undefined : this.openApp}
                onContextMenu={this.handleContextMenu}
                tabIndex={0}
            >
                <img width="40px" height="40px" className="mb-1 w-10" src={this.props.icon} alt={"Ubuntu " + this.props.name} />
                {this.state.isRenaming ? (
                    <input
                        autoFocus
                        value={this.state.newName}
                        onChange={e => this.setState({ newName: e.target.value })}
                        onBlur={this.handleRenameSubmit}
                        onKeyDown={this.handleRenameKey}
                        onClick={e => e.stopPropagation()}
                        className="w-full text-center bg-transparent border border-yellow-700 rounded text-white text-xs outline-none px-0.5"
                    />
                ) : this.props.name}
                {this.state.showMenu && (
                    <div
                        className={
                            "absolute z-50 bg-gray-900 border border-gray-700 rounded shadow-lg text-xs w-24 " +
                            (this.state.menuAbove ? "bottom-full " : "top-full ") +
                            (this.state.menuRight ? "right-0 " : "left-1/2 transform -translate-x-1/2 ")
                        }
                        onClick={e => e.stopPropagation()}
                    >
                        <div onClick={this.handleRenameStart} className="px-3 py-1.5 hover:bg-gray-700 cursor-default text-left">Rename</div>
                        <div onClick={this.handleDelete} className="px-3 py-1.5 hover:bg-red-700 cursor-default text-left">Delete</div>
                    </div>
                )}
            </div>
        )
    }
}

export default UbuntuApp
