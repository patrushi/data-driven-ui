import React, { PureComponent } from 'react';
import FieldComponentWrapper from '../default-ui/FieldComponentWrapper'

export default class Card extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        if (this.props.setRef) this.props.setRef(this);
        let _this = this;
        if (_this.props.autoRefresh !== false) _this.refresh();
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        if (this.props.setRef) this.props.setRef(null);
    }
 
    renderField = (meta, item, rowIdx, columnIdx) => {
        let value = meta.render
            ? meta.render(meta, item, rowIdx, columnIdx)
            : meta.dataSource && meta.dataSource.path
                ? this.getValueFromPath(item, meta.dataSource.path, 0)
                : item[meta.name];
        
        var type = meta.type;

        var columnTypeMeta = this.props.globalMeta.columnTypes[type];

        if (columnTypeMeta) {
            if (columnTypeMeta.renderFunc) {
                value = columnTypeMeta.renderFunc(meta.name, value);
            }
        }

        return value;
    }

    refresh = () => {
        //this.setState({isLoading: true});
        if (this.dataSource) {
            //this.dataSource.getList(needCount, this.props.meta, this.state, this.props.globalMeta, this.refreshCallback);
        }
    }

    refreshCallback = (data) => {
        if (!data) {
            this.setState({isLoading: false});
            return;
        }

        if (data.count !== undefined && data.items !== undefined) {
            this.setState({count: data.count, items: data.items, isLoading: false});
        } else if (data.count !== undefined) {
            this.setState({count: data.count, isLoading: false});
        } else if (data.items !== undefined) {
            this.setState({items: data.items, isLoading: false});
        }
        if (this.props.onChangeItems) this.props.onChangeItem(data);
    }

    getFieldKey = (meta, idx) => {
        return meta.name 
            ? meta.name
            : String(idx);
    }

    getComponent = (meta) => {
        return FieldComponentWrapper;
    } 

    getComponentProps = (meta) => {
        let globalMeta = this.props.globalMeta.fieldTypes[meta.type] || this.props.globalMeta.fieldTypes[this.props.globalMeta.fieldTypes.default];
        console.log('meta.props', meta, meta.props);
        return {
            globalMeta: this.props.globalMeta,
            meta: meta,
            componentMeta: meta,
            wrappedComponent: globalMeta.component,
            label: this.props.globalMeta.fields.label ? meta.title || meta.name : null,
            placeholder: this.props.globalMeta.fields.placeholder ? meta.title || meta.name : null,
            ...globalMeta.props,
            ...meta.props
        };
    }

    render() {
        const props = {
            ...this.props, 
            data: this.state,
            functions: {
                renderField: this.renderField,
                changeColumnOrder: this.changeColumnOrder,
                getFieldKey: this.getFieldKey,
                getComponent: this.getComponent,
                getComponentProps: this.getComponentProps
            },
        };

        const card = React.createElement(this.props.globalMeta.components.card.component, {...props, key: 'Card'});

        const longProcessPanel = React.createElement(this.props.globalMeta.components.longProcessPanel.component, {isLoading: this.state.isLoading}, [card]);

        const errorPanel = React.createElement(this.props.globalMeta.components.errorPanel.component, this.props.globalMeta.components.errorPanel.props)

        return <React.Fragment>
                {longProcessPanel}
                {errorPanel}
            </React.Fragment>;
    }
}
