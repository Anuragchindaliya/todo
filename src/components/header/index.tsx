import React, { ChangeEvent, useEffect, useState } from "react"
interface IProps {
    setFilterText: (q: string) => void
};

const Header: React.FC<IProps> = ({ setFilterText }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }
    useEffect(() => {
        let timeOutId: NodeJS.Timeout;
        timeOutId = setTimeout(() => {
            setFilterText(searchTerm)
        }, 300)
        return () => {
            clearTimeout(timeOutId);
        }
    }, [searchTerm])
    console.log("search term ", searchTerm)
    return (
        <header className="bg-dark mb-3">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <nav className="navbar justify-content-between">
                            <a className="navbar-brand"><i className="fa fa-tasks p-2" />TODO</a>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search Task....    [ Alt + s ]" aria-label="Search" id="searchtextbox" onChange={handleChange} accessKey="s" value={searchTerm} />
                            </form>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header