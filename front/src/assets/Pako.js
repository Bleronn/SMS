import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPakoModel} from './AddPakoModel';
import {EditPakoModel} from './EditPakoModel';

export class Pako extends Component{

    constructor(props){
        super(props);
        this.state={pakot:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:63717/api/pako')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pakot:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletePako(id){
        if(window.confirm('A jeni i sigurt?')){
            fetch('http://localhost:63717/api/pako/'+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {pakot, pakid,pakmarresi,pakderguesi,pakpesha,pakmadhesia,pakpermbajtja,postmt}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id e Pakos</th>
                        
                        <th>Emri i Marresit</th>
                        
                        <th>Emri i Derguesit</th>
                        <th>Pesha</th>
                        <th>Madhesia</th>
                        <th>Permbajtja</th>
                        <th>Postieri</th>
                        <th>Opsionet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pakot.map(pak=>
                            <tr key={pak.id}>
                                <td>{pak.id}</td>
                                <td>{pak.marresi}</td>
                                
                                <td>{pak.derguesi}</td>
                                <td>{pak.pesha} kg </td>
                                <td>{pak.madhesia} cm^3</td>
                                <td>{pak.permbajtja}</td>
                                <td>{pak.postieri}</td>
                                
                                
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        pakid:pak.id,
        pakmarresi:pak.marresi,
        pakderguesi:pak.derguesi,
        pakpesha:pak.pesha,
        pakmadhesia:pak.madhesia,
        pakpermbajtja:pak.permbajtja,
        postmt:pak.postieri})}>
            Ndrysho Pakon
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletePako(pak.id)}>
            Delete
        </Button>

        <EditPakoModel show={this.state.editModalShow}
        onHide={editModalClose}
        pakid={pakid}
        pakmarresi={pakmarresi}
        pakderguesi={pakderguesi}
        pakpesha={pakpesha}
        pakmadhesia={pakmadhesia}
        pakpermbajtja={pakpermbajtja}
        postmt={postmt}
        
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Shto Pakon</Button>

                    <AddPakoModel show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}