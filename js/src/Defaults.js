import {getList, getLongSelect} from './data-sourse-types/OData';
import List from './default-ui/List';
import TextField from './default-ui/TextField';
import LongSelect from './default-ui/LongSelect';

export default {
    listType: {initFunc: (props) => new List(props)},
    dataSourseTypes: {
        odata: {
            getList: getList, 
            getLongSelect: getLongSelect, 
            format: 'json',
            debounceInterval: 200,
            basePath: 'https://services.odata.org/TripPinRESTierService',
            separateQueryForCount: true,
            filters: {
                default: (name, value) => {return {[name]: value}},
                text: (name, value) => {return {[`tolower(${name})`]: { contains: value == null ? null : value.toLowerCase()}}}
            }
        },
        default: 'odata'
    },
    filterTypes: {
        default: (props) => new TextField(props),
        longselect: (props) => new LongSelect(props)
    }
}