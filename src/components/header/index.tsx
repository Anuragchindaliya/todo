import { ChangeEvent, useContext, useRef, } from "react"
import { todoSearch } from "../../context/todoAction";
import { TodoContext } from "../../context/todoContext";
const Header = () => {

    const { dispatch } = useContext(TodoContext)
    const timeOutId = useRef<NodeJS.Timeout | null>(null)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("typing...")
        if (timeOutId.current) {
            clearTimeout(timeOutId.current)
            // console.log("timer cleared")
        }
        timeOutId.current = setTimeout(() => {
            // console.log("dispatch")
            dispatch(todoSearch(e.target.value))
        }, 1000);
    }

    return (
        <header className="bg-dark mb-3">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <nav className="navbar justify-content-between">
                            <a className="navbar-brand" href="/"><i className="fa fa-tasks p-2" />TODO</a>
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search Task....    [ Alt + s ]" aria-label="Search" id="searchtextbox" onChange={handleChange} accessKey="s"
                                // value={searchTerm}
                                />
                            </form>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header