import React, { Component } from 'react'
import Table from '../components/Table'
import {
    Container,
} from 'semantic-ui-react'

 fetch('http://localhost:5000/search',
{method: 'POST', cache: 'default', headers:
{'Accept': 'application/json', 'Content-Type': 'application/json'},
body: JSON.stringify({'key': '1Space'})})
.then((response) => response.json())
.then((response) => console.log(response))

//fetch('http://sky.aqeel.cc:19090/filter',
//    { method: 'POST', cache: 'default', headers:
//        { 'Accept': 'application/json', 'Content-Type': 'application/json', },
//      body: JSON.stringify({'search': geneList, 'exclude': excludeList}) }).
//      then( response => response.json()
//    ).then( response => {
//        this.dataTable = (response.sort(
//            function (a,b) {
//                const aNulls =_.map(a.value,(e)=>e==null||e==='') const bNulls =_.map(b.value,(e)=>e==null||e==='') const sortVal = aNulls.map( (v,i) => { if (bNulls[i] === v) {return 0} if (v) {return 1} if (bNulls[i]) {return -1} return 0 } ).find((e)=>e!==0) if (typeof sortVal === undefined) {return 0} return sortVal } )) } )

let dataLabels = [{id: 'a', name: 'stuff'}, {id: 'b', name: 'stuff'}]
let dataTable = [{key: 'el1', value: {'a':'stuff1', 'b':'stuff2'}}]

export default class Page extends Component {
    render() {
        return (
            <Container fluid style={{padding:'50px 50px'}}>
                <Table
                    labels = {dataLabels}
                    data = {dataTable}
                    processCellContent = {
                        (e,t)=> <div>{e}</div>
                    }
                />

            </Container>
        )
    }
}
