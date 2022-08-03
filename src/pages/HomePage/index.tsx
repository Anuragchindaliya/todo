import FormInput from '../../components/FormInput';
import Tasks from './Tasks';

const HomePage = () => {
    return (
        <section className="todo-outer">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-sm-12 col-md-10">
                        <hr /><h4 className="text-center">Welcome in Todo task List Application</h4><hr />
                        <div className="todo-inner">
                            <FormInput />
                            <div className="to-do-output">
                                <Tasks />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage;